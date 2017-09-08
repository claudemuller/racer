(function () {
  'use strict';
  
  const PADDLE_WIDTH = 100,
    PADDLE_THICKNESS = 10,
    PADDLE_DISTANCE_FROM_EDGE = 60,
    BRICK_W = 80,
    BRICK_H = 20,
    BRICK_COLS = 10,
    BRICK_GAP = 2,
    BRICK_ROWS = 14;
  let canvas,
    canvasContext,
    ballX = 75,
    ballY = 75,
    ballSpeedX = 5,
    ballSpeedY = 7,
    paddleX = 400,
    mouseX,
    mouseY,
    brickGrid = new Array(BRICK_COLS * BRICK_ROWS),
    bricksLeft = 0;

  window.addEventListener('load', function load() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
    ballReset();
  });

  function updateAll() {
    update();
    render();
  }

  function brickReset() {
    bricksLeft = 0;
    for (let i = 0; i < 3 * BRICK_COLS; i++) {
      brickGrid[i] = false;
    }
    for (let i = 3 * BRICK_COLS; i < BRICK_COLS * BRICK_ROWS; i++) {
      brickGrid[i] = true;
      bricksLeft++;
    }
  }

  function updateMousePos(event) {
    let rect = canvas.getBoundingClientRect(),
      root = document.documentElement;

    mouseX = event.clientX - rect.left - root.scrollLeft,
      mouseY = event.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH / 2;

    /*ballX = mouseX;
    ballY = mouseY;
    ballSpeedX = 4;
    ballSpeedY = -4;*/
  }

  function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0 && ballSpeedX < 0.0) ballSpeedX *= -1;
    if (ballX > canvas.width && ballSpeedX > 0.0) ballSpeedX *= -1;
    if (ballY < 0 && ballSpeedY < 0.0) ballSpeedY *= -1;
    if (ballY > canvas.height) {
      ballReset();
      brickReset();
    }
  }

  function isBrickAtColRow(col, row) {
    if (col >= 0 && col < BRICK_COLS &&
      row >= 0 && row < BRICK_ROWS) {
      const brickIndexUnderCoord = rowColToArrayIndex(col, row);

      return brickGrid[brickIndexUnderCoord];
    } else return false;
  }

  function ballBrickHandling() {
    const ballBrickCol = Math.floor(ballX / BRICK_W),
      ballBrickRow = Math.floor(ballY / BRICK_H),
      brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

    if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
      if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
        const prevBallX = ballX - ballSpeedX,
          prevBallY = ballY - ballSpeedY,
          prevBrickCol = Math.floor(prevBallX / BRICK_W),
          prevBrickRow = Math.floor(prevBallY / BRICK_H);
        let bothTestsFailed = true;

        brickGrid[brickIndexUnderBall] = false;
        bricksLeft--;

        if (prevBrickCol !== ballBrickCol) {
          if (!isBrickAtColRow(prevBrickCol, ballBrickRow)) {
            ballSpeedX *= -1;
            bothTestsFailed = false;
          }
        }
        if (prevBrickRow !== ballBrickRow) {
          if (!isBrickAtColRow(ballBrickRow, prevBrickCol)) {
            ballSpeedY *= -1;
            bothTestsFailed = false;
          }
        }

        if (bothTestsFailed) {
          ballSpeedX *= -1;
          ballSpeedY *= -1;
        }
      }
    }
  }

  function ballPaddleHanding() {
    const paddleTopEdgeY = canvas.height - PADDLE_DISTANCE_FROM_EDGE,
      paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS,
      paddleLeftEdgeX = paddleX,
      paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if (ballY > paddleTopEdgeY && ballY < paddleBottomEdgeY &&
      ballX > paddleLeftEdgeX && ballX < paddleRightEdgeX) {
      const centerOfPaddleX = paddleX + PADDLE_WIDTH / 2,
        ballDistFromPaddleCentreX = ballX - centerOfPaddleX;

      ballSpeedY *= -1;
      ballSpeedX = ballDistFromPaddleCentreX * 0.35;

      if (bricksLeft === 0) brickReset();
    }
  }

  function update() {
    ballMove();

    ballBrickHandling();

    ballPaddleHanding();
  }

  function render() {
    colourRect(0, 0, canvas.width, canvas.height, 'black');

    colourCircle(ballX, ballY, 10, 'white');

    colourRect(paddleX, canvas.height - PADDLE_DISTANCE_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

    drawBricks();

    drawDebugInfo();
  }

  function drawBricks() {
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        const arrayIndex = rowColToArrayIndex(col, row);

        if (brickGrid[arrayIndex]) colourRect(BRICK_W * col, BRICK_H * row, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
      }
    }
  }

  function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
  }

  function drawDebugInfo() {
    const xThreshold = 40,
      yThreshold = 15,
      mouseBrickCol = Math.floor(mouseX / BRICK_W),
      mouseBrickRow = Math.floor(mouseY / BRICK_H),
      brickIndexUnderMouse = rowColToArrayIndex(mouseBrickCol, mouseBrickRow);

    let x = mouseX,
      y = mouseY;

    if (mouseX > canvas.width - xThreshold) x = mouseX - xThreshold;
    if (mouseY < yThreshold) {
      y = mouseY + yThreshold;
      x = mouseX + yThreshold;
    }

    colourText(`${mouseBrickCol},${mouseBrickRow}:${brickIndexUnderMouse}`, x, y, 'yellow');
  }

  function colourRect(x, y, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(x, y, width, height);
  }

  function colourCircle(x, y, radius, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }

  function colourText(msg, x, y, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillText(msg, x, y);
  }
})();

