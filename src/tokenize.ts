
import { ItemToken } from './token-type'
export class Tokenizer {
  code: string;
  token: Array<ItemToken>;

  constructor(code: string) {
    this.code = code
    this.token = []
  }

  selectToken(char: string): ItemToken {
    switch (char) {
      case '/+':
        return {
          type: '',
          value: '',
        }
      default:
        throw new Error(char + ': token undefined')
    }
  }

  run(): void {
    for (const char of this.code) {
      this.selectToken(char)
    }
  }
}

