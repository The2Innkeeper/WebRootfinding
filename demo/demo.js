"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const coefficientsInput = document.getElementById('coefficients');
const findRootsButton = document.getElementById('findRoots');
const resultDiv = document.getElementById('result');
findRootsButton.addEventListener('click', runDemo);
function runDemo() {
    console.log('Button clicked');
    const coefficientsString = coefficientsInput.value.trim();
    console.log('Coefficients:', coefficientsString);
    const polynomial = coefficientsString.split(',').map(Number);
    console.log('Polynomial:', polynomial);
    const roots = (0, lib_1.findRealRoots)(polynomial);
    console.log('Roots:', roots);
    resultDiv.textContent = `Real roots: ${roots.join(', ')}`;
    console.log('Result displayed');
}
//# sourceMappingURL=demo.js.map