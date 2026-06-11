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
        <span className="arrow">{item.expanded ? '∧' : '∨'}</span>
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
              ↺
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemCard;