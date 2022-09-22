const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
    //Update the display if first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        //If current display is zero, we want to replace it, if now add numbers
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    }
}

function addDecimal() {
    //If operator pressed, don't add decimal
    if(awaitingNextValue) {
        return;
    }
    //If no decimal, add one
    if(!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second value depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

//Calculations function
function useOperator(operator) {
    let currentValue = Number(calculatorDisplay.textContent);
    //To prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };
    //Assign first value if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        //Update the display
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //Ready for the next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

//Add Event listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    } 
})

//Reset display
function resetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);