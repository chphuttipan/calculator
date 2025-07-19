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

// Create a calculate count to help counting number of the operation is called
let calculateCount = 0;

// 1. Create a function to check the last string is operator
function endsWithOperator(text) {
    // Define the list of operators
    const operators = ['+', '-', '*', '/'];
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

// Diable the number button
function buttonDisabled() {
    one.disabled = true;
    two.disabled = true;
    three.disabled = true;
    four.disabled = true;
    five.disabled = true;
    six.disabled = true;
    seven.disabled = true;
    eight.disabled = true;
    nine.disabled = true;
    zero.disabled = true;
    dot.disabled = true;
    add.disabled = true;
    minus.disabled = true;
    multi.disabled = true;
    divi.disabled = true;
    backspace.disabled = true; 
}

// Enable the button
function buttonEnabled() {
    one.disabled = false;
    two.disabled = false;
    three.disabled = false;
    four.disabled = false;
    five.disabled = false;
    six.disabled = false;
    seven.disabled = false;
    eight.disabled = false;
    nine.disabled = false;
    zero.disabled = false;
    dot.disabled = false;
    add.disabled = false;
    minus.disabled = false;
    multi.disabled = false;
    divi.disabled = false;
    backspace.disabled = false; 
}

function addNum(num) {
    const numValue = num;
    let currentValue = display.textContent;
    
    if (currentValue === '0') {
        display.textContent = numValue;
    }

    // If the current equation has an operand, the number can type follow the last number or operand.
    else if (includeOperator(currentValue)) {
        if (currentValue[0] === '-') {
            if (currentValue.length > 1) {
                // If start with a negative number, check does it has another operand
                let numberValue = currentValue.slice(1, currentValue.length + 1);
                if (includeOperator(numberValue)) {
                    // If yes, add number follow the operand
                    display.textContent += numValue;
                }
                else {
                    // If no, replace the negative number
                    display.textContent = '';
                    display.textContent += numValue;
                    calculateCount = 0;
                }
            }
            else {
                display.textContent += numValue;
            }
        }
        else {
            display.textContent += numValue;
        }
    }

    /* If there is no operand, it should be checked 
    the current number is the result of previous calculation or not
    */
    else {
        if (calculateCount > 0) {
            console.log(calculateCount);
            calculateCount = 0;
            display.textContent = '';
            display.textContent += numValue;
        }
        else {
            display.textContent += numValue;
        }
    }
}

zero.addEventListener('click', function() {
    addNum('0');
})

one.addEventListener('click', function() {
    addNum('1');
})

two.addEventListener('click', function() {
    addNum('2');
})

three.addEventListener('click', function() {
    addNum('3');
})

four.addEventListener('click', function() {
    addNum('4');
})

five.addEventListener('click', function() {
    addNum('5');
})

six.addEventListener('click', function() {
    addNum('6');
})

seven.addEventListener('click', function() {
    addNum('7');      
})

eight.addEventListener('click', function() {
    addNum('8');
})

nine.addEventListener('click', function() {
    addNum('9');
})


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
        display.textContent = "Error, div by 0";
        buttonDisabled();
        throw new TypeError("Div by 0, ERROR");
        
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
        
        // Bring the minus out of the text
        if (text[0] === '-') {
            numString += text[0];
            text = text.slice(1, text.length + 1);
        }
        
        for (let i = 0; i < text.length; i++) {
            // If it found the operator make the previous string as a number
            if (operators.has(text[i])) {
                // Before manage the operator, convert the previous string as number
                let numValue = parseFloat(numString);
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
                let numValue = parseFloat(numString);
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
                calculateCount += 1;
                break;
            case "-":
                result = subtract(eqList[0], eqList[2]);
                calculateCount += 1;
                break;
            case "*":
                result = multiply(eqList[0], eqList[2]);
                calculateCount += 1;
                break;
            case "/":
                result = divide(eqList[0], eqList[2]);
                calculateCount += 1;
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
    
    // Cannot type a operand in the single text operand (assume '-')
    if (textValue.length === 1 && includeOperator(textValue)) {
        return;
    }

    else if (textValue === '') {
        display.textContent;
    }

    else if (textValue.length > 1) {
        // If the equation start with negative number
        if (textValue[0] === '-') {
            // Skip the minus to check the remaining text include operator or not
            if (includeOperator(textValue.slice(1, textValue.length + 1))) {
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                    calculateCount = 0;
                }
                
                else {
                    display.textContent = operate(textValue) + operand;
                    calculateCount = 0;
                }    
            }
            // If no operand add it!
            else {
                display.textContent += operand;
            }
        }

        // If the equation starts with positive number
        else {
            // Check the operand in the equation
            if (includeOperator(textValue)) {
                // Check position of the operator is the last
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                    calculateCount = 0;
                }
                else {
                    // if the operator not in the last position, it would finish the calculation.
                    display.textContent = operate(textValue) + operand;
                    calculateCount = 0;
                }
            }
            // If there is no operand, add it!
            else {
                display.textContent += operand;
            }
        }
    }

    // Single character that is the numeric
    else {
        display.textContent += operand;
    }
})

