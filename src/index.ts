import { Command } from '@oclif/command'

import acorn from 'acorn'
import fs from 'node:fs'
import jsx from 'acorn-jsx'
import glob from 'glob'
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

  scanFile(pattern: string): any {
    glob(pattern, (err: any, files: any) => {
      if (err) {
        console.error(err)
        return
      }

      console.log(files, 'files')
    })
  }

  static init(): void {
    console.log('init')
  }

  async run(): Promise<void> {
    Dandelion.init()
  }
}

export = Dandelion;
