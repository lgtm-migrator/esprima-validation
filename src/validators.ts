import { Node } from 'estree';
import { BaseError, InfiniteLoopError, NotSupportError } from "./errors";

export interface Validator {
  (token: Node): BaseError;
}

export function whileLoopValidator(node: Node): BaseError {
  if (node.type === "WhileStatement" && node?.test['value'] == true) {
    return new InfiniteLoopError(node);
  }
  return undefined;
}

export function foreverValidator(node: Node): BaseError {
  if (node.type === "ForStatement" && node.test == undefined) {
    return new InfiniteLoopError(node);
  }
  return undefined;
}

export function doWhileValidator(node: Node): BaseError {
  if (node.type === "DoWhileStatement" && node.test['value'] == true) {
    return new InfiniteLoopError(node);
  }
  return undefined;
}

export function es6FeaturesValidator(node: Node): BaseError {
  if (node.type == "VariableDeclaration" && (node.kind == 'let' || node.kind == 'const')) {
    return new NotSupportError(node, node.kind as string);
  }
  return undefined;
}


export const all_validators: Array<Validator> = [
  whileLoopValidator,
  foreverValidator,
  doWhileValidator,
  es6FeaturesValidator
];