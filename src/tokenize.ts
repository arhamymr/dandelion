
import { ItemToken } from './token-type';
import {
  tokenType,
  isNumber,
  isString,
  isKeyword,
} from './token-utils';

export class Tokenizer {
  input: string
  tokens: ItemToken[]
  char: string
  pos: number

  constructor(input: string) {
    this.input = input;
    this.tokens = []
    this.char = ""
    this.pos = 0
  }

  peekNextChar() {
    return this.input[this.pos + 1]
  }

  peekNextTwoChar() {
    return this.input[this.pos + 2]
  }

  nextChar() {
    return this.pos++
  }

  run() {
    while (this.char !== undefined) {
      this.char = this.input[this.pos];

      if (isString(this.char) || isNumber(this.char)) {
        let value = '';

        while (this.char !== " " && this.char !== "\n") {
          value += this.char;
          this.char = this.input[++this.pos];
        }

        if (isKeyword(value)) {
          this.tokens.push(tokenType("KEYWORD", value))
        } else if (isNaN(parseInt(value))) {
          this.tokens.push(tokenType("IDENTIFIER", value));
        } else {
          this.tokens.push(tokenType("NUMBER", value));
        }
        continue
      }

      if (this.char === '=') {
        if (this.char[++this.pos]) {
          let value = '';
          while (this.char !== ' ') {
            value += this.char;
            this.char = this.input[++this.pos];
          }
          this.tokens.push(tokenType("ANOTHER", value));
        } else {
          this.tokens.push(tokenType("ASSIGNMENT", this.char));
        }

        continue
      }

      if (this.char === '\n') {
        this.pos++
        this.tokens.push(tokenType("NEW_LINE", this.char));
        continue
      }

      if (this.char === '"') {
        let value = '';
        let completeQuote = '';
        // console.log(pos, this.char, completeQuote, "inside stirng")
        while (completeQuote !== '""') {
          if (this.char === '"') {
            completeQuote += this.char;
          }

          value += this.char;
          this.char = this.input[++this.pos];
        }

        this.tokens.push(tokenType("STRING", value));
        continue
      }

      if (this.char === "'") {
        let value = '';
        let completeQuote = '';
        // console.log(pos, this.char, completeQuote, "inside stirng")
        while (completeQuote !== "''") {
          if (this.char === "'") {
            completeQuote += this.char;
          }

          value += this.char;
          this.char = this.input[++this.pos];
        }

        this.tokens.push(tokenType("STRING", value));
        continue
      }

      if (this.char === '(') {
        this.pos++
        this.tokens.push(tokenType("PARENT_L", this.char));
        continue
      }

      if (this.char === ')') {
        this.pos++
        this.tokens.push(tokenType("PARENT_R", this.char));
        continue
      }

      if (this.char === '{') {
        this.pos++
        this.tokens.push(tokenType("BRACE_L", this.char));
        continue
      }

      if (this.char === '}') {
        this.pos++
        this.tokens.push(tokenType("BRACE_R", this.char));
        continue
      }


      if (this.char === " ") {
        this.pos++
        continue
      }

      console.log(this.pos, this.char, this.tokens)
      throw new Error(this.char + ' invalid token')
    }
  }
}
