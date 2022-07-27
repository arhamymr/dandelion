export type ItemToken = {
  type: string;
  value: string | boolean;
}


export const isString = (char: string) => /[a-zA-Z]/i.test(char)
export const isNumber = (char: string) => /[0-9]/i.test(char)
export const checkIncludes = (data: string[], char: string) => data.includes(char);

export const tokenType = (type: string, value: string): ItemToken => {
  return {
    type,
    value
  }
}

// export const checkValueNeighbor = (pos: number, code: string) => {
//   const prevChar = code[pos - 1]
//   const nextChar = code[pos + 1]

//   if (isNumber(prevChar) || isNumber(nextChar) || isString(prevChar) || isString(nextChar)) {
//     return true
//   }
//   return false
// }


// Binary Logical Operators

// && Logical AND.

// || Logical OR.

// ?? Nullish Coalescing Operator.

const binaryLogicalOperator = ['&&', '||', '??'];
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


const aritmeticOperator = ['+', '-', '*', '**', '/', "%", '++', '--']
export const isAritmeticOperator = (char: string) => checkIncludes(aritmeticOperator, char)

export const tokenArithemeticOperator = (char: string) => {
  return tokenType('OPERATOR', char)
}

// keyword javascript
const keyword = [
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'super',
  'switch',
  'static',
  'this',
  'throw',
  'try',
  'true',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield'
];

export const isKeyword = (char: string) => checkIncludes(keyword, char)

export const tokenKeyword = (char: string) => {
  return tokenType('KEYWORD', char)
}



