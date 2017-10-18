'use strict';

let canvas,
  canvasContext;

window.addEventListener('load', function load() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  loadTrackImages();

  loadCarImage();

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
  // clearScreen();

  drawTracks();

  drawCar();
}

function clearScreen() {
  colourRect(0, 0, canvas.width, canvas.height, 'black');
}
