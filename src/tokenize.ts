
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

  peekPrevChar() {
    return this.input[this.pos - 1]
  }

  peekNextTwoChar() {
    return this.input[this.pos + 2]
  }

  nextChar() {
    return this.pos++
  }

  nextTwoChar() {
    return this.pos = this.pos + 2
  }

  readString(wrapper: string): void {
    let value = '';
    let completeQuote = '';

    while (completeQuote !== wrapper) {
      if (this.char === wrapper[0]) {
        completeQuote += this.char;
      } else {
        value += this.char;
      }

      this.char = this.input[++this.pos];
    }
    this.tokens.push(tokenType("STRING", value));
  }

  inlineComment() {
    while (this.char !== '\n') {
      this.char = this.input[++this.pos];
    }
  }

  multilineComment() {
    while (this.char !== '/' && this.peekPrevChar() !== '*') {
      this.char = this.input[++this.pos];
    }
  }

  readIdentifier() {
    let value = ''

    while (this.char !== ' ' && this.char !== '\n') {
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
    return value
  }

  run() {
    while (this.char !== undefined) {
      this.char = this.input[this.pos];

      if (this.char === undefined) {
        break;
      }

      if (this.char === ' ') {
        this.pos++
        continue
      }

      if (this.char === "/" && this.peekNextChar() === "/") {
        this.inlineComment()
        continue
      }

      if (this.char === "/" && this.peekNextChar() === "*") {
        this.multilineComment()
        // continue
      }

      if (isString(this.char) || isNumber(this.char)) {
        this.readIdentifier()
        continue
      }

      if (this.char === '=') {
        if (this.peekNextChar() === '>') {
          this.tokens.push(tokenType("ARROW", "=>"));
          this.nextTwoChar()
          continue
        }

        this.tokens.push(tokenType("ASSIGNMENT", this.char));
        this.pos++
        continue
      }

      if (this.char === '&') {
        if (this.peekNextChar() === '&') {
          this.tokens.push(tokenType("LOG_AND_OP", "&&"))
          this.nextTwoChar()
          continue
        }
      }

      if (this.char === '|') {
        if (this.peekNextChar() === '|') {
          this.tokens.push(tokenType("LOG_OR_OP", "&&"))
          this.nextTwoChar()
          continue
        }
      }

      if (this.char === '?') {
        if (this.peekNextChar() === '?') {
          this.tokens.push(tokenType("BIN_LOG_OPERATOR", "&&"))
          this.nextTwoChar()
          continue
        }
      }


      if (this.char === '\n') {
        this.pos++
        this.tokens.push(tokenType("NEW_LINE", this.char));
        continue
      }

      if (this.char === '"') {
        this.readString('""')
        continue
      }

      if (this.char === '\'') {
        this.readString('\'\'');
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

      // console.log(this.pos, this.char, this.tokens)
      // throw new Error(this.char + ' invalid token')
      console.log(this.char)
      this.pos++
    }
    console.log(this.tokens, "position here")
  }
}
