import { describe, expect, it } from 'vitest';
import { farewell } from '../src/farewell.js';

describe('farewell', () => {
  it('says goodbye by name', () => {
    expect(farewell('Ada')).toBe('Goodbye, Ada!');
  });
});
