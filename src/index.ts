
import * as fs from 'fs'
import { globby } from 'globby'
import { Tokenizer } from './tokenize'

class Dandelion {
  tokenize(inputCode: string): void {
    const token = new Tokenizer(inputCode)
    token.run()
  }

  parser(filepath: string): any {
    const readfile = fs.readFileSync(filepath).toString()
    this.tokenize(readfile)
  }

  // scan directory
  async scanFile(): Promise<void> {
    const paths = await globby(['example/**/*.js', '!node_modules', '!dist'])

    for (const path of paths) {
      const ast = this.parser(path)
      console.log(ast, 'ast')
    }
  }

  run(): void {
    this.scanFile()
  }
}

export default Dandelion;
