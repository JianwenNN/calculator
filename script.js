function operate(a, b, str) {
    switch(str) {
        case '+':
            return Number(a) + Number(b);
            break;
        case '-':
            return Number(a) - Number(b);
            break;
        case '*':
            return Number(a) * Number(b);
            break;
        case '/':
            return Number(a) / Number(b);
    }
}

const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
}

let display = document.querySelector('#display');
let storedValues = []; //pre-calculate number storage, maximum three numbers
let storedOperators = [];//pre-calculate operator storage, maximu two operators
let tempArray = []; //store individual numbers whenever clicked
let tempNumber = '0';//the number currently being entered, lively updated
let result = 0;
let calcParas = [];//numbers and operators in calculation, only two numbers and one operator
let lastEntry = [];//store individual numbers and all operators

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));

numbers.forEach(number => number.addEventListener('click', storeToTemp));
numbers.forEach(number => number.addEventListener('click', showNumber));

operators.forEach(operator => operator.addEventListener('click', calcOp));


function showNumber() {
    display.innerHTML = tempNumber;
}

function storeToTemp(e) {
    tempArray.push(e.target.textContent);
    lastEntry.push(e.target.textContent);
    if (tempArray[0] === '0' && tempArray.length > 1) tempArray.shift();
    tempNumber = tempArray.join('');
}

function storeOperator(e) {
    lastEntry.push(e.target.innerHTML);
    if (isLastEntryOp(lastEntry)) {
        storedOperators.splice(-1, 1);
    }
    storedOperators.push(e.target.innerHTML);  
}

function storeToPerm() {
    if (tempNumber) {
        storedValues.push(tempNumber);
    }
    tempNumber = '';
    tempArray = [];
    display.innerHTML = storedValues[storedValues.length - 1];
}

function isLastEntryOp(arr) {
    return '+-*/'.includes(arr[arr.length -2]);
}


//if an operator is pressed, the following happens


function calcOp(e) {
//store the previously entered number to perm (storedValues)
    storeToPerm();
    storeOperator(e);

// check if this is the first operator, if yes, return to get another number; 
    if (storedValues.length <= 1) return;

//if no, check if it has higher precedence than the last;

    //When calculate from left to right
    else if (precedence[`${storedOperators[storedOperators.length - 1]}`] <= precedence[`${storedOperators[storedOperators.length - 2]}`]) {
        calcParas = storedValues.splice(0, 2);
        calcParas.push(storedOperators.shift());
        result = operate(...calcParas);
        storedValues.splice(0, 0, result);
        display.innerHTML = result;
        calcParas = [];
    }
    //When calculate from right to left
    else if (precedence[e.target.innerHTML] > precedence[`${storedOperators[storedOperators.length - 2]}`]) {
        if (storedValues.length < 3) return;
        else if (storedValues.length === 3) {
            calcParas.push(storedValues.splice(1, 2));
            calcParas.push(storedOperators.pop());
            result = operate(...calcParas);
            storedValues.push(result);
            display.innerHTML = result;
            calcParas = [];
        }
    }
}
