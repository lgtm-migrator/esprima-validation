import { validateJsSource } from "../src";
import { InfiniteLoopErrorMessage, NotSupportErrorMessage, ParsingErrorMessage } from "../src/errors";

describe('Positive Test Suite', () => {

  it('should return error when found while(true) {}', () => {
    const rt = validateJsSource('while(true){}');
    expect(rt[0]).toBeInstanceOf(InfiniteLoopErrorMessage);
  });

  it('should return error when found for(;;) {}', () => {

    const rt = validateJsSource('for(;;){}');
    expect(rt[0]).toBeInstanceOf(InfiniteLoopErrorMessage);

    const rt2 = validateJsSource('for(var a = 1;;) {}');
    expect(rt2[0]).toBeInstanceOf(InfiniteLoopErrorMessage);

  });

  it('should return error when found do {} while(true)', () => {
    const rt = validateJsSource('do{}while(true)');
    expect(rt[0]).toBeInstanceOf(InfiniteLoopErrorMessage);
  });

  it('should return error when parsing failed', () => {
    const rt = validateJsSource('do while(true)');
    expect(rt[0]).toBeInstanceOf(ParsingErrorMessage);
  });

  it('should return not error when user input correct', () => {
    const rt = validateJsSource('var a = 1');
    expect(rt).toHaveLength(0);
  });

  it('should return error when user use let/const', () => {
    const rt = validateJsSource('const a = 1');
    expect(rt[0]).toBeInstanceOf(NotSupportErrorMessage);

    const rt2 = validateJsSource('let a = 1');
    expect(rt2[0]).toBeInstanceOf(NotSupportErrorMessage);
  });

});