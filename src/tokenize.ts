
import {
  tokenType,
  isNumber,
  isString,
  isKeyword,
  finishToken,
  types,
  TypeToken, // types
  FullToken, //types
} from "./token-utils"

export class Tokenizer {
  input: string
  tokens: FullToken[]
  char: string
  pos: number

  constructor(input: string) {
    this.input = input
    this.tokens = []
    this.char = ""
    this.pos = 0
  }

  peekNext(step = 1) {
    return this.input[this.pos + step]
  }

  peekPrev(step = 1) {
    return this.input[this.pos - step]
  }

  readString(wrapper: string): void {
    let value = ""
    let completeQuote = ""

    while (completeQuote !== wrapper) {
      if (this.char === wrapper[0]) {
        completeQuote += this.char
      } else {
        value += this.char
      }

      this.char = this.input[++this.pos]
    }
    this.tokens.push(finishToken(types.string, value))
  }

  inlineComment() {
    while (this.char !== "\n") {
      this.char = this.input[++this.pos]
    }
  }

  multilineComment() {
    while (this.char !== "/" && this.peekPrev() !== "*") {
      this.char = this.input[++this.pos]
    }
  }

  readIdentifier() {
    let value = ""

    while (this.char !== " " && this.char !== "\n") {
      value += this.char
      this.char = this.input[++this.pos]
    }

    if (isKeyword(value)) {
      this.tokens.push(finishToken(types.keyword, value))
    } else if (isNaN(parseInt(value))) {
      this.tokens.push(finishToken(types.identifier, value))
    } else {
      this.tokens.push(finishToken(types.number, value))
    }
    return value
  }

  run() {
    while (this.char !== undefined) {
      this.char = this.input[this.pos]

      if (this.char === undefined) {
        break
      }

      if (this.char === " ") {
        this.pos++
        continue
      }

      if (this.char === "/" && this.peekNext() === "/") {
        this.inlineComment()
        continue
      }

      // if (this.char === "/" && this.peekNextChar() === "*") {
      //   this.multilineComment()
      //   // continue
      // }

      if (isString(this.char) || isNumber(this.char)) {
        this.readIdentifier()
        continue
      }

      if (this.char === "=") {
        if (this.peekNext() === ">") {
          this.tokens.push(finishToken(types.arrow))
          this.pos = this.pos + 2
          continue
        }

        if (this.peekNext() === "=" && this.peekNext() !== "=") {
          this.tokens.push(finishToken(types.equal))
          this.pos = this.pos + 2
          continue
        }

        if (this.peekNext() === "=" && this.peekNext(2) === "=") {
          this.tokens.push(finishToken(types.strichEqual))
          this.pos = this.pos + 3
          continue
        }

        this.tokens.push(finishToken(types.assignment))
        this.pos++
        continue
      }

      if (this.char === "&") {
        if (this.peekNext() === "&") {
          this.tokens.push(finishToken(types.andand))
          this.pos = this.pos + 2
          continue
        }
      }

      if (this.char === "|") {
        if (this.peekNext() === "|") {
          this.tokens.push(finishToken(types.or))
          this.pos = this.pos + 2
          continue
        }
      }

      if (this.char === "?") {
        if (this.peekNext() === "?") {
          this.tokens.push(finishToken(types.nullish))
          this.pos = this.pos + 2
          continue
        }
      }


      if (this.char === "\n") {
        this.pos++
        this.tokens.push(finishToken(types.newLine))
        continue
      }

      if (this.char === "\"") {
        this.readString("\"\"")
        continue
      }

      if (this.char === "'") {
        this.readString("''")
        continue
      }

      if (this.char === "(") {
        this.pos++
        this.tokens.push(finishToken(types.lParent))
        continue
      }

      if (this.char === ")") {
        this.pos++
        this.tokens.push(finishToken(types.rParent))
        continue
      }

      if (this.char === "{") {
        this.pos++
        this.tokens.push(finishToken(types.lQBracket))
        continue
      }

      if (this.char === "}") {
        this.pos++
        this.tokens.push(finishToken(types.rQBracket))
        continue
      }

      // console.log(this.pos, this.char, this.tokens)
      // throw new Error(this.char + " invalid token")
      console.log(this.char)
      this.pos++
    }
    console.log(this.tokens, "position here")
  }
}
