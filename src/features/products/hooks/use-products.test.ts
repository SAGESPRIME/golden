import { describe, it, expect } from 'vitest';
import { seedProducts } from '../data/seed';
import type { SeedProduct } from '../types';

describe('seedProducts', () => {
  it('contains 6-8 products', () => {
    expect(seedProducts.length).toBeGreaterThanOrEqual(6);
    expect(seedProducts.length).toBeLessThanOrEqual(8);
  });

  it('has bilingual names and descriptions', () => {
    seedProducts.forEach((p: SeedProduct) => {
      expect(p.name.fr).toBeTruthy();
      expect(p.name.ar).toBeTruthy();
      expect(p.description.fr).toBeTruthy();
      expect(p.description.ar).toBeTruthy();
    });
  });

  it('has at least 3 different categories', () => {
    const categories = new Set(seedProducts.map((p: SeedProduct) => p.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it('has at least one out-of-stock product', () => {
    const outOfStock = seedProducts.filter((p: SeedProduct) => !p.inStock);
    expect(outOfStock.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least one product with compareAtPrice', () => {
    const promos = seedProducts.filter(
      (p: SeedProduct) => p.compareAtPrice !== undefined
    );
    expect(promos.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least one featured product', () => {
    const featured = seedProducts.filter((p: SeedProduct) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
  });

  it('has unique slugs', () => {
    const slugs = seedProducts.map((p: SeedProduct) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has prices in cents (> 100)', () => {
    seedProducts.forEach((p: SeedProduct) => {
      expect(p.price).toBeGreaterThan(100);
    });
  });

  it('each product has at least one image', () => {
    seedProducts.forEach((p: SeedProduct) => {
      expect(p.images.length).toBeGreaterThanOrEqual(1);
    });
  });
});
