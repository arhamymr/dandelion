
import {
  finishToken,
  types, // types
  IFullToken, //types
  ILocation
} from "./types"

import * as charCodes from "charcodes";

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
  getLocation(l = 0) {
    // l = length string
    return {
      ...this.loc,
      start: this.pos,
      end: this.pos + l
    }
  }

  peekNext(step = 1) {
    return this.input.charCodeAt(this.pos + step)
  }

  peekPrev(step = 1) {
    return this.input.charCodeAt(this.pos - step)
  }

  readString() {
    let str = ""
    let cc = this.input.charCodeAt(this.pos)
    // while (cc !== 34 && cc !== 39 && !this.isEndOfFile()) {
    //   str += this.input[this.pos]
    //   cc = this.input.charCodeAt(++this.pos)
    // }

    this.tokens.push(finishToken(this.getLocation(), types.string, str))
  }


  readNumber() {
    let numb = ""
    while (charCodes.isDigit(this.input.charCodeAt(this.pos))) {
      numb += this.input[this.pos]
      this.pos++
    }
    this.tokens.push(finishToken(this.getLocation(), types.number, numb))
  }

  skipInlineComment() {
    const cc = this.input.charCodeAt(this.pos)
    while (cc !== 10 && cc !== 13) {
      this.pos++
    }
  }

  skipMultilineComment() {
    const cc = this.input.charCodeAt(this.pos)
    if (cc === 47 && this.peekNext() === 42) {  // /*
      this.pos += 2
      while (cc !== 47 && this.peekPrev() !== 42) { // * and /
        this.pos++
      }
    }
  }

  readWord() {
    let value = ""

    value += this.char
    this.char = this.input[++this.pos]
    const loc = {
      line: this.loc.line,
      start: this.pos - value.length,
      end: this.pos - 1
    }

    this.tokens.push(finishToken(loc, types.identifier, value))

    return value
  }


  isEndOfFile() {
    return this.pos >= this.input.length
  }

  run() {
    while (!this.isEndOfFile()) {
      const cc = this.input.charCodeAt(this.pos);
      console.log(cc, this.input[this.pos])
      switch (cc) {
        case charCodes.space: // space
        case charCodes.carriageReturn: // carriage break \r
        case charCodes.tab: // tab \t
          this.pos++
          break
        case charCodes.lineFeed: //  new line \n
          this.tokens.push(finishToken(this.getLocation(), types.newLine))
          this.loc.line++
          this.pos++
          break
        case charCodes.digit0:
        case charCodes.digit1:
        case charCodes.digit2:
        case charCodes.digit3:
        case charCodes.digit4:
        case charCodes.digit5:
        case charCodes.digit6:
        case charCodes.digit7:
        case charCodes.digit8:
        case charCodes.digit9:
          this.readNumber()
          break
        case charCodes.leftParenthesis: // (
          this.tokens.push(finishToken(this.getLocation(), types.lParent))
          this.pos++
          break
        case charCodes.rightParenthesis: // )
          this.tokens.push(finishToken(this.getLocation(), types.rParent))
          this.loc.line++
          this.pos++
          break
        case charCodes.leftSquareBracket: // [
          // not implement yet 
          this.pos++
          break
        case charCodes.rightSquareBracket: // ]
          // not implement yet   
          this.pos++
          break
        case charCodes.leftCurlyBrace: // {
          // not implement  
          this.pos++
          break
        case charCodes.rightCurlyBrace: // }
          // not implement 
          this.pos++
          break
        case charCodes.comma: // ,
          this.pos++
          break
        case charCodes.semicolon: // ;
          this.tokens.push(finishToken(this.getLocation(), types.semiColon))
          this.pos++
          break
        case charCodes.dot: // .
          this.tokens.push(finishToken(this.getLocation(), types.dot))
          this.pos++
          break
        case charCodes.equalsTo: // =
          if (this.peekNext() === 61) {
            this.tokens.push(finishToken(this.getLocation(), types.equal))
            this.pos++
            break
          }
          if (this.peekNext() === 61 && this.peekNext(2) === 61) {
            this.tokens.push(finishToken(this.getLocation(), types.strichEqual))
            this.pos++
            break
          }
          this.tokens.push(finishToken(this.getLocation(), types.assignment))
          this.pos++
          break
        case charCodes.exclamationMark: // !
          this.tokens.push(finishToken(this.getLocation(), types.not))
          this.pos++
          break
        case charCodes.asterisk: // *
          this.tokens.push(finishToken(this.getLocation(), types.multiplication))
          this.pos++
          break
        case charCodes.plusSign: // +
          console.log(cc, this.pos, this.input[this.pos], "+")
          this.tokens.push(finishToken(this.getLocation(), types.addition))
          this.pos++
          break
        case charCodes.dash: // -
          this.tokens.push(finishToken(this.getLocation(), types.subtraction))
          this.pos++
          break
        case charCodes.slash: // /
          if (this.peekNext() === charCodes.slash) { // /
            this.skipInlineComment()
            break
          }
          if (this.peekNext() === charCodes.asterisk) { // *
            this.skipMultilineComment()
            break
          }
          this.tokens.push(finishToken(this.getLocation(), types.division))
          break
        case charCodes.lessThan: // <
          this.tokens.push(finishToken(this.getLocation(), types.lessThan))
          this.pos++
          break
        case charCodes.greaterThan: // >
          this.tokens.push(finishToken(this.getLocation(), types.greaterThan))
          this.pos++
          break
        case charCodes.ampersand: // &
          //   this.pos++
          //   this.tokens.push(finishToken(this.getLocation(), types.and))
          // not implement
          this.pos++
          break
        case charCodes.verticalBar: // |
          // this.pos++
          // this.tokens.push(finishToken(this.getLocation(), types.or))
          // not implement 
          this.pos++
          break
        case charCodes.questionMark: // ?
          this.tokens.push(finishToken(this.getLocation(), types.question))
          this.pos++
          break
        case charCodes.colon: // :
          this.tokens.push(finishToken(this.getLocation(), types.colon))
          this.pos++
          break
        case charCodes.quotationMark: // "
          this.readString()
          break
        default:
          throw new Error(String.fromCharCode(cc) + " undefined token")
      }
    }

    return this.tokens
  }
}

