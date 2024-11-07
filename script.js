function createGameUI() {
    const h1 = document.createElement('h1');
    h1.textContent = 'WINTER PEXESO';
  
    const difficultyLabel = document.createElement('label');
    difficultyLabel.classList.add('text');
    difficultyLabel.textContent = 'Difficulty:';
  
    const difficultySelect = document.createElement('select');
    difficultySelect.classList.add('text');
    difficultySelect.id = 'difficulty';
  
    const difficultyOptions = ['veryeasy', 'easy', 'medium', 'hard', 'ultrahard'];
    difficultyOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option.replace('very', 'very ');
      difficultySelect.appendChild(optionElement);
    });
  
    const startButton = document.createElement('button');
    startButton.classList.add('text');
    startButton.id = 'start';
    startButton.textContent = 'Start game';
  
    const player1Label = document.createElement('label');
    player1Label.classList.add('text1');
    player1Label.id = 'player1';
    player1Label.textContent = 'Player: 0';
  
    const turnLabel = document.createElement('label');
    turnLabel.classList.add('text1');
    turnLabel.id = 'turn';
    turnLabel.textContent = 'Who plays: Player 1';
  
    const scoreLabel = document.createElement('label');
    scoreLabel.classList.add('text1');
    scoreLabel.id = 'score';
    scoreLabel.textContent = "Player's score: 0";
  
    const container = document.createElement('div');
    container.id = 'game-ui';
    container.appendChild(h1);
    container.appendChild(difficultyLabel);
    container.appendChild(difficultySelect);
    container.appendChild(startButton);
    container.appendChild(player1Label);
    container.appendChild(turnLabel);
    container.appendChild(scoreLabel);
  
    document.body.appendChild(container);
  
    startButton.addEventListener("click", () => {
      pexeso();
    });
  }
  
document.addEventListener('DOMContentLoaded', () => {
createGameUI();
});

function pexeso() {
let d = document.getElementById("difficulty").value;
switch (d) {
    case "veryeasy":
    playingField(3, 3);
    break;
    case "easy":
    playingField(4, 4);
    break;
    case "medium":
    playingField(6, 6);
    break;
    case "hard":
    playingField(8, 8);
    break;
    case "ultrahard":
    playingField(10, 10);
    break;
}
}

function playingField(rows, cols) {
const appDiv = document.createElement("div");
appDiv.id = "app";
document.body.appendChild(appDiv);

gameBoard = [];
flippedCards = [];
matchedPairs = 0;

const totalCards = rows * cols;
const cards = generateCards(totalCards);

for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    gameBoard[i] = [];
    for (let j = 0; j < cols; j++) {
    const button = document.createElement("button");
    button.id = `button_${i}_${j}`;
    button.className = "piece";
    button.innerText = "";
    button.addEventListener("click", () => flipCard(i, j, cards[i * cols + j]));
    gameBoard[i][j] = button;
    row.appendChild(button);
    }
    appDiv.appendChild(row);
}

updatePlayerInfo();
}
  

function generateCards(totalCards) {
  const emoticons = [
    "🎄", "❄️", "☃️", "🏂", "🤶", "🎅", "🎁", "🌟", "🎄", "⛄", "🛷", "🧣", "🧤", "⛷️", "🌲", "🥛", "🍪", "🔔", "🌠", "⭐"
  ];

  const cardValues = [];
  const numPairs = totalCards / 2;

  for (let i = 0; i < numPairs; i++) {
    const randomEmoticon1 = emoticons[i % emoticons.length];
    const randomEmoticon2 = emoticons[(i + 1) % emoticons.length];
    cardValues.push(randomEmoticon1, randomEmoticon2);
  }

  cardValues.sort(() => Math.random() - 0.5);

  return cardValues;
}

function flipCard(i, j, cardValue) {
  if (flippedCards.length < 2 && !gameBoard[i][j].classList.contains("flipped")) {
    gameBoard[i][j].classList.add("flipped");
    gameBoard[i][j].innerText = cardValue;
    flippedCards.push({ i, j, value: cardValue });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const firstValue = firstCard.value;
  const secondValue = secondCard.value;

  if (firstValue === secondValue) {
    matchedPairs++;
    currentPlayer.score++;
    updatePlayerInfo();
  } else {
    gameBoard[firstCard.i][firstCard.j].classList.remove("flipped");
    gameBoard[secondCard.i][secondCard.j].classList.remove("flipped");
    gameBoard[firstCard.i][firstCard.j].innerText = "";
    gameBoard[secondCard.i][secondCard.j].innerText = "";
  }

  flippedCards = [];

  if (matchedPairs === (gameBoard.length * gameBoard[0].length) / 2) {
    alert(`Game Over! Player ${currentPlayer.number} wins!`);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  updatePlayerInfo();
}

function updatePlayerInfo() {
  document.getElementById("turn").innerText = `Who plays: Player ${currentPlayer.number}`;
  document.getElementById("score").innerText = `Player's score: ${currentPlayer.score}`;
  document.getElementById("player1").innerText = `Player 1: ${player1.score}`;
}