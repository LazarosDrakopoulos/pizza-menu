import { ItemState } from '../types';

const STORAGE_KEY = 'pizzaMenuState';

export function loadState(): ItemState[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveState(state: ItemState[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.error('Could not save state');
  }
}