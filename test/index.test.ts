import { validateJsSource } from "../src";
import { InfiniteLoopError, ParsingError } from "../src/errors";

describe('Positive Test Suite', () => {

  it('should return error when found while(true) {}', () => {
    const rt = validateJsSource('while(true){}');
    expect(rt[0]).toBeInstanceOf(InfiniteLoopError);
  });

  it('should return error when found for(;;) {}', () => {

    const rt = validateJsSource('for(;;){}');
    expect(rt[0]).toBeInstanceOf(InfiniteLoopError);

    const rt2 = validateJsSource('for(var a = 1;;) {}');
    expect(rt2[0]).toBeInstanceOf(InfiniteLoopError);

  });

  it('should return error when found do {} while(true)', () => {
    const rt = validateJsSource('do{}while(true)');
    expect(rt[0]).toBeInstanceOf(InfiniteLoopError);
  });

  it('should return error when parsing failed', () => {
    const rt = validateJsSource('do while(true)');
    expect(rt[0]).toBeInstanceOf(ParsingError);
  });

  it('should return not error when user input correct', () => {
    const rt = validateJsSource('var a = 1');
    expect(rt).toHaveLength(0);
  });

});