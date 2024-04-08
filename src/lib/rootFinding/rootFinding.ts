import { Polynomial } from '../polynomial/types';
import { hasStrictlyPositiveRoots, hasStrictlyNegativeRoots } from '../polynomial';
import { makeSquareFree } from '../polynomial/operations';
import { isolatePositiveRealRootsBisection, isolatePositiveRealRootsContinuedFractions } from './realRootIsolation';
import { refineRootIntervalBisection } from '../interval/bisection';
import { evaluatePolynomial } from '../polynomial/evaluation';
import { scaleInput } from '../polynomial/transformations';

/** Performance efficient version (less function calls)
 * Finds all real roots of a polynomial with the given precision.
 *
 * @param {Polynomial} polynomial - the polynomial to find roots for
 * @param {number} precision - the precision for finding roots, defaults to 1e-5
 * @return {number[]} an array of all real roots found sorted in increasing order.
 */
export function findAllRealRoots(polynomial: Polynomial, precision: number = 1e-5): number[] {
  const roots: number[] = [];

  if (polynomial.length === 0) {
    throw new Error("The polynomial cannot be empty.");
  }

  const squareFreePolynomial = makeSquareFree(polynomial);
  
  // Find negative roots
  if (hasStrictlyNegativeRoots(squareFreePolynomial)) {
    const negatedPolynomial = scaleInput(squareFreePolynomial, -1);
    const negativeRootIntervals = isolatePositiveRealRootsContinuedFractions(negatedPolynomial);
    const evaluateFunc = (x: number) => evaluatePolynomial(negatedPolynomial, x);
    // const evaluateFunc = (x: number) => evaluatePolynomial(squareFreePolynomial, -x);

    for (const interval of negativeRootIntervals) {
      const negatedRoot = refineRootIntervalBisection(evaluateFunc, interval, precision);
      const root = -negatedRoot;
      insertRootSorted(roots, root);
    }
  }

  // Check for root at zero: remove duplicate -0 and 0
  if (squareFreePolynomial[0] === -0) {
    roots.splice(roots.length - 1, 1);
  }

  // Find positive roots
  if (hasStrictlyPositiveRoots(squareFreePolynomial)) {
    const positiveRootIntervals = isolatePositiveRealRootsContinuedFractions(squareFreePolynomial);
    const evaluateFunc = (x: number) => evaluatePolynomial(squareFreePolynomial, x);

    for (const interval of positiveRootIntervals) {
      const root = refineRootIntervalBisection(evaluateFunc, interval, precision);
      insertRootSorted(roots, root);
    }
  }

  return roots;
}

function insertRootSorted(roots: number[], newRoot: number): void {
  let insertIndex = roots.length;
  for (let i = 0; i < roots.length; i++) {
    if (newRoot < roots[i]) {
      insertIndex = i;
      break;
    }
  }
  roots.splice(insertIndex, 0, newRoot);
}

// /** Clean version
//  * Finds all real roots of a polynomial with the given precision.
//  *
//  * @param {Polynomial} polynomial - the polynomial to find roots for
//  * @param {number} precision - the precision for finding roots, defaults to 1e-5
//  * @return {number[]} an array of all real roots found sorted in increasing order.
//  */
// export function findAllRealRoots(polynomial: Polynomial, precision: number = 1e-5): number[] {
//   const roots: number[] = [];

//   // Find negative roots by negating the input
//   const negativeRoots = findStrictlyNegativeRoots(polynomial, precision);
//   roots.push(...negativeRoots);

//   // Check root at zero
//   if (polynomial[0] === 0) {
//     roots.push(0);
//   }
  
//   // Find positive roots
//   const positiveRoots = findStrictlyPositiveRoots(polynomial, precision);
//   roots.push(...positiveRoots); // should already be sorted based on addIntervalSort logic

//   return roots;
// }

// function findStrictlyPositiveRoots(polynomial: Polynomial, precision: number): number[] {
//   if (!hasStrictlyPositiveRoots(polynomial)) {
//     return [];
//   }

//   const roots: number[] = [];
//   const squareFreePolynomial = makeSquareFree(polynomial);
//   const isolatedRootIntervals = isolatePositiveRealRootsContinuedFractions(squareFreePolynomial);
//   const evaluateFunc = (x: number) => evaluatePolynomial(squareFreePolynomial, x);

//   for (const interval of isolatedRootIntervals) {
//     const root = refineRootIntervalBisection(evaluateFunc, interval, precision);
//     roots.push(root);
//   }

//   return roots;
// }

// function findStrictlyNegativeRoots(polynomial: Polynomial, precision: number): number[] {
//   if (!hasStrictlyNegativeRoots(polynomial)) {
//     return [];
//   }

//   const negatedNegativeRoots: number[] = [];
//   const squareFreePolynomial = makeSquareFree(polynomial);
//   const negatedPolynomial = scaleInput(squareFreePolynomial, -1);
//   const isolatedRootIntervals = isolatePositiveRealRootsContinuedFractions(negatedPolynomial);
//   const evaluateFunc = (x: number) => evaluatePolynomial(negatedPolynomial, x);

//   for (const interval of isolatedRootIntervals) {
//     const root = refineRootIntervalBisection(evaluateFunc, interval, precision);
//     negatedNegativeRoots.push(root);
//   }

//   return negatedNegativeRoots.map(root => -root).sort();
// }