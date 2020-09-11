import { Node } from 'estree';
import { BaseErrorMessage, InfiniteLoopErrorMessage, NotSupportErrorMessage } from "./errors";

export interface Validator {
  (token: Node): BaseErrorMessage;
}

export function whileLoopValidator(node: Node): BaseErrorMessage {
  if (node.type === "WhileStatement" && node?.test['value'] === true) {
    return new InfiniteLoopErrorMessage(node);
  }
  return undefined;
}

export function foreverValidator(node: Node): BaseErrorMessage {
  if (node.type === "ForStatement" && node.test === null) {
    return new InfiniteLoopErrorMessage(node);
  }
  return undefined;
}

export function doWhileValidator(node: Node): BaseErrorMessage {
  if (node.type === "DoWhileStatement" && node.test['value'] === true) {
    return new InfiniteLoopErrorMessage(node);
  }
  return undefined;
}

export function es6FeaturesValidator(node: Node): BaseErrorMessage {
  if (node.type === "VariableDeclaration" && (node.kind === 'let' || node.kind === 'const')) {
    return new NotSupportErrorMessage(node, node.kind as string);
  }
  return undefined;
}


export const all_validators: Array<Validator> = [
  whileLoopValidator,
  foreverValidator,
  doWhileValidator,
  es6FeaturesValidator
];