function operate(a, str, b) {
    switch(str) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            return a / b;
    }
}

const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
}
let display = document.querySelector('#display');
let storedValues = [];
let storedOperators = [];
let tempArray = [];
let tempNumber = '0';
let result;
let a = storedValues[0];
let b = storedValues[1];
let c = storedValues[2];

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));

numbers.forEach(number => number.addEventListener('click', storeToTemp));
numbers.forEach(number => number.addEventListener('click', showNumber));

operators.forEach(operator => operator.addEventListener('click', storeOperator));
operators.forEach(operator => operator.addEventListener('click', storeToPerm));
operators.forEach(operator => operator.addEventListener('click', Calculate));

function showNumber() {
    display.innerHTML = tempNumber;
}

function storeToTemp(e) {
    tempArray.push(e.target.textContent);
    if (tempArray[0] === '0' && tempArray.length > 1) tempArray.shift();
    tempNumber = tempArray.join('');
    console.log(tempNumber);
}

function storeOperator(e) {
    storedOperators.push(e.target.innerHTML);
    console.log(storedOperators); 
}

function storeToPerm() {
    if (tempNumber) {
        storedValues.push(tempNumber);
    }
    tempNumber = '';
    tempArray = [];
    display.innerHTML = storedValues[storedValues.length - 1];
}

function isFirstOperator(arr) {
    return arr.length <= 1;
}


function Calculate(e) {
    if (isFirstOperator(storedValues)) return;
    else if (storedOperators[storedOperators.length - 1] == '*' || storedOperators[storedOperators.length - 1] == '/' ) {
        result = operate(+storedValues[0], storedOperators[storedOperators.length - 1], +storedValues[1]);
        display.innerHTML = result;
    }
}

