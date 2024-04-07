import { Polynomial } from './types';

/**
 * Creates a new polynomial from the given coefficients.
 * @param coefficients The coefficients of the polynomial in increasing order of degree.
 * @returns The created polynomial.
 * @throws {Error} Thrown when the coefficients list is null, empty, or contains NaN values.
 */
export function createPolynomial(coefficients: number[]): Polynomial {
  if (coefficients === null || coefficients.length === 0) {
    throw new Error("Coefficients list cannot be null or empty.");
  }

  for (let i = 0; i < coefficients.length; i++) {
    const coefficient = coefficients[i];
    if (isNaN(coefficient)) {
      throw new Error(
        `NaN detected in coefficient at index ${i}.\nPolynomial coefficients: ${coefficients.join(", ")}`
      );
    }
  }

  return coefficients;
}

/**
 * Updates the coefficient at a specified index within the polynomial.
 * @param polynomial The polynomial to update.
 * @param index The zero-based index where the coefficient is to be updated.
 * @param newValue The new value of the coefficient at the specified index.
 * @throws {Error} Thrown when the index is outside the bounds of the polynomial.
 */
export function updatePolynomialCoefficient(polynomial: Polynomial, index: number, newValue: number): void {
  if (index < 0 || index >= polynomial.length) {
    throw new Error("Index is out of range.");
  }

  polynomial[index] = newValue;
}

/**
 * Converts a polynomial to its string representation.
 * @param polynomial The polynomial to convert.
 * @returns The string representation of the polynomial.
 */
export function polynomialToString(polynomial: Polynomial): string {
  const terms = polynomial.map((coeff, index) => {
    if (coeff === 0) {
      return '';
    }
    const sign = coeff >= 0 ? '+' : '-';
    const absCoeff = Math.abs(coeff);
    const variable = index === 0 ? '' : `x^${index}`;
    return `${sign} ${absCoeff}${variable}`;
  }).filter(term => term !== '');
  
  return terms.join(' ').trim().replace(/^\+/, '').trim();
}