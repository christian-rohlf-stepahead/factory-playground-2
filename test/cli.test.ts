import { afterEach, describe, expect, it, vi } from 'vitest';

const originalArgv = process.argv;

interface CliResult {
  stdout: string;
  stderr: string;
  exitCode: number | undefined;
}

async function runCli(args: string[]): Promise<CliResult> {
  vi.resetModules();
  process.argv = ['node', 'cli.js', ...args];
  process.exitCode = undefined;

  const log = vi.spyOn(console, 'log').mockImplementation(() => {});
  const error = vi.spyOn(console, 'error').mockImplementation(() => {});

  try {
    await import('../src/cli.js');
  } finally {
    process.argv = originalArgv;
  }

  const stdout = log.mock.calls.map((call) => call.join(' ')).join('\n');
  const stderr = error.mock.calls.map((call) => call.join(' ')).join('\n');
  const exitCode = process.exitCode;
  process.exitCode = undefined;

  log.mockRestore();
  error.mockRestore();

  return { stdout, stderr, exitCode };
}

describe('farewell CLI', () => {
  afterEach(() => {
    process.argv = originalArgv;
    process.exitCode = undefined;
  });

  it('AC1: prints the unchanged English farewell when no --lang option is given', async () => {
    const { stdout, exitCode } = await runCli(['farewell', 'Ada']);
    expect(stdout).toBe('Goodbye, Ada!');
    expect(exitCode).toBeUndefined();
  });

  it('AC2: prints the French farewell when run with --lang fr', async () => {
    const { stdout, exitCode } = await runCli(['farewell', 'Ada', '--lang', 'fr']);
    expect(stdout).toBe('Au revoir, Ada!');
    expect(exitCode).toBeUndefined();
  });

  it('AC5: the usage/help text mentions the --lang option', async () => {
    const { stderr } = await runCli(['unknown-command']);
    expect(stderr).toContain('--lang');
  });

  it('AC7: pre-existing CLI behaviour (multi-word names, missing-argument usage) still passes unchanged', async () => {
    const multiWord = await runCli(['farewell', 'Ada', 'Lovelace']);
    expect(multiWord.stdout).toBe('Goodbye, Ada Lovelace!');

    const missingArg = await runCli(['farewell']);
    expect(missingArg.stderr).toContain('usage:');
    expect(missingArg.exitCode).toBe(2);
  });

  it('AC1: still prints the unchanged English farewell once Polish is accepted as a lang value', async () => {
    const { stdout, exitCode } = await runCli(['farewell', 'Ada']);
    expect(stdout).toBe('Goodbye, Ada!');
    expect(exitCode).toBeUndefined();
  });

  it('AC2: prints the Polish farewell when run with --lang pl', async () => {
    const { stdout, exitCode } = await runCli(['farewell', 'Ada', '--lang', 'pl']);
    expect(stdout).toBe('Do widzenia, Ada!');
    expect(exitCode).toBeUndefined();
  });

  it('AC5: the usage/help text mentions the pl value for --lang', async () => {
    const { stderr } = await runCli(['unknown-command']);
    expect(stderr).toMatch(/\bpl\b/);
  });

  it('AC6: pre-existing CLI behaviour (English, French) still passes unchanged alongside the new Polish option', async () => {
    const english = await runCli(['farewell', 'Ada']);
    expect(english.stdout).toBe('Goodbye, Ada!');

    const french = await runCli(['farewell', 'Ada', '--lang', 'fr']);
    expect(french.stdout).toBe('Au revoir, Ada!');

    const polish = await runCli(['farewell', 'Ada', '--lang', 'pl']);
    expect(polish.stdout).toBe('Do widzenia, Ada!');
  });

  it('AC1: still prints the unchanged English farewell once Spanish is accepted as a lang value', async () => {
    const { stdout, exitCode } = await runCli(['farewell', 'Ada']);
    expect(stdout).toBe('Goodbye, Ada!');
    expect(exitCode).toBeUndefined();
  });

  it('AC2: prints the Spanish farewell when run with --lang es', async () => {
    const { stdout, exitCode } = await runCli(['farewell', 'Ada', '--lang', 'es']);
    expect(stdout).toBe('Adiós, Ada!');
    expect(exitCode).toBeUndefined();
  });

  it('AC5: the usage/help text mentions the es value for --lang', async () => {
    const { stderr } = await runCli(['unknown-command']);
    expect(stderr).toMatch(/\bes\b/);
  });

  it('AC6: pre-existing CLI behaviour (English, French, Polish) still passes unchanged alongside the new Spanish option', async () => {
    const english = await runCli(['farewell', 'Ada']);
    expect(english.stdout).toBe('Goodbye, Ada!');

    const french = await runCli(['farewell', 'Ada', '--lang', 'fr']);
    expect(french.stdout).toBe('Au revoir, Ada!');

    const polish = await runCli(['farewell', 'Ada', '--lang', 'pl']);
    expect(polish.stdout).toBe('Do widzenia, Ada!');

    const spanish = await runCli(['farewell', 'Ada', '--lang', 'es']);
    expect(spanish.stdout).toBe('Adiós, Ada!');
  });
});
