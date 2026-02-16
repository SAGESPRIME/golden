import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ImageGallery } from './image-gallery';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} data-fill={fill ? 'true' : undefined} />;
  },
}));

const singleImage = ['/images/miel-1.jpg'];
const multipleImages = ['/images/miel-1.jpg', '/images/miel-2.jpg', '/images/miel-3.jpg'];

describe('ImageGallery', () => {
  it('renders the main image', () => {
    render(<ImageGallery images={singleImage} alt="Miel test" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Miel test');
    expect(img).toHaveAttribute('src', '/images/miel-1.jpg');
  });

  it('does not render thumbnails for a single image', () => {
    render(<ImageGallery images={singleImage} alt="Miel test" />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(1);
  });

  it('renders thumbnails for multiple images', () => {
    render(<ImageGallery images={multipleImages} alt="Miel test" />);
    const imgs = screen.getAllByRole('img');
    // 1 main + 3 thumbnails
    expect(imgs).toHaveLength(4);
  });

  it('changes main image when thumbnail is clicked', async () => {
    render(<ImageGallery images={multipleImages} alt="Miel test" />);
    const thumbnails = screen.getAllByRole('button');
    await userEvent.click(thumbnails[1]);
    const mainImg = screen.getAllByRole('img')[0];
    expect(mainImg).toHaveAttribute('src', '/images/miel-2.jpg');
  });
});
