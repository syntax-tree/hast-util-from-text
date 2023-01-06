import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {fromText} from './index.js'
import * as mod from './index.js'

test('fromText', () => {
  const api = Object.keys(mod)
  assert.ok(api.includes('fromText'), 'should expose `fromText`')
  assert.equal(api.length, 1, 'should expose the public api')

  assert.deepEqual(
    // @ts-expect-error runtime.
    fromText(u('text'), 'foo'),
    u('text', 'foo'),
    'should set text nodes'
  )

  assert.deepEqual(
    // @ts-expect-error runtime.
    fromText(u('text')),
    u('text', ''),
    'should reset text nodes (1)'
  )

  assert.deepEqual(
    fromText(u('text', 'foo')),
    u('text', ''),
    'should reset text nodes (2)'
  )

  assert.deepEqual(
    fromText(h('p'), 'foo'),
    h('p', 'foo'),
    'should set parent nodes'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), 'foo\nbar\nbaz'),
    h('p', ['foo', h('br'), 'bar', h('br'), 'baz']),
    'should set parent nodes with <br>s if ␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), 'foo\rbar\rbaz'),
    h('p', ['foo', h('br'), 'bar', h('br'), 'baz']),
    'should set parent nodes with <br>s if ␍ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), 'foo\r\nbar\r\nbaz'),
    h('p', ['foo', h('br'), 'bar', h('br'), 'baz']),
    'should set parent nodes with <br>s if ␍␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), 'foo\n'),
    h('p', ['foo', h('br')]),
    'should set parent nodes with <br>s if a final ␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), 'foo\r'),
    h('p', ['foo', h('br')]),
    'should set parent nodes with <br>s if a final ␍␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), 'foo\r\n'),
    h('p', ['foo', h('br')]),
    'should set parent nodes with <br>s if a final ␍␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), '\nfoo'),
    h('p', [h('br'), 'foo']),
    'should set parent nodes with <br>s if an initial ␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), '\rfoo'),
    h('p', [h('br'), 'foo']),
    'should set parent nodes with <br>s if an initial ␍␊ is used'
  )

  assert.deepEqual(
    fromText(h('p', 'foo'), '\r\nfoo'),
    h('p', [h('br'), 'foo']),
    'should set parent nodes with <br>s if an initial ␍␊ is used'
  )

  assert.deepEqual(fromText(h('p')), h('p'), 'should reset parent nodes (1)')

  assert.deepEqual(
    fromText(h('p', 'foo')),
    h('p'),
    'should reset parent nodes (2)'
  )
})
