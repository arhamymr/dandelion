export interface Identifier {
  type: 'Identifier'
}

export interface FunctionDeclaration {
  type: string;
  id: Identifier | null;
  params: any;
  body: any;
  generator: boolean;
  async: boolean;
}
