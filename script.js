document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const renderBoard = () => {
      board.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i;
        square.addEventListener('click', handleSquareClick);
        square.textContent = gameBoard[i];
        board.appendChild(square);
      }
    };
  
    const handleSquareClick = (event) => {
      if (!gameActive) return;
  
      const index = event.target.dataset.index;
  
      if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        renderBoard();
        const winner = checkWinner();
        if (winner) {
          status.innerHTML = `<span class="winner">Player ${currentPlayer} wins!</span>`;
          gameActive = false;
        } else if (gameBoard.every((square) => square !== '')) {
          status.innerHTML = '<span class="draw">It\'s a draw!</span>';
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    };
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      return null;
    };
  
    const resetGame = () => {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      status.textContent = `Player ${currentPlayer}'s turn`;
      renderBoard();
    };
  
    resetBtn.addEventListener('click', resetGame);
  
    renderBoard();
  });
  