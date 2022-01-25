export const formatOutput = inputs => {
  if (inputs === undefined || inputs === null || typeof inputs === 'boolean') {
    return String(inputs)
  } else if (typeof inputs === 'number') {
    if (Object.is(inputs, -0)) return '-0'
    return String(inputs)
  } else if (typeof inputs === 'bigint') {
    return `${String(inputs)}n`
  } else if (typeof inputs === 'string') {
    const quote = inputs.includes('"') ? "'" : '"'
    return `${quote}${inputs}${quote}`
  } else if (Array.isArray(inputs)) {
    return `Array [${formatArray(inputs)}]`
  } else {
    return formatObject(inputs)
  }
}

export const formatArray = inputs => {
  return inputs
    .map(input => {
      if (Array.isArray(input)) {
        return `Array [${formatArray(input)}]`
      } else {
        return formatOutput(input)
      }
    })
    .join(', ')
}

export const formatObject = inputs => {
  const objectName = inputs.constructor.name

  if (inputs === JSON) {
    return `JSON {}`
  }

  const bufferDataViewRegExp = /^(ArrayBuffer|SharedArrayBuffer|DataView)$/
  if (objectName.match && objectName.match(bufferDataViewRegExp)) {
    return `${objectName} {}`
  }

  const complexArrayRegExp = /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|BigInt64Array|BigUint64Array)$/
  if (objectName.match && objectName.match(complexArrayRegExp)) {
    return `${objectName} [${formatArray(inputs)}]`
  }

  const simpleObject = /^(String|Number|Boolean)$/
  if (objectName.match && objectName.match(simpleObject)) {
    const value = formatOutput(inputs.valueOf())
    return `${objectName} {${value}}`
  }

  if (objectName === 'Symbol') {
    return inputs.toString()
  }

  const content = Object.keys(inputs)
    .map(key => `${key}: ${formatOutput(inputs[key])}`)
    .join(', ')
  return `Object {${content}}`
}
