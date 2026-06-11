import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from './ItemCard';
import { buildInitialState } from '../utils/buildInitialState';


describe('ItemCard', () => {
  const mockItem = buildInitialState()[0];
  const defaultProps = {
    item: mockItem,
    hasChanges: false,
    onToggle: jest.fn(),
    onSizeToggle: jest.fn(),
    onPriceChange: jest.fn(),
    onUndo: jest.fn(),
  };

  it('should render item name', () => {
    render(<ItemCard {...defaultProps} />);
    expect(screen.getByText('Margherita')).toBeInTheDocument();
  });

  it('should show undo button only when there are changes', () => {
    const { rerender } = render(<ItemCard {...defaultProps} hasChanges={false} />);
    expect(screen.queryByLabelText(/undo changes/i)).not.toBeInTheDocument();

    rerender(<ItemCard {...defaultProps} hasChanges={true} />);
    expect(screen.getByLabelText(/undo changes/i)).toBeInTheDocument();
  });

  it('should call onToggle when header is clicked', () => {
    render(<ItemCard {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /margherita/i }));
    expect(defaultProps.onToggle).toHaveBeenCalled();
  });
});