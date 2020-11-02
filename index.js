'use strict'

module.exports = fromText

var search = /\r?\n|\r/g

// Implementation of the `innerText` setter:
// <https://html.spec.whatwg.org/#the-innertext-idl-attribute>
// Note that `innerText` only exists on element.
// In this utility, we accept all parent nodes and handle them as elements, and
// for all literals we set the `value` of the given node the the given value.
function fromText(node, content) {
  var value = content == null ? '' : String(content)
  var nodes = []
  var start = 0
  var match
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
