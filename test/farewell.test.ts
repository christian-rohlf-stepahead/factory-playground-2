import { describe, expect, it, vi } from 'vitest';
import { farewell } from '../src/farewell.js';

describe('farewell', () => {
  it('says goodbye by name', () => {
    expect(farewell('Ada')).toBe('Goodbye, Ada!');
  });

  it('AC3: returns the French farewell when called with { lang: \'fr\' }', () => {
    expect(farewell('Ada', { lang: 'fr' })).toBe('Au revoir, Ada!');
  });

  it('AC6: the French farewell generalises beyond a single pinned name', () => {
    expect(farewell('Grace', { lang: 'fr' })).toBe('Au revoir, Grace!');
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

  it('AC3: returns the Polish farewell when called with { lang: \'pl\' }', () => {
    expect(farewell('Ada', { lang: 'pl' })).toBe('Do widzenia, Ada!');
  });

  it('AC4: stays a pure function when called with Polish — no console or process I/O happens inside it', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const stdoutWrite = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderrWrite = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    try {
      const result = farewell('Ada', { lang: 'pl' });
      expect(typeof result).toBe('string');

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

  it('AC6: Polish behaviour is covered, and pre-existing English/French behaviour still passes unchanged', () => {
    expect(farewell('Ada', { lang: 'pl' })).toBe('Do widzenia, Ada!');
    expect(farewell('Ada')).toBe('Goodbye, Ada!');
    expect(farewell('Ada', { lang: 'fr' })).toBe('Au revoir, Ada!');
  });

  it('AC3: returns the Spanish farewell when called with { lang: \'es\' }', () => {
    expect(farewell('Ada', { lang: 'es' })).toBe('Adiós, Ada!');
  });

  it('AC4: stays a pure function when called with Spanish — no console or process I/O happens inside it', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const stdoutWrite = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderrWrite = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    try {
      const result = farewell('Ada', { lang: 'es' });
      expect(typeof result).toBe('string');

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

  it('AC6: Spanish behaviour is covered, and pre-existing English/French/Polish behaviour still passes unchanged', () => {
    expect(farewell('Ada', { lang: 'es' })).toBe('Adiós, Ada!');
    expect(farewell('Ada')).toBe('Goodbye, Ada!');
    expect(farewell('Ada', { lang: 'fr' })).toBe('Au revoir, Ada!');
    expect(farewell('Ada', { lang: 'pl' })).toBe('Do widzenia, Ada!');
  });
});
