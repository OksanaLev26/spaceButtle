const renderPlayerProperties = (player, className) => {
  const currentPlayerStatus = document.querySelector(`.${className}`);
  if (currentPlayerStatus) {
    currentPlayerStatus.innerHTML = null;
  }
  const playerStatus = document.querySelector(`.${className}`);
    const div = document.createElement("div");
    div.className = "status";
    const hull = document.createElement("div");
    hull.classList.add(`hull-${className}`);
    hull.textContent = `Hull: ${player.hull}`;
    const firepower = document.createElement("div");
    firepower.classList.add(`firepower-${className}`);
    firepower.textContent = `FirePower: ${player.firepower}`;
    const accuracy = document.createElement("div");
    accuracy.classList.add(`accuracy-${className}`);
    accuracy.textContent = `Accuracy: ${player.accuracy}`;
    div.appendChild(hull);
    div.appendChild(firepower);
    div.appendChild(accuracy);
    playerStatus.appendChild(div);
};

const getRandomProperty = (max, min) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomAccuracy = (max, min) =>
    (min + Math.random() * (max - min)).toFixed(1);

const getAliens = (aliensNumber) => {
  let aliens = [];
  let i = 1;
  while (i <= aliensNumber) {
    const alienHull = getRandomProperty(6, 3);
    const alienFirepower = getRandomProperty(4, 2);
    const alienAccuracy = getRandomAccuracy(0.8, 0.6);
    const alien = new Ship(alienHull, alienFirepower, Number(alienAccuracy));
    aliens.push(alien);
    i++;
  }
  return aliens;
};

const changeEnemy = (player, className) => {
  const hull = document.querySelector(`.hull-${className}`);
  if (hull) {
    hull.textContent = player ? `Hull: ${player.hull}` : `Hull: -`;
    const firepower = document.querySelector(`.firepower-${className}`);
    firepower.textContent = player ? `FirePower: ${player.firepower}`: `FirePower: -`;
    const accuracy = document.querySelector(`.accuracy-${className}`);
    accuracy.textContent = player ? `Accuracy: ${player.accuracy}` : `Accuracy: -`;
  }
}

const getRandomAlienNumber = (max, min) =>
Math.floor(Math.random() * (max - min + 1)) + min;

class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attackEnemy(enemyArr, player, enemyButton, yourButton) {
    const randomNumber = Math.random();
    if (randomNumber < enemyArr[0].accuracy) {
      alert("Target hit!");

      const reduceEnemyHull = (enemy, damage) => {
        if (enemy.hull >= damage) {
            enemy.hull -= damage;
            if (enemy.hull === 0) {
                enemyArr.shift();
            }
        } else {
            damage -= enemy.hull;
            enemy.hull = 0;
            enemyArr.shift();
            if (damage > 0 && enemyArr.length > 0) {
                reduceEnemyHull(enemyArr[0], damage);
            }
        }
      }
    
    if (enemyArr.length >= 1) {
        reduceEnemyHull(enemyArr[0], player.firepower);
    }

    const enemyShipsNumber = document.querySelector('.enemyShipsNumber');

      if (yourButton.className === 'user') {
        changeEnemy(enemyArr[0], "enemyStats");
        enemyShipsNumber.textContent = `Enemy has ${enemyArr.length} ships`
      } else {
        changeEnemy(enemyArr[0], "playerStats");
      }
     
      if (enemyArr.length === 0) {
        alert("You win!");
        const message = prompt("Do you want to return to base and recharge your shields?  (Y/N)");
        if (message && message.toLowerCase() === "y") {
          initGame();
        } else if (message && message.toLowerCase() === "n" || !message) {
          alert('If you want to play more, press the Start button');
        }
        const userScore = document.querySelector('.playerScore');
          const enemyScore = document.querySelector('.enemyScore');
          if (enemyButton.className === 'user') {
            userScore.textContent = userScore.textContent;
            enemyScore.textContent = Number(enemyScore.textContent) + 1;
          } else {
            userScore.textContent = Number(userScore.textContent) + 1;
            enemyScore.textContent = enemyScore.textContent;
          }
        yourButton.disabled = true;
      } else {
        const message = prompt("Do you want to attack more?  (Y/N)");
        if (message && message.toLowerCase() === "y") {
          enemyButton.disabled = true;
          yourButton.disabled = false;
        } else if (message && message.toLowerCase() === "n" || !message) {
          alert("You lose!");
          alert('If you want to play more, press the Start button');
          const userScore = document.querySelector('.playerScore');
          const enemyScore = document.querySelector('.enemyScore');
          if (enemyButton.className === 'user') {
            userScore.textContent = Number(userScore.textContent) + 1;
            enemyScore.textContent = enemyScore.textContent;
          } else {
            userScore.textContent = userScore.textContent;
            enemyScore.textContent = Number(enemyScore.textContent) + 1;
          }
          enemyButton.disabled = true;
          yourButton.disabled = true;
        } 
      }
    } else {
      alert("You missed! Now it's the opponent's turn");
      enemyButton.disabled = false;
      yourButton.disabled = true;
      return;
    }
  }
}

