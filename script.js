function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, str, b) {
    switch(str) {
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case '*':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
    }
}
let display = document.querySelector('#display');
let storedValues = [];
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
numbers.forEach(number => number.addEventListener('click', showNumber));
operators.forEach(operator => operator.addEventListener('click', storeNumber));

function showNumber(e) {
    if (display.innerHTML.charAt(0) === '0') {
        display.innerHTML = display.innerHTML.substring(1);
    }
    display.innerHTML += e.target.textContent;
}

function storeNumber() {
    storedValues.push(+display.innerHTML);
    console.log(storedValues);
}