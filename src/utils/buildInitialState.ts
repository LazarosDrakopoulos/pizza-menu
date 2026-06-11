import { items, itemSizes, itemPrices } from '../data';
import { ItemState } from '../types';

export function buildInitialState(): ItemState[] {
  return items.map((item, index) => ({
    itemId: item.itemId,
    name: item.name,
    expanded: index === 0, 
    sizes: itemSizes.map(size => {
      const priceEntry = itemPrices.find(
        p => p.itemId === item.itemId && p.sizeId === size.sizeId
      );
      return {
        sizeId: size.sizeId,
        name: size.name,
        enabled: true,
        price: priceEntry ? priceEntry.price : 0,
      };
    }),
  }));
}