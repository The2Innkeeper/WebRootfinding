import { Interval } from './types';

/**
 * Finds a root of the function within the specified interval using the bisection method.
 * @param func The function whose roots we are trying to refine.
 * @param interval The interval to search for a root.
 * @param tolerance The tolerance for convergence. The method aims to find a root such that the size of the final interval is less than or equal to this value. Default is 1e-5.
 * @param maxIterations The maximum number of iterations to perform. This prevents the method from running indefinitely. Default is 100.
 * @returns The approximate position of the root within the specified interval, determined to be within the specified tolerance, or NaN if the root cannot be found within the given number of iterations.
 * @throws {Error} Thrown if the initial interval does not contain a root.
 */
export function refineRootIntervalBisection(
  func: (x: number) => number,
  interval: Interval,
  tolerance = 1e-5,
  maxIterations = 100
): number {
  return refineRootIntervalBisectionBounds(func, interval[0], interval[1], tolerance, maxIterations);
}

/**
 * Finds a root of the function within the specified interval using the bisection method.
 * @param func The function whose roots we are trying to refine.
 * @param leftBound The left boundary of the interval to search for a root.
 * @param rightBound The right boundary of the interval to search for a root.
 * @param tolerance The tolerance for convergence. The method aims to find a root such that the size of the final interval is less than or equal to this value. Default is 1e-5.
 * @param maxIterations The maximum number of iterations to perform. This prevents the method from running indefinitely. Default is 100.
 * @returns The approximate position of the root within the specified interval, determined to be within the specified tolerance, or NaN if the root cannot be found within the given number of iterations.
 * @throws {Error} Thrown if the initial interval does not contain a root.
 */
export function refineRootIntervalBisectionBounds(
  func: (x: number) => number,
  leftBound: number,
  rightBound: number,
  tolerance = 1e-5,
  maxIterations = 100
): number {
  let fLeft = func(leftBound);
  let fRight = func(rightBound);

  if (fLeft === 0) {
    leftBound += tolerance;
    fLeft = func(leftBound);
  }
  if (fRight === 0) return rightBound;

  // Check if the initial interval is valid
  if (Math.sign(fLeft) === Math.sign(fRight)) {
    throw new Error("The initial interval does not contain a single root.");
  }

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const midpoint = (leftBound + rightBound) / 2;
    const fMid = func(midpoint);

    if (fMid === 0 || (rightBound - leftBound) / 2 < tolerance) {
      return midpoint; // A root is found or the interval is sufficiently small
    }

    // If the points lie in the same region, the root is still on the right side of the midpoint and it is safe to shrink the left side
    if (Math.sign(fMid) === Math.sign(fLeft)) {
      leftBound = midpoint; // The root lies in the right half
      fLeft = fMid; // Update the value at the left bound
    } else {
      rightBound = midpoint; // The root lies in the left half
      // fRight is implicitly updated as we do not use it after this
    }
  }

  // If the maximum number of iterations is reached without converging
  return NaN;
}