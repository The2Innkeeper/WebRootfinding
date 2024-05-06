/**
 * Open-closed interval ]a,b] due to Budan's theorem's statements
 */
export function createInterval(leftBound, rightBound) {
    if (isNaN(leftBound) || isNaN(rightBound)) {
        throw new Error("Bounds cannot be NaN.");
    }
    if (leftBound > rightBound) {
        return [rightBound, leftBound];
    }
    else {
        return [leftBound, rightBound];
    }
}
export function getLeftBound(interval) {
    return interval[0];
}
export function getRightBound(interval) {
    return interval[1];
}
export function getLength(interval) {
    return Math.abs(interval[1] - interval[0]);
}
export function containsValue(interval, value) {
    if (isNaN(value)) {
        throw new Error("Value cannot be NaN.");
    }
    return value >= interval[0] && value <= interval[1];
}
/**
 * Checks if the interval contains an odd number of roots of the given continuous function.
 * @param func The function to check for roots.
 * @returns True if the interval contains an odd number of roots, otherwise false.
 */
export function containsSingleRoot(interval, func) {
    // Checking sign change as a necessary condition for a root in the interval
    const valueAtLeft = func(interval[0]);
    const valueAtRight = func(interval[1]);
    // If the signs are different, there is at least one root in the interval, odd number of roots
    return Math.sign(valueAtLeft) !== Math.sign(valueAtRight);
}
//# sourceMappingURL=operations.js.map