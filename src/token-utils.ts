export type TypeToken = {
  label: string;
}

export type FullToken = {
  type: TypeToken,
  value: string | number
}

export const isString = (char: string) => /[a-zA-Z]/i.test(char)
export const isNumber = (char: string) => /[0-9]/i.test(char)
export const checkIncludes = (data: string[], char: string) => data.includes(char);

export const tokenType = (label: string): TypeToken => {
  return {
    label,
  }
}

export const finishToken = (type: TypeToken, value?: string): FullToken => {
  return {
    type,
    value: value || type.label
  }
}

// Binary Logical Operators

// && Logical AND.

// || Logical OR.

// ?? Nullish Coalescing Operator.

const binaryLogicalOperator = ["&&", "||", "??"];
export const isBinaryLogicalOperator = (char: string) => checkIncludes(binaryLogicalOperator, char)

// Equality operators 

// == Equality operator.
// != Inequality operator.
// === Strict equality operator.
// !== Strict inequality operator.

const equalityOperator = ["==", "!=", "===", "!=="]
export const isEqualityOperator = (char: string) => checkIncludes(equalityOperator, char)


// aritmetic operators

// +	Addition
// -	Subtraction
// *	Multiplication
// **	Exponentiation (ES2016)
// /	Division
// %	Modulus (Division Remainder)
// ++	Increment
// --	Decrement


const aritmeticOperator = ["+", "-", "*", "**", "/", "%", "++", "--"]
export const isAritmeticOperator = (char: string) => checkIncludes(aritmeticOperator, char)


// keyword javascript
const keyword = [
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

export const isKeyword = (char: string) => checkIncludes(keyword, char)


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
  exclamationMark: tokenType("!"),
  questionMark: tokenType("?"),
  numberSign: tokenType("#"),
  ampersand: tokenType("&"),

  lParent: tokenType("("),
  rParent: tokenType(")"),
  lQBracket: tokenType("{"),
  rQBracket: tokenType("}"),
  lSBracket: tokenType("["),
  rSBracket: tokenType("]"),

  colon: tokenType(":"),
  semiColor: tokenType(";"),
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
  unEqual: tokenType("!=="),
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
