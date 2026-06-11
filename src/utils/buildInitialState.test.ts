import { buildInitialState } from './buildInitialState';

describe('buildInitialState', () => {
  it('should return 2 items', () => {
    const state = buildInitialState();
    expect(state.length).toBe(2);
  });

  it('should have first item expanded by default', () => {
    const state = buildInitialState();
    expect(state[0].expanded).toBe(true);
    expect(state[1].expanded).toBe(false);
  });

  it('should have all sizes enabled by default', () => {
    const state = buildInitialState();
    state.forEach(item => {
      item.sizes.forEach(size => {
        expect(size.enabled).toBe(true);
      });
    });
  });
});