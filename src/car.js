'use strict';

const GROUNDSPEED_DECAY_MULT = 0.94,
  DRIVE_POWER = 0.5,
  REVERSE_POWER = 0.2,
  TURN_RATE = 0.06,
  MIN_SPEED_TO_TURN = 0.5;

function Car() {
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  this.speed = 0;
  this.myCarPic;
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;
  this.controlKeyUp;
  this.controlKeyDown;
  this.controlKeyLeft;
  this.controlKeyRight;

  this.setupInput = function (up, down, left, right) {
    this.controlKeyUp = up;
    this.controlKeyDown = down;
    this.controlKeyLeft = left;
    this.controlKeyRight = right;
  };

  this.reset = function (image) {
    this.myCarPic = image;
    for (let row = 0; row < TRACK_ROWS; row++) {
      for (let col = 0; col < TRACK_COLS; col++) {
        const arrayIndex = rowColToArrayIndex(col, row);

        if (trackGrid[arrayIndex] === TRACK_PLAYER_START) {
          trackGrid[arrayIndex] = TRACK_ROAD;
          this.ang = -90 * Math.PI / 180.0;
          this.x = col * TRACK_W + TRACK_W / 2;
          this.y = row * TRACK_H + TRACK_H / 2;

          return;
        }
      }
    }
  };

  this.move = function () {
    this.speed *= GROUNDSPEED_DECAY_MULT;

    if (this.keyHeld_Gas) this.speed += DRIVE_POWER;
    if (this.keyHeld_Reverse) this.speed -= REVERSE_POWER;
    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      if (this.keyHeld_TurnLeft) this.ang -= TURN_RATE;
      if (this.keyHeld_TurnRight) this.ang += TURN_RATE;
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    carTrackHandling(this);
  };

  this.draw = function () {
    drawBitmapCentredWithRotation(this.myCarPic, this.x, this.y, this.ang);
  };
}

