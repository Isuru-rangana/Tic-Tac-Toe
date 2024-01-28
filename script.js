document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = [];

    // Initialize the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push('');
    }

    function handleCellClick() {
        const index = this.dataset.index;
        if (cells[index] === '') {
            cells[index] = 'X'; // Player's move
            this.textContent = 'X';
            if (checkWinner('X')) {
                alert('Congratulations! You win!');
                resetGame();
                return;
            }
            if (!checkDraw()) {
                computerMove();
                if (checkWinner('O')) {
                    alert('Computer wins!');
                    resetGame();
                }
            } else {
                alert('It\'s a draw!');
                resetGame();
            }
        }
    }

    function computerMove() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 9);
        } while (cells[randomIndex] !== '');
        cells[randomIndex] = 'O';
        const cell = document.querySelector(`[data-index='${randomIndex}']`);
        cell.textContent = 'O';
    }

    function checkWinner(player) {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winningCombos.some(combo =>
            combo.every(index => cells[index] === player)
        );
    }

    function checkDraw() {
        return cells.every(cell => cell !== '');
    }

    function resetGame() {
        cells.fill('');
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }

    document.getElementById('reset-btn').addEventListener('click', resetGame);
});
