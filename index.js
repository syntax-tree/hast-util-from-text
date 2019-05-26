'use strict'

var eof = 0 // ''
var lineFeed = 10 // '\n'
var carriageReturn = 13 // '\r'

module.exports = fromText

// Implementation of the `innerText` setter:
// <https://html.spec.whatwg.org/#the-innertext-idl-attribute>
// Note that `innerText` only exists on element.
// In this utility, we accept all parent nodes and handle them as elements, and
// for all literals we set the `value` of the given node the the given value.
function fromText(node, value) {
  var fn = 'children' in node ? setParent : setLiteral
  var val = value === null || value === undefined ? '' : String(value)

  fn(node, val)

  return node
}

function setParent(node, value) {
  var nodes = []
  var length = value.length
  var index = 0
  var start = 0
  var end = -1
  var char = 0
  var br = false

  node.children = []

  while (index <= length) {
    char = index === length ? 0 : value.charCodeAt(index)

    switch (char) {
      case eof:
        end = index
        break
      case lineFeed:
        end = index
        br = true
        break
      case carriageReturn:
        end = index
        br = true

        if (value.charCodeAt(index + 1) === lineFeed) {
          index++
        }

        break
      default:
        break
    }

    index++

    if (end !== -1) {
      if (end !== start) {
        nodes.push({type: 'text', value: value.slice(start, end)})
      }

      if (br) {
        br = false
        nodes.push({
          type: 'element',
          tagName: 'br',
          properties: {},
          children: []
        })
      }

      end = -1
      start = index
    }
  }

  node.children = nodes
}

function setLiteral(node, value) {
  node.value = value
}
