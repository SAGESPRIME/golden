#!/bin/bash
set -e

# Usage: ralph.sh [spec-dir] [max-iterations]
# Example: ralph.sh specs/001-homepage-2024-01-24 25

SPEC_DIR=${1:-}
MAX_ITERATIONS=${2:-10}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "Starting Ralph v2.0 - Autonomous Development Loop"
echo "Project: $PROJECT_ROOT"
echo ""

# Verifier qu'un dossier spec est fourni
if [ -z "$SPEC_DIR" ]; then
  echo "Error: No spec directory provided"
  echo ""
  echo "Usage: ralph.sh <spec-dir> [max-iterations]"
  echo "Example: ralph.sh specs/001-homepage-2024-01-24 25"
  echo ""
  echo "Available specs:"
  ls -d specs/[0-9]*/ 2>/dev/null || echo "  No specs found. Run /prd first."
  exit 1
fi

# Verifier que le dossier existe
if [ ! -d "$SPEC_DIR" ]; then
  echo "Error: Spec directory not found: $SPEC_DIR"
  exit 1
fi

# Verifier que prd.json existe
if [ ! -f "$SPEC_DIR/prd.json" ]; then
  echo "Error: prd.json not found in $SPEC_DIR"
  echo "   Run /ralph to generate it first"
  exit 1
fi

echo "Spec: $SPEC_DIR"
echo "Max iterations: $MAX_ITERATIONS"
echo ""

# Afficher le resume
echo "Stories summary:"
cat "$SPEC_DIR/prd.json" | grep -o '"status": "[^"]*"' | sort | uniq -c
echo ""

# Exporter le chemin du spec pour CLAUDE.md
export RALPH_SPEC_DIR="$SPEC_DIR"

for i in $(seq 1 $MAX_ITERATIONS); do
  echo "==========================================="
  echo "=== Iteration $i of $MAX_ITERATIONS ==="
  echo "==========================================="

  # Verifier s'il reste des stories a faire
  PENDING=$(cat "$SPEC_DIR/prd.json" | grep -c '"status": "pending"' || echo "0")
  IN_PROGRESS=$(cat "$SPEC_DIR/prd.json" | grep -c '"status": "in_progress"' || echo "0")

  if [ "$PENDING" -eq 0 ] && [ "$IN_PROGRESS" -eq 0 ]; then
    echo ""
    echo "All stories complete!"
    echo ""
    echo "Final summary:"
    cat "$SPEC_DIR/prd.json" | grep -o '"status": "[^"]*"' | sort | uniq -c
    echo ""

    # Creer la PR automatiquement
    BRANCH_NAME=$(cat "$SPEC_DIR/prd.json" | grep -o '"branchName": "[^"]*"' | cut -d'"' -f4)
    FEATURE_NAME=$(basename "$SPEC_DIR" | sed 's/^[0-9]*-//' | sed 's/-[0-9]*-[0-9]*-[0-9]*$//' | tr '-' ' ')

    echo "Creating Pull Request..."

    # Push la branche si pas deja fait
    git push -u origin "$BRANCH_NAME" 2>/dev/null || true

    # Creer la PR avec gh
    gh pr create \
      --title "feat: $FEATURE_NAME" \
      --body "$(cat <<EOF
## Summary

Implementation of **$FEATURE_NAME** according to the PRD.

**Spec**: \`$SPEC_DIR/\`

## Documentation

- PRD: \`$SPEC_DIR/prd.md\`
- Plan: \`$SPEC_DIR/plan.md\`
- Progress: \`$SPEC_DIR/progress.txt\`

## User Stories

$(cat "$SPEC_DIR/prd.json" | grep -E '"id"|"title"|"status"' | paste - - - | while read line; do
  ID=$(echo "$line" | grep -o '"id": "[^"]*"' | cut -d'"' -f4)
  TITLE=$(echo "$line" | grep -o '"title": "[^"]*"' | cut -d'"' -f4)
  STATUS=$(echo "$line" | grep -o '"status": "[^"]*"' | cut -d'"' -f4)
  if [ "$STATUS" = "completed" ]; then
    echo "- [x] $ID: $TITLE"
  else
    echo "- [ ] $ID: $TITLE ($STATUS)"
  fi
done)

## Test plan

- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Tests pass
- [ ] i18n FR + AR verified
- [ ] RTL layout verified
- [ ] Manual review

---

Generated with Ralph Loop
EOF
)" 2>/dev/null && echo "PR created!" || echo "Could not create PR (maybe already exists or not authenticated)"

    exit 0
  fi

  # Passer le chemin du spec a Claude via le prompt
  OUTPUT=$(echo "SPEC_DIR=$SPEC_DIR" | cat - "$SCRIPT_DIR/CLAUDE.md" \
    | claude --dangerously-skip-permissions 2>&1 \
    | tee /dev/stderr) || true

  if echo "$OUTPUT" | grep -q "<promise>COMPLETE</promise>"; then
    echo ""
    echo "All stories complete!"
    exit 0
  fi

  if echo "$OUTPUT" | grep -q "<promise>BLOCKED</promise>"; then
    echo ""
    echo "Story blocked - check dependencies"
  fi

  if echo "$OUTPUT" | grep -q "<promise>FAILED</promise>"; then
    echo ""
    echo "Story failed - check $SPEC_DIR/progress.txt for details"
  fi

  echo ""
  echo "Waiting 2 seconds before next iteration..."
  sleep 2
done

echo ""
echo "Max iterations ($MAX_ITERATIONS) reached"
echo "Run again to continue: ./.claude/scripts/ralph/ralph.sh $SPEC_DIR"
exit 1
