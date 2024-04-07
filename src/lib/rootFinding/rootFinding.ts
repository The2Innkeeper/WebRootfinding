import { Polynomial } from '../polynomial/types';
import { makeSquareFree } from '../polynomial/operations';
import { isolatePositiveRealRootsContinuedFractions } from './realRootIsolation';
import { refineRootIntervalBisection } from '../interval/bisection';
import { evaluatePolynomial } from '../polynomial/evaluation';
import { scaleInput } from '../polynomial/transformations';

export function findAllRealRoots(polynomial: Polynomial, precision = 1e-5): number[] {
  const roots: number[] = [];

  // Find positive roots
  const positiveRoots = findPositiveRoots(polynomial, precision);
  roots.push(...positiveRoots);

  // Find negative roots by negating the input
  const negatedPolynomial = scaleInput(polynomial, -1);
  const negativeRoots = findPositiveRoots(negatedPolynomial, precision);
  roots.push(...negativeRoots.map(root => -root));

  return roots;
}

function findPositiveRoots(polynomial: Polynomial, precision: number): number[] {
  const roots: number[] = [];
  const squareFreePolynomial = makeSquareFree(polynomial);
  const isolatedRootIntervals = isolatePositiveRealRootsContinuedFractions(squareFreePolynomial);

  for (const interval of isolatedRootIntervals) {
    const evaluateFunc = (x: number) => evaluatePolynomial(squareFreePolynomial, x);
    const root = refineRootIntervalBisection(evaluateFunc, interval, precision);
    roots.push(root);
  }

  return roots;
}