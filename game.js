(function () {
  'use strict';
  
  const PADDLE_WIDTH = 100,
    TRACK_W = 80,
    TRACK_H = 20,
    TRACK_COLS = 10,
    TRACK_GAP = 2,
    TRACK_ROWS = 14;
  let canvas,
    canvasContext,
    ballX = 75,
    ballY = 75,
    ballSpeedX = 5,
    ballSpeedY = 7,
    mouseX,
    mouseY,
    trackGrid = new Array(TRACK_COLS * TRACK_ROWS),
    tracksLeft = 0;

  window.addEventListener('load', function load() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    trackReset();
    ballReset();
  });

  function updateAll() {
    update();
    render();
  }

  function trackReset() {
    tracksLeft = 0;
    for (let i = 0; i < 3 * TRACK_COLS; i++) {
      trackGrid[i] = false;
    }
    for (let i = 3 * TRACK_COLS; i < TRACK_COLS * TRACK_ROWS; i++) {
      trackGrid[i] = true;
      tracksLeft++;
    }
  }

  function updateMousePos(event) {
    let rect = canvas.getBoundingClientRect(),
      root = document.documentElement;

    mouseX = event.clientX - rect.left - root.scrollLeft,
      mouseY = event.clientY - rect.top - root.scrollTop;

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
      trackReset();
    }
  }

  function isTrackAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS &&
      row >= 0 && row < TRACK_ROWS) {
      const trackIndexUnderCoord = rowColToArrayIndex(col, row);

      return trackGrid[trackIndexUnderCoord];
    } else return false;
  }

  function ballTrackHandling() {
    const ballTrackCol = Math.floor(ballX / TRACK_W),
      ballTrackRow = Math.floor(ballY / TRACK_H),
      trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);

    if (ballTrackCol >= 0 && ballTrackCol < TRACK_COLS &&
      ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS) {
      if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {
        const prevBallX = ballX - ballSpeedX,
          prevBallY = ballY - ballSpeedY,
          prevTrackCol = Math.floor(prevBallX / TRACK_W),
          prevTrackRow = Math.floor(prevBallY / TRACK_H);
        let bothTestsFailed = true;

        trackGrid[trackIndexUnderBall] = false;
        tracksLeft--;

        if (prevTrackCol !== ballTrackCol) {
          if (!isTrackAtColRow(prevTrackCol, ballTrackRow)) {
            ballSpeedX *= -1;
            bothTestsFailed = false;
          }
        }
        if (prevTrackRow !== ballTrackRow) {
          if (!isTrackAtColRow(ballTrackRow, prevTrackCol)) {
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

  function update() {
    ballMove();

    ballTrackHandling();
  }

  function render() {
    colourRect(0, 0, canvas.width, canvas.height, 'black');

    colourCircle(ballX, ballY, 10, 'white');

    drawTracks();

    drawDebugInfo();
  }

  function drawTracks() {
    for (let row = 0; row < TRACK_ROWS; row++) {
      for (let col = 0; col < TRACK_COLS; col++) {
        const arrayIndex = rowColToArrayIndex(col, row);

        if (trackGrid[arrayIndex]) colourRect(TRACK_W * col, TRACK_H * row, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
      }
    }
  }

  function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
  }

  function drawDebugInfo() {
    const xThreshold = 40,
      yThreshold = 15,
      mouseTrackCol = Math.floor(mouseX / TRACK_W),
      mouseTrackRow = Math.floor(mouseY / TRACK_H),
      trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);

    let x = mouseX,
      y = mouseY;

    if (mouseX > canvas.width - xThreshold) x = mouseX - xThreshold;
    if (mouseY < yThreshold) {
      y = mouseY + yThreshold;
      x = mouseX + yThreshold;
    }

    colourText(`${mouseTrackCol},${mouseTrackRow}:${trackIndexUnderMouse}`, x, y, 'yellow');
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

