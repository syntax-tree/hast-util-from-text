import assert from 'node:assert/strict'
import test from 'node:test'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {fromText} from './index.js'

test('fromText', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'fromText'
    ])
  })

  await t.test('should set text nodes', async function () {
    const node = u('text')
    // @ts-expect-error: check how a missing `value` is handled.
    fromText(node, 'foo')
    assert.deepEqual(node, u('text', 'foo'))
  })

  await t.test('should reset text nodes (1)', async function () {
    const node = u('text')
    // @ts-expect-error: check how a missing `value` is handled.
    fromText(node)
    assert.deepEqual(node, u('text', ''))
  })

  await t.test('should reset text nodes (2)', async function () {
    const node = u('text', 'foo')
    fromText(node, '')
    assert.deepEqual(node, u('text', ''))
  })

  await t.test('should set parent nodes', async function () {
    const node = h('p')
    fromText(node, 'foo')
    assert.deepEqual(node, h('p', 'foo'))
  })

  await t.test(
    'should set parent nodes with <br>s if ␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, 'foo\nbar\nbaz')
      assert.deepEqual(node, h('p', ['foo', h('br'), 'bar', h('br'), 'baz']))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if ␍ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, 'foo\rbar\rbaz')
      assert.deepEqual(node, h('p', ['foo', h('br'), 'bar', h('br'), 'baz']))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if ␍␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, 'foo\r\nbar\r\nbaz')
      assert.deepEqual(node, h('p', ['foo', h('br'), 'bar', h('br'), 'baz']))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if a final ␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, 'foo\n')
      assert.deepEqual(node, h('p', ['foo', h('br')]))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if a final ␍␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, 'foo\r')
      assert.deepEqual(node, h('p', ['foo', h('br')]))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if a final ␍␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, 'foo\r\n')
      assert.deepEqual(node, h('p', ['foo', h('br')]))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if an initial ␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, '\nfoo')
      assert.deepEqual(node, h('p', [h('br'), 'foo']))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if an initial ␍␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, '\rfoo')
      assert.deepEqual(node, h('p', [h('br'), 'foo']))
    }
  )

  await t.test(
    'should set parent nodes with <br>s if an initial ␍␊ is used',
    async function () {
      const node = h('p', 'foo')
      fromText(node, '\r\nfoo')
      assert.deepEqual(node, h('p', [h('br'), 'foo']))
    }
  )

  await t.test('should reset parent nodes (1)', async function () {
    const node = h('p')
    fromText(node)
    assert.deepEqual(node, h('p'))
  })

  await t.test('should reset parent nodes (2)', async function () {
    const node = h('p', 'foo')
    fromText(node)
    assert.deepEqual(node, h('p'))
  })
})
