/**
 * @typedef {import('hast').Parent['children'][number]|import('hast').Root} HastNode
 * @typedef {import('hast').Text} HastText
 * @typedef {import('hast').Element & {tagName: 'br'}} HastBreakElement
 */

var search = /\r?\n|\r/g

/**
 * Implementation of the `innerText` setter:
 * <https://html.spec.whatwg.org/#the-innertext-idl-attribute>
 * Note that `innerText` only exists on element.
 * In this utility, we accept all parent nodes and handle them as elements, and
 * for all literals we set the `value` of the given node the the given value.
 *
 * @template {HastNode} T
 * @param {T} node
 * @param {string} [content]
 * @returns {T}
 */
export function fromText(node, content) {
  var value = content === undefined || content === null ? '' : String(content)
  /** @type {Array.<HastBreakElement|HastText>} */
  var nodes = []
  var start = 0
  /** @type {RegExpMatchArray} */
  var match
  /** @type {number} */
  var end

  if ('children' in node) {
    while (start < value.length) {
      search.lastIndex = start
      match = search.exec(value)
      end = match ? match.index : value.length

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
  } else {
    node.value = value
  }

  return node
}
