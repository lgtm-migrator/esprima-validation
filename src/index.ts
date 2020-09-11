import { parseScript } from "esprima";
import { BaseErrorMessage, ParsingErrorMessage } from "./errors";
import { all_validators } from "./validators";

/**
 * validate js source with validators
 * 
 * @param source source code text
 * @param validators validator arrays, default with all validators
 * @returns 
 * error messages
 * 
 * if there is no errors for input source code, just return an empty array
 */
export function validateJsSource(source: string, validators = all_validators): Array<BaseErrorMessage> {
  const rt = [];

  try {
    parseScript(source, { loc: true, tokens: true }, (node, meta) => {
      // traverse
      for (const validator of validators) {
        // run validator
        const err = validator(node);
        if (err != undefined) { rt.push(err); }
      }
    });
  } catch (error) {
    // parsing failed
    rt.push(new ParsingErrorMessage(error));
  }

  return rt;

}




