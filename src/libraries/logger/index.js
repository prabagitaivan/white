import { formatOutput } from './formatter'

// inspired from https://github.com/mdn/bob
const logger = (callback, original) =>
  function () {
    const outputs = []
    for (let i = 0; i < arguments.length; i++) {
      outputs.push(formatOutput(arguments[i]))
    }

    callback(outputs.join(' '))
    original.apply(console, arguments)
  }

export default logger
