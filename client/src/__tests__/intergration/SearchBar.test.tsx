import HeaderBar from '@/components/headerBar/headerBar';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

describe('Search films feature', () => {
  it('Search input is initialy hidden', () => {
    render(<HeaderBar />);
    expect(screen.getByTestId('FuzzySearch')).not.toHaveClass('visible');
  });

  it('Toggle search input when clicked search button', () => {
    render(<HeaderBar />);
    const FuzzySearch = screen.getByTestId('FuzzySearch');
    const openSearchBtn = screen.getByRole('button', { name: 'Open search' });

    fireEvent.click(openSearchBtn);
    expect(FuzzySearch).toHaveClass('visible');

    fireEvent.click(openSearchBtn);
    expect(FuzzySearch).not.toHaveClass('visible');
  });
});
