const gameBoard = (function () {
    const playerOne = 1;
    const playerTwo = 2;
    const playerOneToken = "O";
    const playerTwoToken = "X";
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let currentPlayer = playerOne;
    let currentPlayerToken = playerOneToken;
    let turn = 1;
    let locations = [];
    let description = document.querySelector("p");
    let scoreOne = document.querySelector(".playerOne")
    let scoreTwo = document.querySelector(".playerTwo")
    let winner = false;
    let playAgain = false;

    function changePlayer() {
        if (turn >= 5) {
            if (checkWinner()) {
                displayWinner();
                return;
            }
        }
        turn++;
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        currentPlayerToken = currentPlayerToken === playerOneToken ? playerTwoToken : playerOneToken;
        displayCurrentPlayer();
    }
    function checkWinner() {
        winner = true;
        for (let i = 0; i < 3; ++i) {
            if ( // horizontal checks
                locations[i * 3].textContent === locations[i * 3 + 1].textContent &&
                locations[i * 3].textContent === locations[i * 3 + 2].textContent &&
                locations[i * 3].textContent != ""
            ) return true;
            if ( // vertical checks
                locations[i].textContent === locations[i + 3].textContent &&
                locations[i].textContent === locations[i + 6].textContent &&
                locations[i].textContent != ""               
            ) return true;
        }
        if ( // left to right diagonal check
            locations[0].textContent === locations[4].textContent &&
            locations[0].textContent === locations[8].textContent &&
            locations[0].textContent != ""
        ) return true;
        if ( // right to left diagonal check
            locations[2].textContent === locations[4].textContent &&
            locations[2].textContent === locations[6].textContent &&
            locations[2].textContent != ""
        ) return true;
        if (turn === 9) {
            winner = false;
            return true;
        }
        winner = false;
    }
    function displayWinner() {
        if (turn === 9 && !winner) description.textContent = "It's a tie!";
        else {
            if (currentPlayer === 1) {
                description.textContent = "Player One Wins!"
                playerOneScore++;
            }
            else {
                description.textContent = "Player Two Wins!"
                playerTwoScore++;
            }
            displayScore();
        }
    }
    function displayCurrentPlayer() {
        description.textContent = (currentPlayer === 1) ? "Current Player: Player One (O)" : "Current Player: Player Two (X)";
    }
    function resetBoard() {
        locations.forEach(button => {
            button.textContent = "";
        });
        currentPlayer = playerOne;
        currentPlayerToken = playerOneToken
        turn = 1;
        winner = false
        if (!playAgain) {
            playerOneScore = 0;
            playerTwoScore = 0
        }
        else {
            currentPlayer = playerTwo;
            currentPlayerToken = playerTwoToken;
        }
        playAgain = false; 
        displayCurrentPlayer();
        displayScore();
    }
    function displayScore() {
        scoreOne.textContent = "Player One Score: " + playerOneScore;
        scoreTwo.textContent = "Player Two Score: " + playerTwoScore;
    }
    function displayMove(e) {
        if (e.target.textContent === "" && !winner) {
            e.target.textContent = currentPlayerToken;
            changePlayer()
        }
    }
    function setUpBoard() {
        locations = document.querySelectorAll(".tile");
        locations.forEach(button => {
            button.addEventListener("click", displayMove)
        });
        displayCurrentPlayer();
        document.querySelector(".clear").addEventListener("click", resetBoard);
        document.querySelector(".again").addEventListener("click", () => {
            playAgain = true;
            resetBoard();
        });
        displayScore()
    }

    return { setUpBoard };
})();

gameBoard.setUpBoard();