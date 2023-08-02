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
    assert.deepEqual(
      // @ts-expect-error runtime.
      fromText(u('text'), 'foo'),
      u('text', 'foo')
    )
  })

  await t.test('should reset text nodes (1)', async function () {
    assert.deepEqual(
      // @ts-expect-error runtime.
      fromText(u('text')),
      u('text', '')
    )
  })

  await t.test('should reset text nodes (2)', async function () {
    assert.deepEqual(fromText(u('text', 'foo')), u('text', ''))
  })

  await t.test('should set parent nodes', async function () {
    assert.deepEqual(fromText(h('p'), 'foo'), h('p', 'foo'))
  })

  await t.test(
    'should set parent nodes with <br>s if ␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), 'foo\nbar\nbaz'),
        h('p', ['foo', h('br'), 'bar', h('br'), 'baz'])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if ␍ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), 'foo\rbar\rbaz'),
        h('p', ['foo', h('br'), 'bar', h('br'), 'baz'])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if ␍␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), 'foo\r\nbar\r\nbaz'),
        h('p', ['foo', h('br'), 'bar', h('br'), 'baz'])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if a final ␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), 'foo\n'),
        h('p', ['foo', h('br')])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if a final ␍␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), 'foo\r'),
        h('p', ['foo', h('br')])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if a final ␍␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), 'foo\r\n'),
        h('p', ['foo', h('br')])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if an initial ␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), '\nfoo'),
        h('p', [h('br'), 'foo'])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if an initial ␍␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), '\rfoo'),
        h('p', [h('br'), 'foo'])
      )
    }
  )

  await t.test(
    'should set parent nodes with <br>s if an initial ␍␊ is used',
    async function () {
      assert.deepEqual(
        fromText(h('p', 'foo'), '\r\nfoo'),
        h('p', [h('br'), 'foo'])
      )
    }
  )

  await t.test('should reset parent nodes (1)', async function () {
    assert.deepEqual(fromText(h('p')), h('p'))
  })

  await t.test('should reset parent nodes (2)', async function () {
    assert.deepEqual(fromText(h('p', 'foo')), h('p'))
  })
})
