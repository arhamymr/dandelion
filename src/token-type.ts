export type ItemToken = {
  type: string;
  value: string;
}

class TokenType {
  type: string
  value: string
  constructor(type: string, value: string) {
    this.type = type
    this.value = value
  }
}


const plus = new TokenType('PLUS', '+')