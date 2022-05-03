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
let display = document.querySelector('#display');
let storedValues = [];
let storedOperators = [];
let tempArray = [];
let tempNumber = '0';
let result;

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

//display the new number being entered
//When a number is clicked, the following happens
// - display it on the screen
// - store it


//When an operator is clicked the following happens
// - if it is the first operator that's entered, then continue to the next number, if it is multiply or divide, give the result right after the second number is entered
function isOnlyNumber(str) {
    return Array.from(str).every(char => '0123456789.'.includes(char));
}

// - if it is the second or more operator that's entered, determine if it has higher precedence than the previous one:
//    - if same precedence, then calculate the previous operation and display it on the screen


function compareOperator(str) {
    return str == ''
}
//    - if it has higher precedence than previous, then wait for the next number and store it