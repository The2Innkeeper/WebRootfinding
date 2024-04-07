import { Polynomial } from './types';

export function evaluatePolynomial(poly: Polynomial, x: number): number {
      let result = 0;
    for (let i = poly.length - 1; i >= 0; i--) {
      result = result * x + poly[i];
    }
    return result;
}

export function addPolynomials(poly1: Polynomial, poly2: Polynomial): Polynomial {
  const maxLength = Math.max(poly1.length, poly2.length);
  const result: Polynomial = new Array(maxLength).fill(0);

  for (let i = 0; i < maxLength; i++) {
    if (i < poly1.length) result[i] += poly1[i];
    if (i < poly2.length) result[i] += poly2[i];
  }

  return result;
}

export function polynomialToString(poly: Polynomial): string {
  const terms = poly.map((coeff, index) => {
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

