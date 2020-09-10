import * as ESTree from 'estree';
import { BaseError, InfiniteLoopError } from "./errors";


export interface Validator {
  (token: ESTree.Node): BaseError;
}

export function whileLoopValidator(node: ESTree.Node): BaseError {
  if (node.type === "WhileStatement" && node?.test['value'] == true) {
    return new InfiniteLoopError(node);
  }
  return undefined;
}

export function foreverValidator(node: ESTree.Node): BaseError {
  if (node.type === "ForStatement" && node.test == undefined) {
    return new InfiniteLoopError(node);
  }
  return undefined;
}

export function doWhileValidator(node: ESTree.Node): BaseError {
  if (node.type === "DoWhileStatement" && node.test['value'] == true) {
    return new InfiniteLoopError(node);
  }
  return undefined;
}


export const validators: Array<Validator> = [
  whileLoopValidator,
  foreverValidator,
  doWhileValidator
];