import logger from '../logger'
import { formatOutput, formatArray, formatObject } from '../logger/formatter'

describe('libraries logger', () => {
  describe('main', () => {
    let callbackVal
    const callbackFn = value => {
      callbackVal = value
    }
    const originalFn = console.log

    beforeEach(() => {
      console.log = logger(callbackFn, originalFn)
    })
    afterEach(() => {
      console.log = originalFn
    })

    it('return callback with output data', async () => {
      console.log('test 1')
      expect(callbackVal).toEqual('"test 1"')

      console.log(2)
      expect(callbackVal).toEqual('2')

      console.log({})
      expect(callbackVal).toEqual('Object {}')
    })
  })
  /* eslint-disable no-undef, no-new-wrappers, symbol-description */
  describe('format', () => {
    it('return main output', () => {
      const format = formatOutput

      expect(format()).toEqual('undefined')
      expect(format(undefined)).toEqual('undefined')
      expect(format(null)).toEqual('null')
      expect(format(true)).toEqual('true')

      expect(format(1)).toEqual('1')
      expect(format(-0)).toEqual('-0')
      expect(format(BigInt(1))).toEqual('1n')

      expect(format("single'")).toEqual('"single\'"')
      expect(format('double"')).toEqual("'double\"'")

      expect(format([])).toEqual('Array []')
      expect(format({})).toEqual('Object {}')
    })
    it('return array output', () => {
      const format = formatArray

      expect(format([])).toEqual('')

      expect(format(["single'"])).toEqual('"single\'"')
      expect(format(['double"'])).toEqual("'double\"'")

      expect(format([[]])).toEqual('Array []')
      expect(format([{}])).toEqual('Object {}')
    })
    it('return object output', () => {
      const format = formatObject

      expect(format(JSON)).toEqual('JSON {}')

      expect(format(new ArrayBuffer())).toEqual('ArrayBuffer {}')
      expect(format(new SharedArrayBuffer())).toEqual('SharedArrayBuffer {}')
      expect(format(new DataView(new ArrayBuffer()))).toEqual('DataView {}')

      expect(format(new Int8Array())).toEqual('Int8Array []')
      expect(format(new Int16Array())).toEqual('Int16Array []')
      expect(format(new Int32Array())).toEqual('Int32Array []')
      expect(format(new Uint16Array())).toEqual('Uint16Array []')
      expect(format(new Uint32Array())).toEqual('Uint32Array []')
      expect(format(new Uint8ClampedArray())).toEqual('Uint8ClampedArray []')
      expect(format(new Float32Array())).toEqual('Float32Array []')
      expect(format(new Float64Array())).toEqual('Float64Array []')
      expect(format(new BigInt64Array())).toEqual('BigInt64Array []')
      expect(format(new BigUint64Array())).toEqual('BigUint64Array []')

      expect(format(new String())).toEqual('String {""}')
      expect(format(new String('"'))).toEqual("String {'\"'}")
      expect(format(new String("'"))).toEqual('String {"\'"}')
      expect(format(new Number())).toEqual('Number {0}')
      expect(format(new Number(1))).toEqual('Number {1}')
      expect(format(new Number('asdf'))).toEqual('Number {NaN}')
      expect(format(new Boolean())).toEqual('Boolean {false}')
      expect(format(new Boolean(1))).toEqual('Boolean {true}')
      expect(format(new Boolean('asdf'))).toEqual('Boolean {true}')

      expect(format(Symbol())).toEqual('Symbol()')
      expect(format(Symbol(1))).toEqual('Symbol(1)')

      expect(format({})).toEqual('Object {}')
      expect(format({ x: 1 })).toEqual('Object {x: 1}')
      expect(format({ x: {} })).toEqual('Object {x: Object {}}')

      class MyClass {
        constructor (x) {
          if (x) this.x = x
        }
      }
      expect(format(new MyClass())).toEqual('Object {}')
      expect(format(new MyClass(1))).toEqual('Object {x: 1}')
    })
  })
})
