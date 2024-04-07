import { Polynomial, findRealRoots } from '../lib';

const coefficientsInput = document.getElementById('coefficients') as HTMLInputElement;
const findRootsButton = document.getElementById('findRoots') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;

findRootsButton.addEventListener('click', runDemo);

function runDemo() {
  console.log('Button clicked');
  const coefficientsString = coefficientsInput.value.trim();
  console.log('Coefficients:', coefficientsString);
  const polynomial: Polynomial = coefficientsString.split(',').map(Number);
  console.log('Polynomial:', polynomial);

  const roots = findRealRoots(polynomial);
  console.log('Roots:', roots);

  resultDiv.textContent = `Real roots: ${roots.join(', ')}`;
  console.log('Result displayed');
}