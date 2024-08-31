document.addEventListener('DOMContentLoaded', function () {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts;
    let currentAttempt = 0;

    const userGuessInput = document.getElementById('userGuess');
    const submitGuessBtn = document.getElementById('submitGuess');
    const feedbackDiv = document.querySelector('.feedback');
    const attemptsLeftSpan = document.getElementById('attemptsLeft');
    const restartGameBtn = document.getElementById('restartGame');
    const attemptsInput = document.getElementById('attempts');
    const guessListDiv = document.getElementById('guessList');

    function resetGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        currentAttempt = 0;
        attempts = parseInt(attemptsInput.value);
        attemptsLeftSpan.textContent = attempts;
        feedbackDiv.textContent = '';
        userGuessInput.value = '';
        userGuessInput.style.borderColor = '#ccc'; // Reset border color
        submitGuessBtn.disabled = false;
        restartGameBtn.style.display = 'none';
        guessListDiv.innerHTML = ''; // Clear the guess list
    }

    function validateInput(guess) {
        if (isNaN(guess) || guess < 1 || guess > 100) {
            feedbackDiv.textContent = '🚫 Please enter a valid number between 1 and 100.';
            return false;
        }
        return true;
    }

    function getFeedback(diff, guess) {
        if (diff === 0) {
            return `🎉 Correct! You guessed ${guess}.`;
        } else if (diff <= 5) {
            return `🔥 Very close! You guessed ${guess}.`;
        } else if (diff <= 10) {
            return `😊 Close! You guessed ${guess}.`;
        } else if (diff <= 20) {
            return `😐 Getting there! You guessed ${guess}.`;
        } else {
            return `❄️ Far off! You guessed ${guess}.`;
        }
    }

    function getBoxColor(diff) {
        if (diff === 0) {
            return 'green';
        } else if (diff <= 5) {
            return 'red';
        } else if (diff <= 10) {
            return 'yellow';
        } else if (diff <= 20) {
            return 'lightyellow';
        } else {
            return 'lightblue';
        }
    }

    function displayGuess(guess, feedback, color) {
        const guessItem = document.createElement('p');
        guessItem.textContent = feedback;
        guessItem.style.backgroundColor = color;
        guessListDiv.insertBefore(guessItem, guessListDiv.firstChild); // Add the latest guess at the top
    }

    function checkGuess() {
        const userGuess = parseInt(userGuessInput.value);
        if (!validateInput(userGuess)) {
            return;
        }

        attempts--;
        currentAttempt++;
        attemptsLeftSpan.textContent = attempts;

        const diff = Math.abs(userGuess - randomNumber);
        const feedback = getFeedback(diff, userGuess);
        const color = getBoxColor(diff);

        userGuessInput.style.borderColor = color; // Change input box border color
        feedbackDiv.textContent = feedback; // Show feedback with emoji and number
        displayGuess(userGuess, feedback, color); // Display the guess and feedback in the list

        userGuessInput.value = ''; // Clear the input box after checking

        if (userGuess === randomNumber) {
            submitGuessBtn.disabled = true;
            restartGameBtn.style.display = 'inline-block';
            guessListDiv.insertBefore(restartGameBtn, guessListDiv.firstChild); // Move restart button above history
        } else if (attempts === 0) {
            feedbackDiv.textContent = `😞 Game over! The number was ${randomNumber}.`;
            submitGuessBtn.disabled = true;
            restartGameBtn.style.display = 'inline-block';
            guessListDiv.insertBefore(restartGameBtn, guessListDiv.firstChild); // Move restart button above history
        }
    }

    submitGuessBtn.addEventListener('click', checkGuess);
    restartGameBtn.addEventListener('click', resetGame);

    attemptsInput.addEventListener('change', resetGame);
    resetGame(); // Initialize the game
});
