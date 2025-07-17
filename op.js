function evaluateExpression(expression) {
    expression = expression.replace(/\s+/g, '');
    let numbers = [];
    let operators = [];
    let num = '';

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if (!isNaN(char) || char === '.') {
            num += char;
        } else {
            numbers.push(parseFloat(num));
            operators.push(char);
            num = '';
        }
    }
    numbers.push(parseFloat(num));

    let applyOp = (a, b, op) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
        }
    };

    let precedence = { '*': 2, '/': 2, '+': 1, '-': 1 };

    for (let p = 2; p > 0; p--) {
        for (let i = 0; i < operators.length; ) {
            if (precedence[operators[i]] === p) {
                let result = applyOp(numbers[i], numbers[i + 1], operators[i]);
                numbers.splice(i, 2, result);
                operators.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    console.log(`Result of ${expression} = ${numbers[0]}`);
}
