/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Text} Text
 */

/**
 * @typedef {Element & {tagName: 'br'}} BreakElement
 */

const search = /\r?\n|\r/g

/**
 * Set the plain-text value of a node.
 *
 * ###### Algorithm
 *
 * *   if `tree` is a `comment` or `text`, sets its `value`
 * *   if `tree` is a `element` or `root`, replaces its children with a `br`
 *     element for every line ending and a `text` for everything else
 *
 * ###### Notes
 *
 * `innerText` only exists on elements.
 * In this utility, we accept all parent nodes and handle them as elements, and
 * for all literals we set the `value` of the given node the given value.
 *
 * @param {Nodes} tree
 *   Node to change.
 * @param {string | null | undefined} [text]
 *   Value to set (default: `''`).
 * @returns {undefined}
 *   Nothing.
 */
export function fromText(tree, text) {
  const value = text === null || text === undefined ? '' : String(text)

  if ('children' in tree) {
    /** @type {Array<BreakElement | Text>} */
    const nodes = []
    let start = 0

    while (start < value.length) {
      search.lastIndex = start
      const match = search.exec(value)
      const end = match ? match.index : value.length

      if (end !== start) {
        nodes.push({type: 'text', value: value.slice(start, end)})
      }

      start = end

      if (match) {
        start += match[0].length
        nodes.push({
          type: 'element',
          tagName: 'br',
          properties: {},
          children: []
        })
      }
    }

    tree.children = nodes
  } else if (tree.type !== 'doctype') {
    tree.value = value
  }
}
