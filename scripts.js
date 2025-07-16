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
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const dot = document.getElementById('dot');
const display = document.getElementById('display');

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

function includeOperator(text) {
    // Define the list of operators
    const operators = ['+', '-', '*', '/'];
    // Check if the string is empty or not
    if (text.length === 0) {
        return;
    }
    return operators.some(operator => text.includes(operator));
}

function operate(text) {
    const operators = ['+', '-', '*', '/'];
    // Find the index of the operator in the text
    if (text.length !== 0) {
        for (let i = 0; i < operators.length; i++) {
            const indexOp = text.indexOf(operators[i]);
        }
        const firstNum = text.slice(0, indexOp);
        const secondNum = text.slice(indexOp + 1);
        const operand = text[indexOp];
        firstNum = parseInt(firstNum);
        secondNum = parseInt(secondNum);
        
    }
}

add.addEventListener('click', function() {
    const operand = '+';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);
    if (endsWithOperator(lastText)) {
        newText = textValue.slice(0,-1) + operand;
        display.textContent = newText;
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
        }
    }
    
    else {
        display.textContent += operand;
    }
})

multiply.addEventListener('click', function() {
    const operand = '*';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);
    if (endsWithOperator(lastText)) {
        newText = textValue.slice(0,-1) + operand;
        display.textContent = newText;
    }
    else {
        display.textContent += operand;
    }
})

divide.addEventListener('click', function() {
    const operand = '/';
    var textValue = display.textContent;
    var lastText = textValue.slice(-1);
    if (endsWithOperator(lastText)) {
        newText = textValue.slice(0,-1) + operand;
        display.textContent = newText;
    }
    else {
        display.textContent += operand;
    }
})