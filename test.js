import test from 'tape'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {fromText} from './index.js'

test('hast-util-from-text', (t) => {
  t.deepEqual(
    // @ts-ignore runtime.
    fromText(u('text'), 'foo'),
    u('text', 'foo'),
    'should set text nodes'
  )

  // @ts-ignore runtime.
  t.deepEqual(fromText(u('text')), u('text', ''), 'should reset text nodes (1)')

  t.deepEqual(
    fromText(u('text', 'foo')),
    u('text', ''),
    'should reset text nodes (2)'
  )

  t.deepEqual(fromText(h('p'), 'foo'), h('p', 'foo'), 'should set parent nodes')

  t.deepEqual(
    fromText(h('p', 'foo'), 'foo\nbar\nbaz'),
    h('p', ['foo', h('br'), 'bar', h('br'), 'baz']),
    'should set parent nodes with <br>s if ␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), 'foo\rbar\rbaz'),
    h('p', ['foo', h('br'), 'bar', h('br'), 'baz']),
    'should set parent nodes with <br>s if ␍ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), 'foo\r\nbar\r\nbaz'),
    h('p', ['foo', h('br'), 'bar', h('br'), 'baz']),
    'should set parent nodes with <br>s if ␍␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), 'foo\n'),
    h('p', ['foo', h('br')]),
    'should set parent nodes with <br>s if a final ␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), 'foo\r'),
    h('p', ['foo', h('br')]),
    'should set parent nodes with <br>s if a final ␍␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), 'foo\r\n'),
    h('p', ['foo', h('br')]),
    'should set parent nodes with <br>s if a final ␍␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), '\nfoo'),
    h('p', [h('br'), 'foo']),
    'should set parent nodes with <br>s if an initial ␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), '\rfoo'),
    h('p', [h('br'), 'foo']),
    'should set parent nodes with <br>s if an initial ␍␊ is used'
  )

  t.deepEqual(
    fromText(h('p', 'foo'), '\r\nfoo'),
    h('p', [h('br'), 'foo']),
    'should set parent nodes with <br>s if an initial ␍␊ is used'
  )

  t.deepEqual(fromText(h('p')), h('p'), 'should reset parent nodes (1)')

  t.deepEqual(fromText(h('p', 'foo')), h('p'), 'should reset parent nodes (2)')

  t.end()
})
