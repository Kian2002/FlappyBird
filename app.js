document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  let score = document.querySelector(".score");
  let counter = 0;
  let birdLeft = 220;
  let birdBottom = 150;
  let gravity = 2;
  let isGameOver = false;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
    if (birdBottom === 0) {
      gameOver();
    }
  }
  let timerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 510) birdBottom += 40;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  }

  function control(key) {
    if (key.keyCode === 32) jump();
  }
  document.addEventListener("keyup", control);

  function gameOver() {
    clearInterval(timerId);
    isGameOver = true;
    document.removeEventListener("keyup", control);
  }

  function generateObstacle() {
    let obstacleLeft = 450;
    let randomHeight = Math.random() * 100;
    let obstacleBottom = Math.floor(randomHeight);
    console.log(obstacleBottom);
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("top-obstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = obstacleBottom + 430 + "px";

    function moveObstacle() {
      if (!isGameOver) obstacleLeft -= 3;
      topObstacle.style.left = obstacleLeft + "px";
      obstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === 0) {
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if (obstacleLeft > 170 && obstacleLeft < 280 && birdLeft === 220 &&
         (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + 430 - 200)) {
        gameOver();
      }
      if (obstacleLeft == 210) {
        counter++;
        score.innerHTML = counter;
      }
    }
    let obstacleTimerId = setInterval(moveObstacle, 17.5);
    if (!isGameOver) setTimeout(generateObstacle, 2000);
  }
  setTimeout(generateObstacle, 3000);
});
