import acorn from 'acorn'
import fs from 'node:fs'
import jsx from 'acorn-jsx'
import glob from 'glob'

function scanFile(pattern: string) {
  glob(pattern, (err: any, files: any) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(files, 'files')
  })
}

function parser(filepath: string) {
  const readfile = fs.readFileSync(filepath).toString()
  return acorn.Parser.extend(
    jsx(),
  ).parse(readfile, {
    ecmaVersion: 2020,
    sourceType: 'module',
  })
}