minus.addEventListener('click', function() {
    const operand = '-';
    var textValue = display.textContent;

    // Cannot type a operand in the single text operand (assume '-')
    if (textValue.length === 1 && includeOperator(textValue)) {
        return;
    }

    else if (textValue === '') {
        display.textContent += operand;
    }

    else if (textValue.length > 1) {
        // If the equation start with negative number
        if (textValue[0] === '-') {
            // Skip the minus to check the remaining text include operator or not
            if (includeOperator(textValue.slice(1, textValue.length + 1))) {
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                }
                
                else {
                    display.textContent = operate(textValue) + operand;
                }    
            }
            // If no operand add it!
            else {
                display.textContent += operand;
            }
        }

        // If the equation starts with positive number
        else {
            // Check the operand in the equation
            if (includeOperator(textValue)) {
                // Check position of the operator is the last
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                }
                else {
                    // if the operator not in the last position, it would finish the calculation.
                    display.textContent = operate(textValue) + operand;
                }
            }
            // If there is no operand, add it!
            else {
                display.textContent += operand;
            }
        }
    }

    // Single character that is the numeric
    else {
        display.textContent += operand;
    }
})

multi.addEventListener('click', function() {
    const operand = '*';
    var textValue = display.textContent;
    
    // Cannot type a operand in the single text operand (assume '-')
    if (textValue.length === 1 && includeOperator(textValue)) {
        return;
    }

    else if (textValue === '') {
        display.textContent;
    }

    else if (textValue.length > 1) {
        // If the equation start with negative number
        if (textValue[0] === '-') {
            // Skip the minus to check the remaining text include operator or not
            if (includeOperator(textValue.slice(1, textValue.length + 1))) {
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                }
                
                else {
                    display.textContent = operate(textValue) + operand;
                }    
            }
            // If no operand add it!
            else {
                display.textContent += operand;
            }
        }

        // If the equation starts with positive number
        else {
            // Check the operand in the equation
            if (includeOperator(textValue)) {
                // Check position of the operator is the last
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                }
                else {
                    // if the operator not in the last position, it would finish the calculation.
                    display.textContent = operate(textValue) + operand;
                }
            }
            // If there is no operand, add it!
            else {
                display.textContent += operand;
            }
        }
    }

    // Single character that is the numeric
    else {
        display.textContent += operand;
    }
})

divi.addEventListener('click', function() {
    const operand = '/';
    var textValue = display.textContent;
    
    // Cannot type a operand in the single text operand (assume '-')
    if (textValue.length === 1 && includeOperator(textValue)) {
        return;
    }

    else if (textValue === '') {
        display.textContent;
    }

    else if (textValue.length > 1) {
        // If the equation start with negative number
        if (textValue[0] === '-') {
            // Skip the minus to check the remaining text include operator or not
            if (includeOperator(textValue.slice(1, textValue.length + 1))) {
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                }
                
                else {
                    display.textContent = operate(textValue) + operand;
                }    
            }
            // If no operand add it!
            else {
                display.textContent += operand;
            }
        }

        // If the equation starts with positive number
        else {
            // Check the operand in the equation
            if (includeOperator(textValue)) {
                // Check position of the operator is the last
                if (endsWithOperator(textValue)) {
                    newText = textValue.slice(0,-1) + operand;
                    display.textContent = newText;
                }
                else {
                    // if the operator not in the last position, it would finish the calculation.
                    display.textContent = operate(textValue) + operand;
                }
            }
            // If there is no operand, add it!
            else {
                display.textContent += operand;
            }
        }
    }

    // Single character that is the numeric
    else {
        display.textContent += operand;
    }
})

// Set 'AC' function to clear the display
clear.addEventListener('click', function() {
    calculateCount = 0;
    display.textContent = '';
    buttonEnabled();
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
            calculateCount += 1;
        }
    }
    
    // If there is no operator
    else {
        display.textContent = textValue;
    }
})