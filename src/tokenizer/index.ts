
import {
  finishToken,
  types, // types
  IFullToken, //types
  ILocation
} from "./types"

import * as charCodes from "charcodes";

enum Errors {
  UnterminatedComment = "Unterminated comment",
  UnexpectedToken = "Unexpected token",
  UnterminatedString = "Unterminated String"
}

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


  raise(message: string, params: any) {
    throw new Error(message + "at line: " + params.at.line)
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
    while (this.input.charCodeAt(this.pos) !== charCodes.lineFeed && !this.isEndOfFile()) {
      this.pos++
    }
  }

  skipMultilineComment() {
    const start = this.pos;
    const end = this.input.indexOf("*/", start + 2);
    if (end === -1) {
      throw this.raise(Errors.UnterminatedComment, {
        at: this.loc
      });
    }

    const comment = this.input.slice(start + 2, end);
    this.loc.line += comment.split("\n").length - 1

    this.pos = end + 2;
  }

  readString() {
    const start = this.pos + 1
    const end = this.input.indexOf("\"", start)
    if (end === -1) {
      throw this.raise(Errors.UnterminatedString, {
        at: this.loc
      })
    }

    const str = this.input.slice(start, end)
    this.pos = end + 1

    const loc = {
      line: this.loc.line,
      start,
      end,
    }

    this.tokens.push(finishToken(loc, types.string, str))
  }


  readWord() {
    const start = this.pos
    const end = this.input.indexOf(" ", start)

    const str = this.input.slice(start, end)

    const loc = {
      line: this.loc.line,
      start,
      end,
    }

    this.pos = end
    this.tokens.push(finishToken(loc, types.identifier, str))
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
          // if (this.tokens[this.tokens.length - 1].type.label !== "\n") {
          this.tokens.push(finishToken(this.getLocation(), types.newLine))

          this.loc.line++
          this.pos++
          break
        // lower case 
        case charCodes.uppercaseA: // a
        case charCodes.uppercaseB: // b
        case charCodes.uppercaseC: // c
        case charCodes.uppercaseE: // e
        case charCodes.uppercaseF: // f
        case charCodes.uppercaseG: // g
        case charCodes.uppercaseH: // h
        case charCodes.uppercaseI: // i
        case charCodes.uppercaseJ: // j
        case charCodes.uppercaseK: // k
        case charCodes.uppercaseL: // l
        case charCodes.uppercaseM: // m
        case charCodes.uppercaseN: // n
        case charCodes.uppercaseO: // o
        case charCodes.uppercaseP: // p
        case charCodes.uppercaseQ: // q
        case charCodes.uppercaseR: // r
        case charCodes.uppercaseS: // s
        case charCodes.uppercaseT: // t
        case charCodes.uppercaseU: // u
        case charCodes.uppercaseV: // v
        case charCodes.uppercaseW: // w
        case charCodes.uppercaseX: // x
        case charCodes.uppercaseY: // y
        case charCodes.uppercaseZ: // z
        case charCodes.lowercaseA: // a // uppercase
        case charCodes.lowercaseB: // b
        case charCodes.lowercaseC: // c
        case charCodes.lowercaseE: // e
        case charCodes.lowercaseF: // f
        case charCodes.lowercaseG: // g
        case charCodes.lowercaseH: // h
        case charCodes.lowercaseI: // i
        case charCodes.lowercaseJ: // j
        case charCodes.lowercaseK: // k
        case charCodes.lowercaseL: // l
        case charCodes.lowercaseM: // m
        case charCodes.lowercaseN: // n
        case charCodes.lowercaseO: // o
        case charCodes.lowercaseP: // p
        case charCodes.lowercaseQ: // q
        case charCodes.lowercaseR: // r
        case charCodes.lowercaseS: // s
        case charCodes.lowercaseT: // t
        case charCodes.lowercaseU: // u
        case charCodes.lowercaseV: // v
        case charCodes.lowercaseW: // w
        case charCodes.lowercaseX: // x
        case charCodes.lowercaseY: // y
        case charCodes.lowercaseZ: // z
          this.readWord()
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
          if (this.peekNext() === charCodes.equalsTo && this.peekNext(2) !== charCodes.equalsTo) {
            this.tokens.push(finishToken(this.getLocation(), types.equal))
            this.pos += 2
            break
          }
          if (this.peekNext() === charCodes.equalsTo && this.peekNext(2) === charCodes.equalsTo) {
            this.tokens.push(finishToken(this.getLocation(), types.strichEqual))
            this.pos += 3
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
          throw this.raise(Errors.UnexpectedToken, {
            at: this.loc
          });
      }
    }

    return this.tokens
  }
}

