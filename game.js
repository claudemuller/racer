(function () {
  'use strict';

  const carPic = document.createElement('img');
  let carLoaded = false;
  
  const PADDLE_WIDTH = 100,
    TRACK_W = 40,
    TRACK_H = 40,
    TRACK_COLS = 20,
    TRACK_GAP = 2,
    TRACK_ROWS = 15;
  let canvas,
    canvasContext,
    carX = 75,
    carY = 75,
    carAng = 0,
    carSpeedX = 5,
    carSpeedY = 7,
    mouseX,
    mouseY,
    trackGrid = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1,
      1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

  window.addEventListener('load', function load() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    carPic.onload = function () {
      carLoaded = true;
    };
    carPic.src = 'player1car.png';

    carReset();
  });

  function updateAll() {
    update();
    render();
  }

  function updateMousePos(event) {
    let rect = canvas.getBoundingClientRect(),
      root = document.documentElement;

    mouseX = event.clientX - rect.left - root.scrollLeft,
      mouseY = event.clientY - rect.top - root.scrollTop;

    /*carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;*/
  }

  function carReset() {
    for (let row = 0; row < TRACK_ROWS; row++) {
      for (let col = 0; col < TRACK_COLS; col++) {
        const arrayIndex = rowColToArrayIndex(col, row);

        if (trackGrid[arrayIndex] === 2) {
          trackGrid[arrayIndex] = 0;
          carX = col * TRACK_W + TRACK_W / 2;
          carY = row * TRACK_H + TRACK_H / 2;
        }
      }
    }
  }

  function carMove() {
    // carX += carSpeedX;
    // carY += carSpeedY;
    carAng += 0.02;

    if (carX < 0 && carSpeedX < 0.0) carSpeedX *= -1;
    if (carX > canvas.width && carSpeedX > 0.0) carSpeedX *= -1;
    if (carY < 0 && carSpeedY < 0.0) carSpeedY *= -1;
    if (carY > canvas.height) {
      carReset();
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

  function carTrackHandling() {
    const carTrackCol = Math.floor(carX / TRACK_W),
      carTrackRow = Math.floor(carY / TRACK_H),
      trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
      carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
      if (isTrackAtColRow(carTrackCol, carTrackRow)) {
        const prevCarX = carX - carSpeedX,
          prevCarY = carY - carSpeedY,
          prevTrackCol = Math.floor(prevCarX / TRACK_W),
          prevTrackRow = Math.floor(prevCarY / TRACK_H);
        let bothTestsFailed = true;

        if (prevTrackCol !== carTrackCol) {
          if (!isTrackAtColRow(prevTrackCol, carTrackRow)) {
            carSpeedX *= -1;
            bothTestsFailed = false;
          }
        }
        if (prevTrackRow !== carTrackRow) {
          if (!isTrackAtColRow(carTrackRow, prevTrackCol)) {
            carSpeedY *= -1;
            bothTestsFailed = false;
          }
        }

        if (bothTestsFailed) {
          carSpeedX *= -1;
          carSpeedY *= -1;
        }
      }
    }
  }

  function update() {
    carMove();

    carTrackHandling();
  }

  function render() {
    colourRect(0, 0, canvas.width, canvas.height, 'black');

    //colourCircle(carX, carY, 10, 'white');
    if (carLoaded) {
      drawBitmapCentredWithRotation(carPic, carX, carY, carAng);
    }

    drawTracks();

    drawDebugInfo();
  }

  function drawTracks() {
    for (let row = 0; row < TRACK_ROWS; row++) {
      for (let col = 0; col < TRACK_COLS; col++) {
        const arrayIndex = rowColToArrayIndex(col, row);

        if (trackGrid[arrayIndex] === 1) colourRect(TRACK_W * col, TRACK_H * row, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
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

  function drawBitmapCentredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
    canvasContext.restore();
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

