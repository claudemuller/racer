'use strict';

let canvas,
  canvasContext;

window.addEventListener('load', function load() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  clearScreen();
  colourText('Loading images...', canvas.width / 2, canvas.height / 2, 'white');

  loadImages();
});

function startGame() {
  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();
  carReset();
}

function updateAll() {
  update();
  render();
}

function update() {
  carMove();

  carTrackHandling();
}

function render() {
  // clearScreen();

  drawTracks();

  drawCar();
}

function clearScreen() {
  colourRect(0, 0, canvas.width, canvas.height, 'black');
}
