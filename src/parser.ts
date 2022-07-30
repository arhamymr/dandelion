
import {
  FullToken, //types
} from "./token-utils"


interface IAst {
  type: string,
  body: any[]
}

export class Parser {
  ast: IAst;

  constructor() {
    this.ast = {
      type: "Program",
      body: []
    }
  }

  parse = (tokens: FullToken[]) => {
    // tokens.forEach(token => {
    //   if (tokens.type)
    // })

    console.log(this, tokens, "inside parse")
    return this.ast;
  }
}