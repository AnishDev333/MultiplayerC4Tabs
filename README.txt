# Connect 4 Multiplayer Game

## Overview
This is an online multiplayer Connect 4 game that allows two players to play together in real-time through a web browser.

----------PLEASE FIND STATEMENTS WITHIN BOXES FOR COMMANDS TO RUN THE GAME FROM THE DIRECTORY TERMINAL(There are 3 commands in boxes).----------

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
cd MWT (this was the command for me this changes depending on where you extract or git pull)

# Initialize npm project


 ______________________________________________________________
|							                                                 |
|			npm init -y			                                         |
|______________________________________________________________|

					

# Install required dependencies


 ______________________________________________________________
|							                                                 |
|	      npm install express socket.io	                 	       |
|______________________________________________________________|

					

### 2. Start the Server
```bash
# Launch the game server


 ______________________________________________________________
|							                                                 |
|			node server.js			                                     |
|______________________________________________________________|

					
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

https://github.com/AnishDev333/MultiplayerC4Tabs

All files are also available in the above mentions GIT repository.
