import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from './category-filter';
import type { Category, CategoryKey } from '../types';

const mockCategories: Category[] = [
  { key: 'all', label: { fr: 'Tous', ar: 'الكل' } },
  { key: 'mountain', label: { fr: 'Miel de montagne', ar: 'عسل الجبال' } },
  { key: 'forest', label: { fr: 'Miel de foret', ar: 'عسل الغابة' } },
];

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={vi.fn()}
        locale="fr"
      />,
    );
    expect(screen.getByText('Tous')).toBeInTheDocument();
    expect(screen.getByText('Miel de montagne')).toBeInTheDocument();
    expect(screen.getByText('Miel de foret')).toBeInTheDocument();
  });

  it('renders arabic labels when locale is AR', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={vi.fn()}
        locale="ar"
      />,
    );
    expect(screen.getByText('الكل')).toBeInTheDocument();
    expect(screen.getByText('عسل الجبال')).toBeInTheDocument();
  });

  it('highlights active category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="mountain"
        onCategoryChange={vi.fn()}
        locale="fr"
      />,
    );
    const activeButton = screen.getByText('Miel de montagne');
    expect(activeButton.closest('button')).toHaveAttribute('data-variant', 'default');
  });

  it('calls onCategoryChange when a category is clicked', async () => {
    const onCategoryChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={onCategoryChange}
        locale="fr"
      />,
    );
    await userEvent.click(screen.getByText('Miel de montagne'));
    expect(onCategoryChange).toHaveBeenCalledWith('mountain' as CategoryKey);
  });
});
