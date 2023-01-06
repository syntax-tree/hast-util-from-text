/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast').Element} Element
 */

/**
 * @typedef {Content | Root} Node
 * @typedef {Element & {tagName: 'br'}} BreakElement
 */

const search = /\r?\n|\r/g

// To do next major: do not return given element.
/**
 * Set the plain-text value of a node.
 *
 * Implementation of the `innerText` setter:
 * <https://html.spec.whatwg.org/#the-innertext-idl-attribute>
 *
 * > 👉 **Note**: `innerText` only exists on elements.
 * > In this utility, we accept all parent nodes and handle them as elements,
 * > and for all literals we set the `value` of the given node the the given
 * > value.
 *
 * @template {Node} T
 *   Node type.
 * @param {T} node
 *   Tree to change.
 * @param {string | null | undefined} [text]
 *   Value to set.
 * @returns {T}
 *   Given, modified, tree.
 */
export function fromText(node, text) {
  const value = text === undefined || text === null ? '' : String(text)

  if ('children' in node) {
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

    node.children = nodes
  } else if (node.type !== 'doctype') {
    node.value = value
  }

  return node
}
