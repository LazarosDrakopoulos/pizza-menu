export interface SizeState {
  sizeId: number;
  name: string;
  enabled: boolean;
  price: number;
}

export interface ItemState {
  itemId: number;
  name: string;
  expanded: boolean;
  sizes: SizeState[];
}