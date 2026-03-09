import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from './category-filter';
import type { Category, CategoryKey } from '../types';

const mockCategories: Category[] = [
  { key: 'all', label: { fr: 'Tous', ar: 'الكل' } },
  { key: 'lavande', label: { fr: 'Lavande', ar: 'لافندر' } },
  { key: 'foret', label: { fr: 'Forêt', ar: 'غابة' } },
];

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={vi.fn()}
        locale="fr"
      />
    );
    expect(screen.getByText('Tous')).toBeInTheDocument();
    expect(screen.getByText('Lavande')).toBeInTheDocument();
    expect(screen.getByText('Forêt')).toBeInTheDocument();
  });

  it('renders arabic labels when locale is AR', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={vi.fn()}
        locale="ar"
      />
    );
    expect(screen.getByText('الكل')).toBeInTheDocument();
    expect(screen.getByText('لافندر')).toBeInTheDocument();
  });

  it('highlights active category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="lavande"
        onCategoryChange={vi.fn()}
        locale="fr"
      />
    );
    const activeButton = screen.getByText('Lavande');
    expect(activeButton.closest('button')).toHaveAttribute(
      'data-variant',
      'default'
    );
  });

  it('calls onCategoryChange when a category is clicked', async () => {
    const onCategoryChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={onCategoryChange}
        locale="fr"
      />
    );
    await userEvent.click(screen.getByText('Lavande'));
    expect(onCategoryChange).toHaveBeenCalledWith('lavande' as CategoryKey);
  });
});