const startButton = document.createElement('button');
startButton.classList.add('startButton', 'nameBox');
startButton.style.marginTop = '40px';
startButton.style.height = '40px';
startButton.style.width = '120px';
startButton.style.marginRight = '40px';
startButton.style.color = 'white';
startButton.style.backgroundColor = 'black';
startButton.style.cursor = 'pointer';
startButton.textContent = 'Start';

const score = document.createElement('div');
score.classList.add('score', 'nameBox');
score.style.display = 'flex';
score.style.justifyContent = 'space-evenly';
score.style.alignItems = 'center';
score.style.marginTop = '40px';
score.style.height = '40px';
score.style.width = '120px';
score.style.color = 'white';
score.style.backgroundColor = 'black';
score.style.position = 'absolute';
score.style.marginLeft = '42%';
const playerScore = document.createElement('div');
playerScore.classList.add('playerScore');
playerScore.textContent = '0';
score.appendChild(playerScore);
const center = document.createElement('div');
center.textContent = ':';
score.appendChild(center);
const enemyScore = document.createElement('div');
enemyScore.classList.add('enemyScore');
enemyScore.textContent = '0';
score.appendChild(enemyScore);

const enemyShipsNumber = document.createElement('div');
enemyShipsNumber.classList.add('enemyShipsNumber', 'nameBox');
enemyShipsNumber.style.display = 'flex';
enemyShipsNumber.style.position = 'absolute';
enemyShipsNumber.style.bottom = '40px';
enemyShipsNumber.style.marginLeft = '40%';
enemyShipsNumber.style.width = '190px';


const bodyContainer = document.querySelector('.bodyContainer');
bodyContainer.appendChild(startButton);

const body = document.querySelector('body');
bodyContainer.appendChild(score);
bodyContainer.appendChild(enemyShipsNumber);


const initGame = () => {
  const nameBoxElements = document.querySelectorAll(".nameBox");
  const playersIds = [];

  nameBoxElements.forEach((element, index) => {
    const newIdValue = `nameBox_${index + 1}`;
    element.id = newIdValue;
    playersIds.push(newIdValue);
  });

  const ussAssembly = new Ship(20, getRandomProperty(6, 2), 0.7);

  const randomAlienNumber = getRandomAlienNumber(10, 1);
  const aliens = getAliens(randomAlienNumber);
  enemyShipsNumber.textContent = `Enemy has ${aliens.length} ships`;
  renderPlayerProperties(ussAssembly, "playerStats");
  renderPlayerProperties(aliens[0], "enemyStats");

  const user = document.querySelector(`#${playersIds[0]}`);
  const enemyItem = document.querySelector(`#${playersIds[1]}`);

  const insertButton = (className, selector) => {
      const wrapperElement = document.createElement("button");
    wrapperElement.classList.add(className);
   
    wrapperElement.style.backgroundColor = "black";
    wrapperElement.style.color = "white";

    const parentEl = document.querySelector(selector);
    const parentElContent = parentEl.textContent;
    parentEl.textContent = "";

    parentEl.appendChild(wrapperElement);
    wrapperElement.textContent = parentElContent;

    const button = document.querySelector(`.${className}`);
    button.style.cursor = 'pointer';
    button.style.width = '25vw';
    button.style.height = '10vh';
    button.style.fontSize = '1em';
    button.style.fontFamily = 'Share Tech Mono';
    button.style.borderStyle = 'none';
  }

  insertButton('user', `#${playersIds[0]}`);
  insertButton('enemy', `#${playersIds[1]}`);

  const enemyButton = document.querySelector('.enemy');
  enemyButton.disabled = true;

  const userButton = document.querySelector('.user');

  const handleUserClick = () => {
    ussAssembly.attackEnemy(aliens, ussAssembly, enemyButton, userButton);
  };

  const handleEnemyClick = () => {
    if (aliens.length) {
      aliens[0].attackEnemy([ussAssembly], aliens[0], userButton, enemyButton);
    }
  };

  userButton.addEventListener("click", handleUserClick);
  enemyButton.addEventListener("click", handleEnemyClick);
};

startButton.addEventListener('click', initGame);
