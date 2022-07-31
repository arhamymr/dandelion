
import * as fs from "fs"
// import { globby } from "globby"
import { Tokenizer } from "./tokenize"
import { Parser } from "./parser";

const tokenize = (inputCode: string): void => {
  const tokens = new Tokenizer(inputCode).run()
  const { parse } = new Parser()
  console.log(tokens, "tokens")
  // console.log(parse(tokens))
}

const parser = (filepath: string): any => {
  const readfile = fs.readFileSync(filepath, "utf8").toString()
  tokenize(readfile)
}

// scan directory
const scanFile = async (): Promise<void> => {
  // const paths = await globby(["example/**/*.js", "!node_modules", "!dist"])

  // for (let i = 0; i < paths.length; i++) {
  //   console.log(paths[i])

  // }
  const paths = "example/test.js"
  const ast = parser(paths)

}

const Dandelion = (): void => {
  scanFile()
}


Dandelion()
export default Dandelion;
