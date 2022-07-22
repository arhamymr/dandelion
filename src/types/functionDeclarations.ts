import { FunctionDeclaration, Identifier } from './types'

export function functionDeclarations(
  id: Identifier | null,
  params: any,
  body: any,
  generator: boolean,
  async: boolean,
): FunctionDeclaration {
  return ({
    type: 'FunctionDeclaration',
    id,
    async,
    params,
    body,
    generator,
  })
}

