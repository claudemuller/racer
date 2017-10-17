'use strict';

let canvas,
  canvasContext;

window.addEventListener('load', function load() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  loadCar();

  carReset();
});

function updateAll() {
  update();
  render();
}

function update() {
  carMove();

  carTrackHandling();
}

function render() {
  clearScreen();

  drawCar();

  drawTracks();

  // drawDebugInfo();
}

function clearScreen() {
  colourRect(0, 0, canvas.width, canvas.height, 'black');
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

