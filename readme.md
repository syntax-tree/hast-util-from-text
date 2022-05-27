# hast-util-from-text

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to set the plain-text value of a node.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`fromText(node[, value])`](#fromtextnode-value)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that takes a [hast][] node and a string and sets that
value as its text.
It is like the DOMs `Node#innerText` setter, which can be a bit nicer than
`Node#textContent`, because this turns line endings into `<br>` elements.

## When should I use this?

This is a small utility that is useful when you want to set a string that is
close to how it’s “visible” to users.

This utility is similar to [`hast-util-from-string`][hast-util-from-string],
which is simpler, and like the `Node#textContent` algorithm discussed above.

There is also a package [`hast-util-to-text`][hast-util-to-text], which sort
of does the inverse: it takes a node and gets its text.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, 18.0+), install with [npm][]:

```sh
npm install hast-util-from-text
```

In Deno with [`esm.sh`][esmsh]:

```js
import {fromText} from "https://esm.sh/hast-util-from-text@2"
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {fromText} from "https://esm.sh/hast-util-from-text@2?bundle"
</script>
```

## Use

```js
import {h} from 'hastscript'
import {fromText} from 'hast-util-from-text'

fromText(h('p'), 'Alpha')
// { type: 'element',
//   tagName: 'p',
//   properties: {},
//   children: [ { type: 'text', value: 'Alpha' } ] }

fromText(h('p', [h('b', 'Bravo'), '.']), 'Charlie')
// { type: 'element',
//   tagName: 'p',
//   properties: {},
//   children: [ { type: 'text', value: 'Charlie' } ] }

fromText(h('p'), 'Delta\nEcho')
// { type: 'element',
//   tagName: 'p',
//   properties: {},
//   children:
//    [ { type: 'text', value: 'Delta' },
//      { type: 'element', tagName: 'br', properties: {}, children: [] },
//      { type: 'text', value: 'Echo' } ] }
```

## API

This package exports the identifier `fromText`.
There is no default export.

### `fromText(node[, value])`

If the given `node` is a *[literal][]*, set that to the given `value` or an
empty string.
If the given `node` is a *[parent][]*, its [children][child] are replaced with
new children: *[texts][text]* for every run of text and `<br>`
*[elements][element]* for every line break (a line feed, `\n`; a carriage
return, `\r`; or a carriage return + line feed, `\r\n`).
If no `value` is given (empty string `''`, `null`, or `undefined`), the
literal’s value is set to an empty string or the parent’s children are removed.

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Improper use can open you up to a [cross-site scripting (XSS)][xss] attack as
`value` is injected into the syntax tree.
If operating on a `<script>` element, `value` will run in a browser.

Do not use user input in `value` when operating on `script` elements or use
[`hast-util-santize`][sanitize].

## Related

*   [`hast-util-to-text`][hast-util-to-text]
    — get the plain-text value (`innerText`)
*   [`hast-util-to-string`](https://github.com/rehypejs/rehype-minify/tree/main/packages/hast-util-to-string)
    — get the plain-text value (`textContent`)
*   [`hast-util-from-string`][hast-util-from-string]
    — set the plain-text value (`textContent`)

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-from-text/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-from-text/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-from-text.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-from-text

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-from-text.svg

[downloads]: https://www.npmjs.com/package/hast-util-from-text

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-from-text.svg

[size]: https://bundlephobia.com/result?p=hast-util-from-text

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[hast-util-from-string]: https://github.com/rehypejs/rehype-minify/tree/main/packages/hast-util-from-string

[literal]: https://github.com/syntax-tree/unist#literal

[parent]: https://github.com/syntax-tree/unist#parent

[child]: https://github.com/syntax-tree/unist#child

[hast]: https://github.com/syntax-tree/hast

[text]: https://github.com/syntax-tree/hast#text

[element]: https://github.com/syntax-tree/hast#element

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[hast-util-to-text]: https://github.com/syntax-tree/hast-util-to-text
