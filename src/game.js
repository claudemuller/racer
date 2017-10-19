'use strict';

let canvas,
  canvasContext,
  blueCar = new Car(),
  greenCar = new Car();

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
  blueCar.reset();
  greenCar.reset();
}

function updateAll() {
  update();
  render();
}

function update() {
  blueCar.move();
  greenCar.move();
}

function render() {
  // clearScreen();

  drawTracks();

  blueCar.draw();
  greenCar.draw();
}

function clearScreen() {
  colourRect(0, 0, canvas.width, canvas.height, 'black');
}
