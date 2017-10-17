'use strict';

const KEY_UP_ARROW = 38,
  KEY_DOWN_ARROW = 40,
  KEY_LEFT_ARROW = 37,
  KEY_RIGHT_ARROW = 39;

let mouseX,
  mouseY,
  keyHeld_Gas = false,
  keyHeld_Reverse = false,
  keyHeld_TurnLeft = false,
  keyHeld_TurnRight = false;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function keyPressed(event) {
  if (event.keyCode === KEY_LEFT_ARROW) keyHeld_TurnLeft = true;
  if (event.keyCode === KEY_RIGHT_ARROW) keyHeld_TurnRight = true;
  if (event.keyCode === KEY_UP_ARROW) keyHeld_Gas = true;
  if (event.keyCode === KEY_DOWN_ARROW) keyHeld_Reverse = true;
}

function keyReleased(event) {
  if (event.keyCode === KEY_LEFT_ARROW) keyHeld_TurnLeft = false;
  if (event.keyCode === KEY_RIGHT_ARROW) keyHeld_TurnRight = false;
  if (event.keyCode === KEY_UP_ARROW) keyHeld_Gas = false;
  if (event.keyCode === KEY_DOWN_ARROW) keyHeld_Reverse = false;
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

