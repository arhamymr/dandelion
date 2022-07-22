import { Command } from '@oclif/command'

import acorn from 'acorn'
import fs from 'node:fs'
import jsx from 'acorn-jsx'
import globby from 'globby'

class Dandelion extends Command {
  static description =
    'simple javascript compiler';

  parser(filepath: string): any {
    const readfile = fs.readFileSync(filepath).toString()
    return acorn.Parser.extend(
      jsx(),
    ).parse(readfile, {
      ecmaVersion: 2020,
      sourceType: 'module',
    })
  }

  static async scanFile(): Promise<void> {
    const paths = await globby(['example/**/*.js', '!node_modules', '!dist'])
    console.log(paths)
  }

  static init(): void {
    Dandelion.scanFile()
  }

  async run(): Promise<void> {
    Dandelion.init()
  }
}

export = Dandelion;
