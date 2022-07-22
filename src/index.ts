import { Command } from '@oclif/command'

const acorn = require('acorn')
import fs from 'node:fs'
import jsx from 'acorn-jsx'
import globby from 'globby'

class Dandelion extends Command {
  static description =
    'simple javascript compiler';

  // convert filepath to AST 
  static parser(filepath: string): any {
    const readfile = fs.readFileSync(filepath).toString()

    const JSXparser = acorn.Parser.extend(jsx())
    const ast = JSXparser.parse(readfile, {
      ecmaVersion: 2020,
      sourceType: 'module',
    })
    return ast
  }

  // scan directory
  static async scanFile(): Promise<void> {
    const paths = await globby(['example/**/*.js', '!node_modules', '!dist'])

    for (const path of paths) {
      const ast = Dandelion.parser(path)
      console.log(ast, 'ast')
    }
  }

  static init(): void {
    Dandelion.scanFile()
  }

  async run(): Promise<void> {
    Dandelion.init()
  }
}

export = Dandelion;
