import { describe, expect, it, vi } from 'vitest';
import { farewell } from '../src/farewell.js';

describe('farewell', () => {
  it('says goodbye by name', () => {
    expect(farewell('Ada')).toBe('Goodbye, Ada!');
  });

  it('AC3 & AC6: returns the French farewell when called with { lang: \'fr\' }', () => {
    expect(farewell('Ada', { lang: 'fr' })).toBe('Au revoir, Ada!');
  });

  it('AC4: stays a pure function — no console or process I/O happens inside it', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const stdoutWrite = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderrWrite = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    try {
      const result = farewell('Ada', { lang: 'fr' });
      expect(typeof result).toBe('string');
      farewell('Ada');

      expect(log).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
      expect(stdoutWrite).not.toHaveBeenCalled();
      expect(stderrWrite).not.toHaveBeenCalled();
    } finally {
      log.mockRestore();
      error.mockRestore();
      stdoutWrite.mockRestore();
      stderrWrite.mockRestore();
    }
  });

  it('AC7: default (English) behaviour is unchanged for library callers', () => {
    expect(farewell('Ada')).toBe('Goodbye, Ada!');
    expect(farewell('Ada', { lang: 'en' })).toBe('Goodbye, Ada!');
  });
});
