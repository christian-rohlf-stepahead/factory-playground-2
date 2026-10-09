# I-4 Say goodbye in Spanish

## The request

> Say goodbye in Spanish: the second playground's farewell speaks Spanish when the caller asks for it.

## Problem

`farewell()` in **playground-2-is** already speaks three languages: English (default), French (`--lang fr`), and Polish (`--lang pl`), each added as one more value of the existing `lang` option. There is no way yet for a caller of the command line or the library function to get Spanish wording, even though the intent is explicit that "the second playground's farewell speaks Spanish when the caller asks for it."

## Outcome

A caller of playground-2-is's `farewell` — through the command line or by calling the library function directly — can ask for Spanish (`--lang es` / `{ lang: 'es' }`) and receive correctly worded Spanish text, exactly as they can already ask for French or Polish. Nothing changes for a caller who doesn't ask: English stays the default, and French and Polish keep producing byte-for-byte the same output they do today.

## Users

- A person or script invoking the `farewell` command in playground-2-is.
- A developer embedding the `farewell()` library function directly in their own TypeScript code.
- A Spanish-speaking caller who specifically wants Spanish wording instead of English, French, or Polish.

## Scope

In scope:
- Adding an `es` value to the existing `lang` option on `farewell()` in playground-2-is, producing the Spanish farewell.
- A matching `--lang es` value on the `farewell` command line, including its usage/help text.
- Keeping every existing default and language option (English, French, Polish) unchanged, byte-for-byte.
- Tests that pin the new Spanish behaviour, alongside the existing behaviour.

Out of scope:
- playground-is (its `greet`, `hello`, and `farewell` commands) — the intent names only "the second playground".
- Any language other than the ones already supported plus Spanish.
- Any change to how a caller selects a language in general — the `--lang` / `{ lang }` mechanism itself is pre-existing and unchanged; Spanish is just one more accepted value.
- playground-2-is has no web page (unlike playground-is), so there is no UI surface to extend.

## Behaviour

- `farewell(name)` with no language requested still returns `"Goodbye, <name>!"`, exactly as today.
- `farewell(name, { lang: 'fr' })` and `farewell(name, { lang: 'pl' })` still return their existing unchanged text.
- `farewell(name, { lang: 'es' })` returns the Spanish farewell (see question below for exact wording).
- `farewell` stays a pure function — Spanish is just another value for the existing `lang` parameter, returned as a string. Only `cli.ts` reads command-line arguments (including `--lang`) and prints to the console, per this repository's principle V.
- The `farewell` CLI's usage/help text lists `es` alongside the existing `en`, `fr`, `pl` values.

## Assumptions

- English stays the default when no language is specified; French and Polish stay exactly as they are today — no existing caller's output changes.
- Spanish is added as one more accepted value of the existing `lang` option/flag (code `es`, the same shape already used for `fr` and `pl`), not a new mechanism.
- The vocabulary needed is a single word (the farewell), so adding one more entry to the existing string table in `src/farewell.ts` is enough — no translation library or dependency is needed.
- Spanish uses no characters beyond what the project's existing diacritics (French `é`/`è`, Polish `ś`/`ć`/`ę`) already prove the toolchain and terminal handle, so no new encoding concern is introduced.

## Concerns

- Per the factory's principle IV ("a product decision is a person's"), the exact Spanish wording — including whether to use the leading inverted exclamation mark (`¡`) that is standard Spanish typography but not used by any of the other three languages in this table — is a choice a caller will see and live with going forward. It is raised as a question below rather than assumed.
- Per this repository's principle V, `farewell` must stay a pure function; the Spanish addition must be one more entry in its data/parameter, not logic that moves into the CLI.
- Per the factory's principle II, because English, French, and Polish all stay unchanged, no existing pinned behaviour is being altered — only new behaviour and new tests are being added, so no existing test should need to change.
- While reading the repository, an unrelated pre-existing gap was noticed: `cli.ts` passes any `--lang` value straight through without validating it, and `farewell()` has no fallback for an unrecognised language code — the English/French/Polish table entries exist, but a typo like `--lang xx` currently prints `"undefined, <name>!"` instead of falling back to English. This is not introduced by, or part of, this intent, and is left untouched here; flagging it in case the product manager wants it filed as its own fix.

## Acceptance criteria

- AC1 Running `node dist/cli.js farewell Ada` with no language option still prints "Goodbye, Ada!" (unchanged).
- AC2 Running the farewell CLI with `--lang es` prints the Spanish farewell for "Ada", using the product manager's chosen wording.
- AC3 Calling `farewell('Ada', { lang: 'es' })` returns the same Spanish farewell text.
- AC4 `farewell` stays a pure function that takes the language as a parameter and returns a string; no console or process I/O happens inside it.
- AC5 The farewell CLI's usage/help text mentions the `es` value for `--lang`.
- AC6 Automated tests cover the new Spanish behaviour for `farewell`, and all pre-existing tests (English, French, Polish) still pass unchanged.
- AC7 Pre-existing CLI behaviour (multi-word names, missing-argument usage, `--lang fr`, `--lang pl`) still passes unchanged.

## Clarifications

- Q1 What's the exact Spanish wording for the farewell? → "Adiós, <name>!" — plain style, matching the no-leading-punctuation look of the existing English/French/Polish entries

## Work items

| W | Title | Project | Criteria |
|---|---|---|---|
| W1 | Add a Spanish farewell to playground-2-is | Playground 2 IS | AC1, AC2, AC3, AC4, AC5, AC6, AC7 |

### W1 Add a Spanish farewell to playground-2-is

Kind: feature · Project: Playground 2 IS · Criteria: AC1, AC2, AC3, AC4, AC5, AC6, AC7

Add an `es` value to the existing `lang` option on `farewell()`, producing the Spanish farewell per the product manager's chosen wording; add `--lang es` to the `farewell` CLI command and its usage text; keep every existing default and language (English, French, Polish) unchanged; add tests that pin both the new Spanish behaviour and the unchanged existing behaviour.

**This work item is W1 (Playground 2 IS); its criteria: AC1 (spec AC1), AC2 (spec AC2), AC3 (spec AC3), AC4 (spec AC4), AC5 (spec AC5), AC6 (spec AC6), AC7 (spec AC7).**

Spec revision 2, approved by local-user at 2026-10-09T23:51:26.487Z. The factory's record is authoritative; this file is a copy (D-050).
