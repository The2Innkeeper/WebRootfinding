import { Polynomial } from '../src/lib/types';
import { evaluatePolynomial, addPolynomials, polynomialToString } from '../src/lib/polynomial';

describe('Polynomial', () => {
  it('should evaluate a polynomial correctly', () => {
    const poly: Polynomial = [1, 2, 3]; // 1 + 2x + 3x^2
    expect(evaluatePolynomial(poly, 0)).toBe(1);
    expect(evaluatePolynomial(poly, 1)).toBe(6);
    expect(evaluatePolynomial(poly, 2)).toBe(17);
    expect(evaluatePolynomial(poly, -1)).toBe(2);
  });

  it('should add two polynomials correctly', () => {
    const poly1: Polynomial = [1, 2, 3]; // 1 + 2x + 3x^2
    const poly2: Polynomial = [4, 5]; // 4 + 5x
    const expected: Polynomial = [5, 7, 3]; // 5 + 7x + 3x^2
    expect(addPolynomials(poly1, poly2)).toEqual(expected);
  });

  it('should handle adding polynomials of different lengths', () => {
    const poly1: Polynomial = [1, 2, 3]; // 1 + 2x + 3x^2
    const poly2: Polynomial = [4]; // 4
    const expected: Polynomial = [5, 2, 3]; // 5 + 2x + 3x^2
    expect(addPolynomials(poly1, poly2)).toEqual(expected);
  });

  it('should convert a polynomial to a string correctly', () => {
    const poly1: Polynomial = [1, 2, 3]; // 1 + 2x + 3x^2
    expect(polynomialToString(poly1)).toBe('1 + 2x^1 + 3x^2');

    const poly2: Polynomial = [-1, 0, 4]; // -1 + 0x + 4x^2
    expect(polynomialToString(poly2)).toBe('- 1 + 4x^2');

    const poly3: Polynomial = [0, -3, 0, 2]; // 0 - 3x + 0x^2 + 2x^3
    expect(polynomialToString(poly3)).toBe('- 3x^1 + 2x^3');

    const poly4: Polynomial = [-1.0, -2.5, -3.25, -4]; // - 1 - 2.5x^1 - 3.25x^2 - 4x^3
    expect(polynomialToString(poly4)).toBe('- 1 - 2.5x^1 - 3.25x^2 - 4x^3');
  });
});