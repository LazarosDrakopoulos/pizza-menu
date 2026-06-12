import React from 'react';
import { ItemState } from '../types';
import SizeItem from './SizeItem';

interface Props {
  item: ItemState;
  hasChanges: boolean;
  onToggle: () => void;
  onSizeToggle: (sizeId: number) => void;
  onPriceChange: (sizeId: number, value: string) => void;
  onUndo: () => void;
}

function ItemCard({
  item,
  hasChanges,
  onToggle,
  onSizeToggle,
  onPriceChange,
  onUndo,
}: Props) {
  return (
    <div className={`item-card ${item.expanded ? 'expanded' : ''}`}>
      <button
        className="item-header"
        onClick={onToggle}
        aria-expanded={item.expanded}
        aria-controls={`item-body-${item.itemId}`}
      >
       <span className="arrow">
  {item.expanded ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )}
</span>
        <span>{item.name}</span>
      </button>

      {item.expanded && (
        <div
          className="item-body"
          id={`item-body-${item.itemId}`}
          role="region"
          aria-label={`${item.name} sizes and prices`}
        >
          <div className="sizes-row">
            {item.sizes.map(size => (
              <SizeItem
                key={size.sizeId}
                size={size}
                itemName={item.name}
                onToggle={() => onSizeToggle(size.sizeId)}
                onPriceChange={value => onPriceChange(size.sizeId, value)}
              />
            ))}
          </div>

          {hasChanges && (
            <button
  className="undo-btn"
  onClick={onUndo}
  aria-label={`Undo changes for ${item.name}`}
  title="Undo changes"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemCard;