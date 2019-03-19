import MatchRange from './MatchRange'
import ParsedAttribute from './ParsedAttribute'

export default interface ParsedStartTag extends MatchRange {
  name: string
  nameLowerCased: string
  namespace?: string
  attrs: ParsedAttribute[]
  void: boolean
  unarySlash: string
}
