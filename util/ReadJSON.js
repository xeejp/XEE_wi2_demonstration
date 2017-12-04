import React from 'react'
import text from './language.json'

export function ReadJSON() {
  return text
}

export function LineBreak(text) {
  var regex = /(\n)/g
  return text.split(regex).map(function (line) {
    if (line.match(regex)) {
      return React.createElement('br')
    }
    else {
      return line
    }
  })
}
