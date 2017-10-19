'use strict';

const KEY_UP_ARROW = 38,
  KEY_DOWN_ARROW = 40,
  KEY_LEFT_ARROW = 37,
  KEY_RIGHT_ARROW = 39,
  KEY_W = 87,
  KEY_A = 65,
  KEY_S = 83,
  KEY_D = 68;

let mouseX,
  mouseY;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueCar.setupInput(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
  greenCar.setupInput(KEY_W, KEY_S, KEY_A, KEY_D);
}

function keySet(event, car, key) {
  if (event.keyCode === car.controlKeyLeft) car.keyHeld_TurnLeft = key;
  if (event.keyCode === car.controlKeyRight) car.keyHeld_TurnRight = key;
  if (event.keyCode === car.controlKeyUp) car.keyHeld_Gas = key;
  if (event.keyCode === car.controlKeyDown) car.keyHeld_Reverse = key;
}

function keyPressed(event) {
  keySet(event, blueCar, true);
  keySet(event, greenCar, true);
}

function keyReleased(event) {
  keySet(event, blueCar, false);
  keySet(event, greenCar, false);
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

