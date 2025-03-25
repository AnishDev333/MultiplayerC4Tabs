// Initialize Socket.io on the client
const socket = io();

let currentPlayerColor = null;
let opponentColor = null;
let isPlayerTurn = true;
let gameOver = false;
const gridRows = 6;
const gridCols = 7;
let grid = [];
let board = [];
let room = null;

// Create the Connect 4 grid and initialize board state
function createGrid() {
  const gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';
  grid = [];
  board = [];
  
  for (let r = 0; r < gridRows; r++) {
    let row = [];
    let boardRow = new Array(gridCols).fill(null);
    for (let c = 0; c < gridCols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => handleCellClick(c));
      gridContainer.appendChild(cell);
      row.push(cell);
    }
    grid.push(row);
    board.push(boardRow);
  }
}

// Handle a player's click on a column
function handleCellClick(col) {
  if (!isPlayerTurn || gameOver) return;

  // Find the lowest available cell in the column
  let row = gridRows - 1;
  while (row >= 0) {
    const cell = grid[row][col];
    if (!cell.hasChildNodes()) {
      // Drop coin and update board state
      dropCoin(cell, currentPlayerColor);
      board[row][col] = currentPlayerColor;
      
      // Emit move event to server
      socket.emit('move', { col, row, color: currentPlayerColor });
      
      // Check for win
      if (checkWin(row, col, currentPlayerColor)) {
        gameOver = true;
        updateTurnText("You Win!");
        // Notify opponent that the game is over
        socket.emit('gameOver', { message: 'You Lose! Your opponent won.' });
      } else {
        isPlayerTurn = false;
        updateTurnText("Opponent's Turn");
      }
      break;
    }
    row--;
  }
}

// Drop a coin element into a cell
function dropCoin(cell, color) {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.style.backgroundColor = color;
  cell.appendChild(coin);
  setTimeout(() => {
    coin.style.top = '0';
  }, 50);
}

// Update the turn text or display game outcome
function updateTurnText(text) {
  const turnText = document.getElementById('turn-text');
  turnText.textContent = text || (isPlayerTurn ? "Your Turn" : "Opponent's Turn");
}

// Prompt the player to choose a color
function selectColor() {
  let color = prompt("Select your color (e.g., red, blue, green):", "red");
  if (!color) color = "red";
  currentPlayerColor = color;
  socket.emit('colorSelected', { color: currentPlayerColor });
  updateTurnText();
}

// Check for win condition from the latest move
function checkWin(row, col, color) {
  const directions = [
    { dr: 0, dc: 1 },   // horizontal
    { dr: 1, dc: 0 },   // vertical
    { dr: 1, dc: 1 },   // diagonal down-right
    { dr: -1, dc: 1 }   // diagonal up-right
  ];
  
  for (let { dr, dc } of directions) {
    let count = 1;
    
    // Check positive direction
    let r = row + dr, c = col + dc;
    while (r >= 0 && r < gridRows && c >= 0 && c < gridCols && board[r][c] === color) {
      count++;
      r += dr;
      c += dc;
    }
    
    // Check negative direction
    r = row - dr;
    c = col - dc;
    while (r >= 0 && r < gridRows && c >= 0 && c < gridCols && board[r][c] === color) {
      count++;
      r -= dr;
      c -= dc;
    }
    
    if (count >= 4) return true;
  }
  return false;
}

// Socket.io event listeners

// Listen for opponent's color selection
socket.on('colorSelected', (data) => {
  opponentColor = data.color;
  console.log("Opponent selected color:", opponentColor);
});

// Listen for opponent moves
socket.on('move', (data) => {
  const { col, row, color } = data;
  const cell = grid[row][col];
  if (cell && !cell.hasChildNodes()) {
    dropCoin(cell, color);
    board[row][col] = color;
    if (checkWin(row, col, color)) {
      gameOver = true;
      updateTurnText("You Lose!");
    } else {
      isPlayerTurn = true;
      updateTurnText("Your Turn");
    }
  }
});

// Listen for game over events from opponent
socket.on('gameOver', (data) => {
  gameOver = true;
  updateTurnText(data.message);
});

// Listen for notification when another player joins the room
socket.on('playerJoined', (data) => {
  console.log("Player joined:", data.playerId);
});

// Start the game when the "Start Game" button is clicked
document.getElementById('start-btn').addEventListener('click', () => {
  // Prompt for room name (if none is entered, default to "defaultRoom")
  room = prompt("Enter room name to join or create:");
  if (!room) {
    room = "defaultRoom";
  }
  socket.emit('joinRoom', { room });
  
  // Show game container and initialize the game
  document.getElementById('game-container').style.display = 'block';
  document.getElementById('start-btn').style.display = 'none';
  createGrid();
  selectColor();
});
