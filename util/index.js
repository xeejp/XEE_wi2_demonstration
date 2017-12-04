import { ReadJSON } from './ReadJSON'

export function getPage(page) {
  var ret = ReadJSON().static_text["page"][page]
  return (ret)? ret : page
}
