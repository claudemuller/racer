'use strict';

const GROUNDSPEED_DECAY_MULT = 0.94,
  DRIVE_POWER = 0.5,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.06;

let carLoaded = false,
  carX = 75,
  carY = 75,
  carAng = 0,
  carSpeed = 0;

function drawCar() {
  drawBitmapCentredWithRotation(carPic, carX, carY, carAng);
}

function carReset() {
  for (let row = 0; row < TRACK_ROWS; row++) {
    for (let col = 0; col < TRACK_COLS; col++) {
      const arrayIndex = rowColToArrayIndex(col, row);

      if (trackGrid[arrayIndex] === TRACK_PLAYER_START) {
        trackGrid[arrayIndex] = TRACK_ROAD;
        carAng = -90 * Math.PI / 180.0;
        carX = col * TRACK_W + TRACK_W / 2;
        carY = row * TRACK_H + TRACK_H / 2;
      }
    }
  }
}

function carMove() {
  carSpeed *= GROUNDSPEED_DECAY_MULT;

  if (keyHeld_Gas) carSpeed += DRIVE_POWER;
  if (keyHeld_Reverse) carSpeed -= REVERSE_POWER;
  if (keyHeld_TurnLeft) carAng -= TURN_RATE;
  if (keyHeld_TurnRight) carAng += TURN_RATE;

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

