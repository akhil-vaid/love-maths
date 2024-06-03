// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
    // Get all button elements
    let buttons = document.getElementsByTagName("button");

    // Add click event listeners to all buttons
    for (let button of buttons) {
        button.addEventListener("click", function() {
            // If the button's data-type is "submit", check the answer
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                // Otherwise, run the game with the game type specified in the button's data-type attribute
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    // Add keydown event listener to the answer box to check the answer when Enter is pressed
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // Start the game with an addition question when the page loads
    runGame("addition");
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // Clear the answer box and focus on it
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Generate two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // Display the appropriate question based on the game type
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    // Get the user's answer from the input box
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    // Get the correct answer and game type from calculateCorrectAnswer
    let calculatedAnswer = calculateCorrectAnswer();
    // Check if the user's answer is correct
    let isCorrect = userAnswer === calculatedAnswer[0];

    // If the answer is correct, increment the score and alert the user
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        // If the answer is wrong, increment the wrong answer count and alert the user with the correct answer
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    // Run the game again with the same game type
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    // Get the operands and operator from the DOM
    let operand1 = parseInt(document.getElementById("operand1").textContent);
    let operand2 = parseInt(document.getElementById("operand2").textContent);
    let operator = document.getElementById("operator").textContent;

    // Calculate the correct answer based on the operator
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        // If the operator is not recognized, alert and throw an error
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    // Get the current score from the DOM, increment it, and update the DOM
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    // Get the current tally of incorrect answers from the DOM, increment it, and update the DOM
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Displays an addition question
 */
function displayAdditionQuestion(operand1, operand2) {
    // Set the operands and operator in the DOM for an addition question
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

/**
 * Displays a subtraction question
 */
function displaySubtractQuestion(operand1, operand2) {
    // Ensure the first operand is greater than the second for a non-negative result
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

/**
 * Displays a multiplication question
 */
function displayMultiplyQuestion(operand1, operand2) {
    // Set the operands and operator in the DOM for a multiplication question
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

/**
 * Displays a division question
 */
function displayDivisionQuestion(operand1, operand2) {
    // Ensure the division is always an integer division (no remainders)
    let dividend = operand1 * operand2; // This ensures the division will be exact
    document.getElementById("operand1").textContent = dividend;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}
