let grid = [];
let agentPosition = { x: 0, y: 0 };
let wumpusPosition = {};
let goldPosition = {};
let pitPositions = [];
let hasArrow = true;
let gameStarted = false;
let gameOver = false;

const gridElement = document.getElementById("gameGrid");
const startButton = document.getElementById("startGameButton");
const messageElement = document.getElementById("message");

// Initialize empty grid
function initializeGrid() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(null));
    gridElement.innerHTML = ""; // Clear existing cells

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-x", i);
            cell.setAttribute("data-y", j);
            gridElement.appendChild(cell);
        }
    }

    agentPosition = { x: 0, y: 0 };
    placeEntities();
    renderAgent();
}

// Place Wumpus, gold, and pits randomly
function placeEntities() {
    wumpusPosition = placeRandomEntity("Wumpus");
    goldPosition = placeRandomEntity("Gold");

    pitPositions = [];
    while (pitPositions.length < 3) {
        const pit = placeRandomEntity("Pit");
        if (!pitPositions.includes(pit.toString()) && pit !== wumpusPosition.toString() && pit !== goldPosition.toString()) {
            pitPositions.push(pit);
        }
    }
}

// Place a random entity in the grid
function placeRandomEntity(type) {
    let x, y;
    do {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
    } while (grid[x][y] !== null);
    grid[x][y] = type;
    return { x, y };
}

// Render the agent on the grid
function renderAgent() {
    const cell = document.querySelector(`.cell[data-x='${agentPosition.x}'][data-y='${agentPosition.y}']`);
    cell.classList.add("agent");
    cell.style.backgroundImage = "url('../assets/agent_right.png')"; // Starting direction
}

// Start game
startButton.addEventListener("click", () => {
    if (!gameStarted) {
        initializeGrid();
        messageElement.innerText = "Game Started! Find the gold!";
        gameStarted = true;
    }
});

// Handle movements and interactions
document.addEventListener("keydown", (event) => {
    if (!gameStarted || gameOver) return;

    switch (event.key) {
        case "ArrowUp":
            moveAgent(0, -1);
            break;
        case "ArrowDown":
            moveAgent(0, 1);
            break;
        case "ArrowLeft":
            moveAgent(-1, 0);
            break;
        case "ArrowRight":
            moveAgent(1, 0);
            break;
        default:
            break;
    }
});

// Move agent and check for game conditions
function moveAgent(dx, dy) {
    const newX = agentPosition.x + dx;
    const newY = agentPosition.y + dy;

    if (newX < 0 || newX > 3 || newY < 0 || newY > 3) {
        messageElement.innerText = "You hit the wall!";
        return;
    }

    agentPosition = { x: newX, y: newY };
    checkGameState();
    renderAgent();
}

// Check the game state after each move
function checkGameState() {
    const currentCell = grid[agentPosition.x][agentPosition.y];

    if (currentCell === "Wumpus") {
        messageElement.innerText = "You were eaten by the Wumpus! Game Over!";
        gameOver = true;
    } else if (currentCell === "Pit") {
        messageElement.innerText = "You fell into a pit! Game Over!";
        gameOver = true;
    } else if (currentCell === "Gold") {
        messageElement.innerText = "You found the gold! You win!";
        gameOver = true;
    }
}

// Restart game
document.getElementById("restartButton").addEventListener("click", () => {
    gameStarted = false;
    gameOver = false;
    messageElement.innerText = "";
    initializeGrid();
});

// Back button functionality
document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html"; // Change to your home page
});
