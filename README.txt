# Connect 4 Multiplayer Game

## Overview
This is an online multiplayer Connect 4 game that allows two players to play together in real-time through a web browser.
Please find the statements with ******* on either side if you are only looking for commands to run to test the game.

## Project Structure
```
MWT/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── game.js
│
└── server.js
```

## Prerequisites
- Node.js (Recommended version 14 or higher)
- npm (Node Package Manager)

## Installation

### 1. Project Setup
```bash
# Navigate to project directory
cd MWT

# Initialize npm project
					*******"npm init -y"******* [command 1]

# Install required dependencies
					*******"npm install express socket.io"*******[command 2]
```

### 2. Start the Server
```bash
# Launch the game server
					*******"node server.js"*******[command 3]
```
You should see a message: "Server running on port 3000"

## How to Play

### Accessing the Game
1. Open your web browser
2. Navigate to `http://localhost:3000`

### Multiplayer Game Setup
1. **Room Creation**: 
   - When you first open the game, you'll be prompted to enter a unique room name
   - **Important**: Both players must enter the SAME room name

2. **Player Setup**:
   - Both players will be asked to choose their coin color
   - Ensure colors are different for each player

3. **Starting the Game**:
   - Once both players have joined the room and selected colors
   - The game will automatically start
   - Players take turns dropping coins into columns

### Multiplayer Features
- Real-time updates across both players' screens
- Synchronized game state
- Winner detection

### Creating Multiple Game Sessions
- To run parallel games:
  - Open different browser tabs
  - Enter unique room names for each game session

## Game Rules
- Two players take turns dropping coins
- First player to connect 4 coins vertically, horizontally, or diagonally wins
- If a column is full, players cannot drop more coins in that column

## Troubleshooting
- Ensure both players use the EXACT same room name
- Check that the server is running on port 3000
- Refresh the browser if any synchronization issues occur

## Technical Details
- Backend: Node.js with Express
- Real-time Communication: Socket.IO
- Game Logic: Implemented in client-side and server-side JavaScript

## Contributing
Feel free to fork the repository and submit pull requests for improvements!

## License
[Add your license information here]
```