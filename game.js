(function () {
  'use strict';

  const PADDLE_HEIGHT = 100,
    PADDLE_WIDTH = 10,
    BALL_RADIUS = 10,
    WINNING_SCORE = 3;
  let canvas,
    canvasContext,
    ballX = 50,
    ballY = 50,
    ballSpeedX = 10,
    ballSpeedY = 4,
    paddle1Y = 250,
    paddle2Y = 250,
    player1Score = 0,
    player2Score = 0,
    showingWinScreen = false;

  window.addEventListener('load', function load(event) {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    setInterval(function everyFrame() {
      update();
      render();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', function move(event) {
      const mousePos = calculateMousePos(event);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });

    canvas.addEventListener('mousedown', handleMouseClick);
  });

  function handleMouseClick(event) {
    if (showingWinScreen) {
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = false;
    }
  }

  function calculateMousePos(event) {
    const rect = canvas.getBoundingClientRect(),
      root = document.documentElement,
      mouseX = event.clientX - rect.left - root.scrollLeft,
      mouseY = event.clientY - rect.top - root.scrollTop;

    return {
      x: mouseX,
      y: mouseY
    };
  }

  function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
      showingWinScreen = !showingWinScreen;
    }

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }

  function computerMovement() {
    const paddle2YCentre = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCentre < ballY - 35) paddle2Y += 6;
    else if (paddle2YCentre > ballY + 35) paddle2Y -= 6;
  }

  function update() {
    if (showingWinScreen) return;

    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
      if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
        const deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);

        ballSpeedX = -ballSpeedX;
        ballSpeedY = deltaY * 0.35;
      }
      else {
        player2Score++;
        ballReset();
      }
    }
    if (ballX > canvas.width) {
      if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
        const deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
        ballSpeedX = -ballSpeedX;
        ballSpeedY = deltaY * 0.35;
      }
      else {
        player1Score++;
        ballReset();
      }
    }
    if (ballY > canvas.height || ballY < 0) ballSpeedY = -ballSpeedY;
  }

  function drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
      colourRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
  }

  function render() {
    colourRect(0, 0, canvas.width, canvas.height, 'black');

    if (showingWinScreen) {
      canvasContext.fillStyle = 'white';

      if (player1Score >= WINNING_SCORE) canvasContext.fillText('Left player won', 350, 200);
      else if (player2Score >= WINNING_SCORE) canvasContext.fillText('Right player won', 350, 200);

      canvasContext.fillText('Click to continue', 350, 500);

      return;
    }

    drawNet();
    colourRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    colourRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    colourCircle(ballX, ballY, BALL_RADIUS, 'white');
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
  }

  function colourRect(leftX, topY, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(leftX, topY, width, height);
  }

  function colourCircle(x, y, radius, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }
})()

