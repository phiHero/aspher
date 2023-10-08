import HeaderBar from '@/components/headerBar/headerBar';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

describe('Header bar search', () => {
  it('Search input is initialy hidden', () => {
    render(<HeaderBar />);
    expect(screen.getByTestId('FuzzySearch')).not.toHaveClass('visible');
  });

  it('Toggle search input when clicked search button', () => {
    render(<HeaderBar />);
    const FuzzySearch = screen.getByTestId('FuzzySearch');
    const openSearchBtn = screen.getByRole('button', { name: 'Open search' });
    const closeSearchBtn = screen.getByLabelText('Close search');

    fireEvent.click(openSearchBtn);
    expect(FuzzySearch).toHaveClass('visible');

    fireEvent.click(closeSearchBtn);
    expect(FuzzySearch).not.toHaveClass('visible');
  });

  it('Simulate user searching', async () => {
    render(<HeaderBar />);
    const FuzzySearch = screen.getByTestId('FuzzySearch');
    const openSearchBtn = screen.getByRole('button', { name: 'Open search' });

    fireEvent.click(openSearchBtn);
    expect(FuzzySearch).toHaveClass('visible');

    const input = screen.getByPlaceholderText('Search films...');
    input.focus();

    fireEvent.change(input, { target: { value: 'asdjba*121' } });
    //should show loader first
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    //should show nodata
    expect(
      await screen.findByText(/no data/i, {}, { timeout: 10000 })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'attack on' } });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    // show results
    expect(
      (await screen.findAllByTestId('searchItem', {}, { timeout: 10000 }))
        .length
    ).toBeGreaterThan(0);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
