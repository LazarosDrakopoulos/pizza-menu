import React from 'react';
import { SizeState } from '../types';

interface Props {
  size: SizeState;
  itemName: string;
  onToggle: () => void;
  onPriceChange: (value: string) => void;
}

function SizeItem({ size, itemName, onToggle, onPriceChange }: Props) {
  return (
    <div className="size-col">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={size.enabled}
          onChange={onToggle}
          aria-label={`Enable ${size.name} size for ${itemName}`}
        />
        <span>{size.name}</span>
      </label>
      <div className={`price-input-wrapper ${!size.enabled ? 'disabled' : ''}`}>
        <span className="dollar">$</span>
        <input
          type="text"
          value={size.price === 0 ? '0.00' : size.price}
          disabled={!size.enabled}
          onChange={e => onPriceChange(e.target.value)}
          aria-label={`${itemName} ${size.name} price`}
        />
      </div>
    </div>
  );
}

export default SizeItem;