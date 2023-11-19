// form.js

let isDragging = false;
let offsetX, offsetY;

// Function to create a new calculator
function createCalculator() {
    const newCalculator = document.createElement('div');
    newCalculator.className = 'calculator bg-white p-8 rounded-md shadow-md mb-4';
    newCalculator.id = 'calculator' + (document.querySelectorAll('.calculator').length + 1);

    newCalculator.style.position = 'absolute';
    newCalculator.style.left = '50px';
    newCalculator.style.top = '50px';

    newCalculator.innerHTML = `
        <input type="text" readonly class="w-full mb-4 p-2 border border-gray-300 rounded-md">
        <div class="grid grid-cols-4 gap-4">
            <button onclick="clearAll('${newCalculator.id}')" class="bg-gray-400 p-4 rounded-md text-white">C</button>
            <button onclick="clearEntry('${newCalculator.id}')" class="bg-gray-400 p-4 rounded-md text-white">CE</button>
            <button onclick="calculatePercentage('${newCalculator.id}')" class="bg-gray-400 p-4 rounded-md text-white">%</button>
            <button onclick="calculateSquareRoot('${newCalculator.id}')" class="bg-gray-400 p-4 rounded-md text-white">√</button>
            <button onclick="appendToDisplay('7', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">7</button>
            <button onclick="appendToDisplay('8', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">8</button>
            <button onclick="appendToDisplay('9', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">9</button>
            <button onclick="appendToDisplay('/', '${newCalculator.id}')" class="bg-yellow-500 p-4 rounded-md text-white">/</button>
            <button onclick="appendToDisplay('4', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">4</button>
            <button onclick="appendToDisplay('5', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">5</button>
            <button onclick="appendToDisplay('6', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">6</button>
            <button onclick="appendToDisplay('*', '${newCalculator.id}')" class="bg-yellow-500 p-4 rounded-md text-white">*</button>
            <button onclick="appendToDisplay('1', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">1</button>
            <button onclick="appendToDisplay('2', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">2</button>
            <button onclick="appendToDisplay('3', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">3</button>
            <button onclick="appendToDisplay('-', '${newCalculator.id}')" class="bg-yellow-500 p-4 rounded-md text-white">-</button>
            <button onclick="appendToDisplay('0', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">0</button>
            <button onclick="appendToDisplay('.', '${newCalculator.id}')" class="bg-blue-500 p-4 rounded-md text-white">.</button>
            <button onclick="calculateResult('${newCalculator.id}')" class="bg-green-500 p-4 rounded-md text-white">=</button>
            <button onclick="appendToDisplay('+', '${newCalculator.id}')" class="bg-yellow-500 p-4 rounded-md text-white">+</button>
        </div>
        <button onclick="closeCalculator('${newCalculator.id}')" class="close-button absolute top-0 right-0 p-1 rounded-tr-md rounded-bl-md bg-red-500 text-white text-sm">X</button>
    `;

    document.body.appendChild(newCalculator);
    newCalculator.addEventListener('mousedown', handleMouseDown);
}

// Function to handle mouse down event
function handleMouseDown(event) {
    isDragging = true;
    offsetX = event.clientX - parseFloat(event.target.style.left);
    offsetY = event.clientY - parseFloat(event.target.style.top);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// Function to handle mouse move event
function handleMouseMove(event) {
    if (isDragging) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;

        document.getElementById(event.target.id).style.left = newX + 'px';
        document.getElementById(event.target.id).style.top = newY + 'px';
    }
}

// Function to handle mouse up event
function handleMouseUp() {
    isDragging = false;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// Function to close the calculator
function closeCalculator(calculatorId) {
    const calculatorToRemove = document.getElementById(calculatorId);
    if (calculatorToRemove) {
        document.body.removeChild(calculatorToRemove);
    }
}

// Attach event listener to create a new calculator
document.getElementById('createCalculatorButton').addEventListener('click', createCalculator);
