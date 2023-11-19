// calculator.js

function clearAll(calculatorId) {
    let display = getDisplay(calculatorId);
    if (display) {
        display.value = '';
    }
}

function clearEntry(calculatorId) {
    let display = getDisplay(calculatorId);
    if (display) {
        display.value = display.value.slice(0, -1);
    }
}

function calculatePercentage(calculatorId) {
    let display = getDisplay(calculatorId);
    if (display) {
        display.value = (parseFloat(display.value) / 100).toString();
    }
}

function appendToDisplay(value, calculatorId) {
    let display = getDisplay(calculatorId);
    if (display) {
        display.value += value;
    }
}

function calculateResult(calculatorId) {
    let display = getDisplay(calculatorId);
    if (display) {
        display.value = eval(display.value).toString();
    }
}

function calculateSquareRoot(calculatorId) {
    let display = getDisplay(calculatorId);
    if (display) {
        display.value = Math.sqrt(parseFloat(display.value)).toString();
    }
}

function getDisplay(calculatorId) {
    return document.getElementById(calculatorId).querySelector('input[type="text"]');
}
