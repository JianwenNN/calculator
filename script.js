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
            if(b === '0') return 'Infinity'
            else return Number(a) / Number(b);
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
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');

numbers.forEach(number => number.addEventListener('click', storeToTemp));
numbers.forEach(number => number.addEventListener('click', showNumber));

operators.forEach(operator => operator.addEventListener('click', calcOp));
equal.addEventListener('click', calcEqual);
clear.addEventListener('click', clearAll);
backspace.addEventListener('click', deleteLast);


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

function isLastEntryNum(arr) {
    return '0123456789.'.includes(arr[arr.length -1]);
}
//if an operator is pressed, the following happens
function calculateFormer() {
    calcParas = storedValues.splice(0, 2);
    calcParas.push(storedOperators.shift());
    result = operate(...calcParas);   
}

function calculateLatter() {
    calcParas = storedValues.splice(1, 2);
    calcParas.push(storedOperators[1]);
    storedOperators.splice(1, 1)
    result = operate(...calcParas);    
}
function calcOp(e) {
//store the previously entered number to perm (storedValues)
    storeToPerm();
    storeOperator(e);

// check if this is the first operator, if yes, return to get another number; 
    if (storedValues.length < 2) return;

    else if (storedValues.length == 2) {
       if (precedence[storedOperators[1]] <= precedence[storedOperators[0]]) {
        calculateFormer();
        storedValues.splice(0, 0, result);
        display.innerHTML = result;
        calcParas = [];
       }
       else return;
    }
    //When calculate from left to right
    else if (storedValues.length == 3) {
        if (precedence[storedOperators[2]] == precedence[storedOperators[1]]) {
            calculateLatter();
            storedValues.push(result);
            display.innerHTML = result;
            calcParas = [];    
        }
        else if (precedence[storedOperators[2]] < precedence[storedOperators[1]]) {
            calculateLatter();
            storedValues.push(result);
            calculateFormer();
            storedValues.unshift(result);
            display.innerHTML = result;
            calcParas = [];
        }
    }
}

function calcEqual() {
    storeToPerm();
    if (!isLastEntryNum(lastEntry) || storedValues.length < 2) {
        display.innerHTML = 'Error';
        return;
    }
    else if (storedValues.length == 2) {
         calculateFormer();
         display.innerHTML = result;
         calcParas = [];  
     }
    else if (storedValues.length == 3) {
        calculateLatter();
        storedValues.push(result);
        calculateFormer();
        display.innerHTML = result;
        calcParas = [];
    }
    lastEntry = [];
}

function clearAll() {
    storedValues = []; 
    storedOperators = [];
    tempArray = []; 
    tempNumber = '0';
    result = 0;
    calcParas = [];
    lastEntry = [];
    display.innerHTML = '0';
}

function deleteLast() {
    tempArray.splice(-1, 1);
    lastEntry.splice(-1, 1);
    tempNumber = tempArray.join('');
    if (tempArray.length === 0) tempNumber = '0';
    display.innerHTML = tempNumber;
}