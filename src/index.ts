import { parseScript } from "esprima";
import { BaseError, ParsingError } from "./errors";
import { validators } from "./validators";

export function validateJsSource(source: string): Array<BaseError> {
  const rt = [];

  try {
    parseScript(source, { loc: true, tokens: true }, (node, meta) => {
      // traverse
      for (const validator of validators) {
        const err = validator(node);
        if (err != undefined) {
          rt.push(err);
        }
      }
    });
  } catch (error) {
    // parsing failed
    rt.push(new ParsingError(error));
  }


  return rt;

}




