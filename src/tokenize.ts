
import { ItemToken } from './token-type';
import {
  tokenGenerator,
  isNumber,
  isString,
  isKeyword,
} from './token-utils';

export const tokenizer = (code: string): void => {

  const tokens: ItemToken[] = [];
  let char = "";
  let pos = 0;


  while (char !== undefined) {
    char = code[pos];

    if (isString(char) || isNumber(char)) {
      let value = '';

      while (char !== " " && char !== "\n") {
        value += char;
        char = code[++pos];
      }

      if (isKeyword(value)) {
        tokens.push(tokenGenerator("KEYWORD", value))
      } else if (isNaN(parseInt(value))) {
        tokens.push(tokenGenerator("IDENTIFIER", value));
      } else {
        tokens.push(tokenGenerator("NUMBER", value));
      }

      continue
    }

    if (char === '=') {
      pos++
      tokens.push(tokenGenerator("ASSIGNMENT", char));
      continue
    }

    if (char === '\n') {
      pos++
      tokens.push(tokenGenerator("NEW_LINE", char));
      continue
    }

    if (char === '"') {
      let value = '';
      let completeQuote = '';
      // console.log(pos, char, completeQuote, "inside stirng")
      while (completeQuote !== '""') {
        if (char === '"') {
          completeQuote += char;
        }

        value += char;
        char = code[++pos];
      }

      tokens.push(tokenGenerator("STRING", value));
      continue
    }

    if (char === "'") {
      let value = '';
      let completeQuote = '';
      // console.log(pos, char, completeQuote, "inside stirng")
      while (completeQuote !== "''") {
        if (char === "'") {
          completeQuote += char;
        }

        value += char;
        char = code[++pos];
      }

      tokens.push(tokenGenerator("STRING", value));
      continue
    }



    if (char === " ") {
      pos++
      continue
    }
    console.log(pos, char, tokens)
    throw new Error(char + ' invalid token')
  }
  console.log(char, tokens)
};

