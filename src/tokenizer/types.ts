export interface ITypeToken {
  label: string;
}

export interface IFullToken {
  type: ITypeToken,
  value: string | number
  loc: ILocation
}

export interface ILocation {
  line: number
  start: number
  end: number
}

export const tokenType = (label: string): ITypeToken => {
  return {
    label,
  }
}

export const finishToken = (loc: ILocation, type: ITypeToken, value?: string,): IFullToken => {
  return {
    type,
    value: value || type.label,
    loc,
  }
}

// keyword javascript
export const keyword = [
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "super",
  "switch",
  "static",
  "this",
  "throw",
  "try",
  "true",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield"
];


export const types = {
  string: tokenType("string"),
  number: tokenType("number"),
  keyword: tokenType("keyword"),
  identifier: tokenType("identifier"),
  newLine: tokenType("\n"),
  // functuation
  // !"#$%&"()*+,-./:;< => ?@[\]^_`{|}~
  assignment: tokenType("="),
  arrow: tokenType("=>"),
  not: tokenType("!"),
  question: tokenType("?"),
  numberSign: tokenType("#"),
  ampersand: tokenType("&"),

  lParent: tokenType("("),
  rParent: tokenType(")"),
  lCBracket: tokenType("{"),
  rCBracket: tokenType("}"),
  lSBracket: tokenType("["),
  rSBracket: tokenType("]"),

  colon: tokenType(":"),
  semiColon: tokenType(";"),
  comma: tokenType(","),
  dot: tokenType("."),

  // == Equality operator.
  // != Inequality operator.
  // === Strict equality operator.
  // !== Strict inequality operator.
  // > Greater than
  // >= Greater than equal
  // < Less than
  // <= Less than equal

  equal: tokenType("==",),
  inEqual: tokenType("!="),
  strichEqual: tokenType("==="),
  strichInEqual: tokenType("!=="),
  greaterThan: tokenType(">",),
  greaterThanEq: tokenType(">="),
  lessThan: tokenType("<"),
  lessThanEq: tokenType("<="),

  // aritmethic operator 

  // +	Addition
  // -	Subtraction
  // *	Multiplication
  // **	Exponentiation (ES2016)
  // /	Division
  // %	Modulus (Division Remainder)
  // ++	Increment
  // --	Decrement

  addition: tokenType("+"),
  subtraction: tokenType("-"),
  multiplication: tokenType("*"),
  exponential: tokenType("**"),
  division: tokenType("/"),
  modulus: tokenType("%"),
  increment: tokenType("++"),
  decrement: tokenType("--"),
  // Binary Logical Operators
  // && Logical AND
  // || Logical OR.
  // ?? Nullish Coalescing Operator.
  andand: tokenType("&&"),
  or: tokenType("||"),
  nullish: tokenType("??"),
}
