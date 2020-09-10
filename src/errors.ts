import * as ESTree from 'estree';

export class BaseError {
  public message: string
  public type: string
  constructor(msg: string = '') {
    this.type = this?.constructor?.name || 'BaseError';
    this.message = msg;
  }
}

export class NotSupportError extends BaseError {

  public node: ESTree.Node;

  constructor(node: ESTree.Node, type: string = node.type) {
    super(`not support syntax '${type}', start at line: ${node.loc.start.line} col: ${node.loc.start.column}, end at line: ${node.loc.end.line} col: ${node.loc.end.column}.`);
    this.node = node;
  }

}


export class InfiniteLoopError extends BaseError {

  public node: ESTree.Node;

  constructor(node: ESTree.Node) {
    super(`infinite loop found, start at line: ${node.loc.start.line} col: ${node.loc.start.column}, end at line: ${node.loc.end.line} col: ${node.loc.end.column}.`);
    this.node = node;
  }

}

export class ParsingError extends BaseError {

  constructor(error: any) {
    super(error.message);
  }
}