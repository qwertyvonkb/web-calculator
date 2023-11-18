function clearAll() {
    document.getElementById('display').value = '';
}

function clearEntry() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculatePercentage() {
    let display = document.getElementById('display');
    display.value = (parseFloat(display.value) / 100).toString();
}


function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculateResult() {
    let display = document.getElementById('display');
    display.value = eval(display.value).toString();
}

function calculateSquareRoot() {
    let display = document.getElementById('display');
    display.value = Math.sqrt(parseFloat(display.value)).toString();
}