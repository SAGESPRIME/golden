'use client';

import { Button } from '@/components/ui/button';
import type { Category, CategoryKey } from '../types';

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: CategoryKey | 'all';
  onCategoryChange: (category: CategoryKey | 'all') => void;
  locale: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  locale,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <Button
          key={cat.key}
          variant={activeCategory === cat.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(cat.key)}
        >
          {locale === 'ar' ? cat.label.ar : cat.label.fr}
        </Button>
      ))}
    </div>
  );
}
