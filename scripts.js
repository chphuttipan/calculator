const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const add = document.getElementById('add');
const minus = document.getElementById('minus');
const multi = document.getElementById('multiply');
const divi = document.getElementById('divide');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const dot = document.getElementById('dot');
const display = document.getElementById('display');
const equal = document.getElementById('equal');

zero.addEventListener('click', function() {
    const numValue = zero.textContent;
    display.textContent += numValue;
})

one.addEventListener('click', function() {
    const numValue = one.textContent;
    display.textContent += numValue;
})

two.addEventListener('click', function() {
    const numValue = two.textContent;
    display.textContent += numValue;
})

three.addEventListener('click', function() {
    const numValue = three.textContent;
    display.textContent += numValue;
})

four.addEventListener('click', function() {
    const numValue = four.textContent;
    display.textContent += numValue;
})

five.addEventListener('click', function() {
    const numValue = five.textContent;
    display.textContent += numValue;
})

six.addEventListener('click', function() {
    const numValue = six.textContent;
    display.textContent += numValue;
})

seven.addEventListener('click', function() {
    const numValue = seven.textContent;
    display.textContent += numValue;
})

eight.addEventListener('click', function() {
    const numValue = eight.textContent;
    display.textContent += numValue;
})

nine.addEventListener('click', function() {
    const numValue = nine.textContent;
    display.textContent += numValue;
})



// 1. Create a function to check the last string is operator
function endsWithOperator(text) {
    // Define the list of operators
    const operators = ['+', '-', '*', '/'];
    lastText = text.slice(-1);
    // Check if the string is empty or not
    if (text.length === 0) {
        return;
    }
    return operators.some(operator => text.endsWith(operator));
}

// 2. Create a function to check the operator was include in the string equation
function includeOperator(text) {
    // Define the list of operators
    const operators = ['+', '-', '*', '/'];
    // Check if the string is empty or not
    if (text.length === 0) {
        return;
    }
    return operators.some(operator => text.includes(operator));
}

// 3. Addition function
function plus(num1, num2) {
    return num1 + num2; 
}

// 4. Subtraction function
function subtract(num1, num2) {
    return num1 - num2;
}

// 5. Multiplication function
function multiply(num1, num2) {
    return num1 * num2;
}

// 6. Division function
function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error("Cannot divide by zero.");
    }
    else {
        return num1 / num2;
    }
    
}

// 7. Create a operate function to calculate the equation
function operate(text) {
    const operators = new Set(['+', '-', '*', '/']);
    const eqList = [];
    // Find the index of the operator in the text
    if (text.length !== 0) {
        var selectOperator;
        var numString = '';
        for (let i = 0; i < text.length; i++) {
            if (operators.has(text[i])) {
                // Before manage the operator, convert the previous string as number
                const numValue = Number(numString);
                // Push the number to the list
                eqList.push(numValue);
                numString = '';
                // Clear the numValue to empty string;
                // It's an operator, keep it as a string
                selectOperator = text[i];
                eqList.push(selectOperator);
            }

            else if (i  === text.length-1) {
                numString += text[i];
                const numValue = Number(numString);
                eqList.push(numValue);
            }

            else {
                // Add a number string to numString
                numString += text[i];
            }
        }

        let result;
        switch (selectOperator) {
            case "+":
                result = plus(eqList[0], eqList[2]);
                break;
            case "-":
                result = subtract(eqList[0], eqList[2]);
                break;
            case "*":
                result = multiply(eqList[0], eqList[2]);
                break;
            case "/":
                result = divide(eqList[0], eqList[2]);
                break;
            default:
                result = "Invalid operation";
        }
        
        return Math.round(result * 100) / 100; // rounded two decimals
    }
}

// Create a function to add 'dot' and check it doesn't exist  
dot.addEventListener('click', function() {
    const textValue = display.textContent;
    // Check the textValue has the operator
    if (includeOperator(textValue)) {
        // Check the textValue end with the operator
        if (endsWithOperator(textValue)) {
            display.textContent += '.';
        }
        else {
            const operators = new Set(['+', '-', '*', '/']);
            var operand = '';
            for (let i = 0; i < textValue.length; i++) {
                if (operators.has(textValue[i])) {
                    operand = textValue[i];
                }
            }

            // Get the index of operand
            const operandInd = textValue.indexOf(operand);
            // Separate the equation to the first number and second number
            let firstNum = textValue.slice(0, operandInd);
            let secondNum = textValue.slice(operandInd + 1, textValue.length + 1);
            
            // Add the dot to the second number
            if (secondNum.includes('.')) {
                return 1;
            }
            else {
                secondNum += '.';
            }

            // Convert all to string
            firstNum = String(firstNum);
            secondNum = String(secondNum);
            
            display.textContent = firstNum + operand + secondNum;
        }
    }

    // If there is no operand in the equation 
    else {
        if (textValue.includes('.')) {
            return 1;
        }
        else {
            display.textContent += '.';
        }
    }
})

add.addEventListener('click', function() {
    const operand = '+';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);
    
    // Check the text include operator
    if (includeOperator(textValue)) {
        // Check position of the operator is the last
        if (endsWithOperator(lastText)) {
            newText = textValue.slice(0,-1) + operand;
            display.textContent = newText;
        }
        else {
            // if the operator not in the last position, it would finish the calculation.
            display.textContent = operate(textValue) + operand;
        }
    }

    else {
        display.textContent += operand;
    }
})

minus.addEventListener('click', function() {
    const operand = '-';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);

    // Check the text include operator
    if (includeOperator(textValue)) {
        // Check position of the operator is the last
        if (endsWithOperator(lastText)) {
            newText = textValue.slice(0,-1) + operand;
            display.textContent = newText;
        }
        else {
            // if the operator not in the last position, it would finish the calculation.
            display.textContent = operate(textValue) + operand;
        }
    }
    
    else {
        display.textContent += operand;
    }
})

multi.addEventListener('click', function() {
    const operand = '*';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);
    
    // Check the text include operator
    if (includeOperator(textValue)) {
        // Check position of the operator is the last
        if (endsWithOperator(lastText)) {
            newText = textValue.slice(0,-1) + operand;
            display.textContent = newText;
        }
        else {
            // if the operator not in the last position, it would finish the calculation.
            display.textContent = operate(textValue) + operand;
        }
    }

    else {
        display.textContent += operand;
    }
})

divi.addEventListener('click', function() {
    const operand = '/';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);
    
    // Check the text include operator
    if (includeOperator(textValue)) {
        // Check position of the operator is the last
        if (endsWithOperator(lastText)) {
            newText = textValue.slice(0,-1) + operand;
            display.textContent = newText;
        }
        else {
            // if the operator not in the last position, it would finish the calculation.
            display.textContent = operate(textValue) + operand;
        }
    }

    else {
        display.textContent += operand;
    }
})

// Set 'AC' function to clear the display
clear.addEventListener('click', function() {
    display.textContent = '';
})

// Set 'backspace' function to delete a number and operand
backspace.addEventListener('click', function() {
    const currentText = display.textContent
    const newText = currentText
        .slice(0, currentText.length - 1);
    display.textContent = newText;
})

// Set 'equal' function
equal.addEventListener('click', function() {
    const textValue = display.textContent;
    if (includeOperator(textValue)) {
        if (endsWithOperator(textValue)) {
            display.textContent = textValue;
        }
        else {
            display.textContent = operate(textValue);
        }
    }
    
    // If there is no operator
    else {
        display.textContent = textValue;
    }
})