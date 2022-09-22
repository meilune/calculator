const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

function sendNumberValue(number) {
    //If current display is zero, we want to replace it, if now add numbers
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
}

function addDecimal() {
    //If no decimal, add one
    // const displayValue = calculatorDisplay.textContent;
    // calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    if(!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//add Event listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    } 
})


//Reset display
function resetAll() {
    calculatorDisplay.textContent = "0";
}

clearBtn.addEventListener("click", resetAll);