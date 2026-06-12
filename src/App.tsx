import React, { useState, useEffect, useRef } from 'react';
import { ItemState } from './types';
import { buildInitialState } from './utils/buildInitialState';
import { loadState, saveState } from './utils/storage';
import ItemCard from './components/ItemCard';

function App() {
  const initialStateRef = useRef<ItemState[]>(buildInitialState());

  const [menuState, setMenuState] = useState<ItemState[]>(() => {
    const saved = loadState();
    if (saved) {
      return saved.map((item, i) => ({
        ...item,
        expanded: initialStateRef.current[i].expanded,
      }));
    }
    return initialStateRef.current;
  });

  useEffect(() => {
    saveState(menuState);
  }, [menuState]);

  function handleToggle(itemId: number) {
    setMenuState(prev =>
      prev.map(item => ({
        ...item,
        expanded: item.itemId === itemId ? !item.expanded : false,
      }))
    );
  }

  function handleSizeToggle(itemId: number, sizeId: number) {
    setMenuState(prev =>
      prev.map(item => {
        if (item.itemId !== itemId) return item;
        return {
          ...item,
          sizes: item.sizes.map(size => {
            if (size.sizeId !== sizeId) return size;
            const originalPrice = initialStateRef.current
              .find(i => i.itemId === itemId)!
              .sizes.find(s => s.sizeId === sizeId)!.price;
            return {
              ...size,
              enabled: !size.enabled,
              price: size.enabled ? 0 : originalPrice,
            };
          }),
        };
      })
    );
  }

  function handlePriceChange(itemId: number, sizeId: number, value: string) {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setMenuState(prev =>
      prev.map(item => {
        if (item.itemId !== itemId) return item;
        return {
          ...item,
          sizes: item.sizes.map(size => {
            if (size.sizeId !== sizeId) return size;
            return { ...size, price: parseFloat(value) || 0 };
          }),
        };
      })
    );
  }

  function handleUndo(itemId: number) {
    const original = initialStateRef.current.find(i => i.itemId === itemId)!;
    setMenuState(prev =>
      prev.map(item => {
        if (item.itemId !== itemId) return item;
        return { ...original, expanded: item.expanded };
      })
    );
  }

  function hasChanges(itemId: number): boolean {
    const current = menuState.find(i => i.itemId === itemId)!;
    const original = initialStateRef.current.find(i => i.itemId === itemId)!;
    return current.sizes.some((size, idx) => {
      const orig = original.sizes[idx];
      return size.enabled !== orig.enabled || size.price !== orig.price;
    });
  }

  return (
    <div className="app">
      <h2 className="category-title">Pizzaaa</h2>
      <div className="menu-list">
        {menuState.map(item => (
          <ItemCard
            key={item.itemId}
            item={item}
            hasChanges={hasChanges(item.itemId)}
            onToggle={() => handleToggle(item.itemId)}
            onSizeToggle={sizeId => handleSizeToggle(item.itemId, sizeId)}
            onPriceChange={(sizeId, value) => handlePriceChange(item.itemId, sizeId, value)}
            onUndo={() => handleUndo(item.itemId)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;