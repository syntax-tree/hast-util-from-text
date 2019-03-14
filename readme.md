# hast-util-from-text

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Set the plain-text value of a [hast][] node.
This is like the DOMs `Node#innerText` setter.
The given node is returned.

You’d typically want to use [`hast-util-from-string`][from-string]
(`textContent`), but `hast-util-from-text` (`innerText`) adds `<br>` elements
instead of line breaks.

## Installation

[npm][]:

```bash
npm install hast-util-from-text
```

## Usage

```javascript
var h = require('hastscript')
var fromText = require('hast-util-from-text')

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

### `fromText(node[, value])`

If `node` is a literal (has a `value` property), set that to the given `value`
or an empty string.
If `node` is a parent node (has `children`), its children are replaced with new
children: text nodes for every run of text and `<br>` elements for every line
break (`\n`, `\r`, or `\r\n`).
If no `value` is given (empty string `''`, `null`, or `undefined`), all
children are removed.

## Related

*   [`hast-util-from-string`](https://github.com/rehypejs/rehype-minify/tree/master/packages/hast-util-from-string)
    — Set the plain-text value (`textContent`)
*   [`hast-util-to-string`](https://github.com/rehypejs/rehype-minify/tree/master/packages/hast-util-to-string)
    — Get the plain-text value (`textContent`)

## Contribute

See [`contributing.md` in `syntax-tree/hast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/hast-util-from-text.svg

[build]: https://travis-ci.org/syntax-tree/hast-util-from-text

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-from-text.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-from-text

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-from-text.svg

[downloads]: https://www.npmjs.com/package/hast-util-from-text

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[contributing]: https://github.com/syntax-tree/hast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/hast/blob/master/code-of-conduct.md

[from-string]: https://github.com/rehypejs/rehype-minify/tree/master/packages/hast-util-from-string
