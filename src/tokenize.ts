
import { ItemToken } from './token-type';
import {
  tokenGenerator,
  isNumber,
  isString,
} from './token-utils';

export const tokenizer = (code: string): void => {

  const tokens: ItemToken[] = [];
  let char = "";
  let pos = 0;


  while (char !== undefined) {

    char = code[pos];
    // console.log(pos, "position", char)
    // const isNumber = /[0-9]/.test(char);
    // if (isNumber) {
    //   let value = '';

    //   while (isNumber) {
    //     value += char;
    //     char = code[++pos];
    //   }

    //   tokens.push(tokenGenerator("NUMBER", value));
    //   continue
    // }

    // if (char === '"') {
    //   let value = ''

    //   while (char !== '"') {
    //     value += char;
    //     char = code[++pos];
    //   }

    //   tokens.push(tokenGenerator("STRING", value));
    //   continue
    // }

    if (isString(char) || isNumber(char)) {
      let value = '';

      while (char !== " ") {
        value += char;
        char = code[++pos];
      }
      tokens.push(tokenGenerator("NAME", value));
      continue
    }

    // if (isOperator(char)) {
    //   tokens.push(tokenOperator(char))
    //   pos++
    //   continue
    // }

    if ()

      if (char === " ") {
        pos++
        continue
      }
    console.log(pos, tokens)
    throw new Error(char + 'invalid token')
  }
  console.log(char, tokens)
};

