
import {
  IFullToken, //types
} from "./token-utils"


interface IAst {
  type: string,
  body: any[]
}

export class Parser {
  ast: IAst;
  posToken: number;
  currToken: IFullToken | undefined
  constructor() {
    this.posToken = 0
    this.currToken = undefined
    this.ast = {
      type: "Program",
      body: []
    }
  }

  parse = (tokens: IFullToken[]) => {
    this.currToken = tokens[this.posToken]

    while (this.posToken !== tokens.length) {
      this.currToken = tokens[this.posToken]
      this.ast.body.push(this.currToken)
      this.posToken++
    }
    return this.ast;
  }
}