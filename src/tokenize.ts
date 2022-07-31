
import {
  isNumber,
  isString,
  isKeyword,
  finishToken,
  types, // types
  IFullToken, //types
  ILocation
} from "./token-utils"

export class Tokenizer {
  input: string
  tokens: IFullToken[]
  char: string
  pos: number
  loc: ILocation

  constructor(input: string) {
    this.input = input
    this.tokens = []
    this.char = ""
    this.pos = 0
    this.loc = {
      line: 1,
      start: 1,
      end: 1
    }
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

    const loc = {
      line: this.loc.line,
      start: this.pos - 1 - value.length,
      end: this.pos - 2
    }

    this.tokens.push(finishToken(loc, types.string, value))
  }

  inlineComment() {
    while (this.char !== "\n") {
      this.char = this.input[++this.pos]
      if (this.char === undefined) break;
    }
  }

  multilineComment() {
    while (this.char !== "/" && this.peekPrev() !== "*") {
      console.log("masuk sini yuk")
      if (this.char === "\n") this.loc.line++
      this.char = this.input[++this.pos]
      if (this.char === undefined) break;
    }
  }

  readIdentifier() {
    let value = ""

    while (this.char !== " " && this.char !== "\n") {
      value += this.char
      this.char = this.input[++this.pos]
    }

    const loc = {
      line: this.loc.line,
      start: this.pos - value.length,
      end: this.pos - 1
    }

    if (isKeyword(value)) {
      this.tokens.push(finishToken(loc, types.keyword, value))
    } else if (isNaN(parseInt(value))) {
      this.tokens.push(finishToken(loc, types.identifier, value))
    } else {
      this.tokens.push(finishToken(loc, types.number, value))
    }
    return value
  }

  getLocation(l = 0) {
    // l = length string
    return {
      ...this.loc,
      start: this.pos,
      end: this.pos + l
    }
  }

  run() {

    while (this.char !== undefined) {
      this.char = this.input[this.pos]

      console.log(this.loc, "this loc")
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

      if (this.char === "/" && this.peekNext() === "*") {
        this.pos = this.pos + 2
        // this.multilineComment()
        while (this.char !== "/" && this.peekPrev() !== "*") {
          const pos = ++this.pos
          this.char = this.input[pos]
          if (this.char === undefined) break;
        }
        continue
      }

      if (isString(this.char) || isNumber(this.char)) {
        this.readIdentifier()
        continue
      }

      if (this.char === "!") {
        if (this.peekNext() === "=" && this.peekNext(2) !== "=") {
          this.tokens.push(finishToken(this.getLocation(2), types.inEqual))
          this.pos = this.pos + 2
          continue
        }

        if (this.peekNext() === "=" && this.peekNext(2) === "=") {
          this.tokens.push(finishToken(this.getLocation(2), types.strichInEqual))
          this.pos = this.pos + 3
          continue
        }

        this.tokens.push(finishToken(this.loc, types.exclamationMark))
        this.pos++
        continue
      }


      if (this.char === "=") {
        if (this.peekNext() === ">") {
          this.tokens.push(finishToken(this.getLocation(1), types.arrow))
          this.pos = this.pos + 2
          continue
        }

        if (this.peekNext() === "=" && this.peekNext(2) !== "=") {
          this.tokens.push(finishToken(this.getLocation(1), types.equal))
          this.pos = this.pos + 2
          continue
        }

        if (this.peekNext() === "=" && this.peekNext(2) === "=") {
          this.tokens.push(finishToken(this.getLocation(2), types.strichEqual))
          this.pos = this.pos + 3
          continue
        }

        this.tokens.push(finishToken(this.getLocation(), types.assignment))
        this.pos++
        continue
      }

      if (this.char === "&") {
        if (this.peekNext() === "&") {
          this.tokens.push(finishToken(this.getLocation(), types.andand))
          this.pos = this.pos + 2
          continue
        }
      }

      if (this.char === "|") {
        if (this.peekNext() === "|") {
          this.tokens.push(finishToken(this.getLocation(1), types.or))
          this.pos = this.pos + 2
          continue
        }
      }

      if (this.char === "?") {
        if (this.peekNext() === "?") {
          this.tokens.push(finishToken(this.getLocation(1), types.nullish))
          this.pos = this.pos + 2
          continue
        }
      }


      if (this.char === "\n") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.newLine))
        this.loc.line++
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
        this.tokens.push(finishToken(this.getLocation(), types.lParent))
        continue
      }

      if (this.char === ")") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.rParent))
        continue
      }

      if (this.char === "{") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.lQBracket))
        continue
      }

      if (this.char === "}") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.rQBracket))
        continue
      }

      if (this.char === "?") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.questionMark))
        continue
      }

      if (this.char === ":") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.colon))
        continue
      }

      if (this.char === ";") {
        this.pos++
        this.tokens.push(finishToken(this.getLocation(), types.semiColon))
        continue
      }

      throw new Error(`invalid token ${this.char} on line: ${this.loc.line}`)
    }
    return this.tokens
  }
}
