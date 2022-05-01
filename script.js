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
const numbers = Array.from(document.querySelectorAll('.number'));
numbers.forEach(number => number.addEventListener('click', showNumber));
numbers.forEach(number => number.addEventListener('click', storeNumber));

function showNumber(e) {
    if (display.innerHTML.charAt(0) === '0' && display.innerHTML.length >= 1) {
        display.innerHTML = display.innerHTML.substring(1);
    }
    display.innerHTML += e.target.textContent;
}

function storeNumber(e) {}