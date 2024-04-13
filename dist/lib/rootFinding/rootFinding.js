"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllRealRoots = void 0;
const operations_1 = require("../polynomial/operations");
const realRootIsolation_1 = require("./realRootIsolation");
const bisection_1 = require("../interval/bisection");
const evaluation_1 = require("../polynomial/evaluation");
const transformations_1 = require("../polynomial/transformations");
function findAllRealRoots(polynomial, precision = 1e-5) {
    const roots = [];
    // Find positive roots
    const positiveRoots = findPositiveRoots(polynomial, precision);
    roots.push(...positiveRoots);
    // Find negative roots by negating the input
    const negatedPolynomial = (0, transformations_1.scaleInput)(polynomial, -1);
    const negativeRoots = findPositiveRoots(negatedPolynomial, precision);
    roots.push(...negativeRoots.map(root => -root));
    return roots;
}
exports.findAllRealRoots = findAllRealRoots;
function findPositiveRoots(polynomial, precision) {
    const roots = [];
    const squareFreePolynomial = (0, operations_1.makeSquareFree)(polynomial);
    const isolatedRootIntervals = (0, realRootIsolation_1.isolatePositiveRealRootsContinuedFractions)(squareFreePolynomial);
    for (const interval of isolatedRootIntervals) {
        const evaluateFunc = (x) => (0, evaluation_1.evaluatePolynomial)(squareFreePolynomial, x);
        const root = (0, bisection_1.refineRootIntervalBisection)(evaluateFunc, interval, precision);
        roots.push(root);
    }
    return roots;
}
//# sourceMappingURL=rootFinding.js.map