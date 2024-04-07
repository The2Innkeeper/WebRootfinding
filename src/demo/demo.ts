import { Polynomial, findRealRoots, findRealRoots as findRealRootsContinuedFractions } from '../lib';

const coefficientsInput = document.getElementById('coefficients') as HTMLInputElement;
const findRootsButton = document.getElementById('findRoots') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;

findRootsButton.addEventListener('click', runDemo);

function runDemo() {
  const coefficientsString = coefficientsInput.value.trim();
  const polynomial : Polynomial = coefficientsString.split(',').map(Number);

  const roots = findRealRoots(polynomial);

  resultDiv.textContent = `Real roots: ${roots.join(', ')}`;
}