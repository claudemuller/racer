'use strict';

const TRACK_W = 40,
  TRACK_H = 40,
  TRACK_COLS = 20,
  TRACK_GAP = 2,
  TRACK_ROWS = 15,
  TRACK_ROAD = 0,
  TRACK_WALL = 1,
  TRACK_PLAYER_START = 2;

const roadPic = document.createElement('img'),
  wallPic = document.createElement('img');

let trackGrid = [
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

function loadTrackImages() {
  roadPic.src = 'assets/track_road.png';
  wallPic.src = 'assets/track_wall.png';
}

function isWallAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS &&
    row >= 0 && row < TRACK_ROWS) {
    const trackIndexUnderCoord = rowColToArrayIndex(col, row);

    return trackGrid[trackIndexUnderCoord] === TRACK_WALL;
  } else return false;
}

function carTrackHandling() {
  const carTrackCol = Math.floor(carX / TRACK_W),
    carTrackRow = Math.floor(carY / TRACK_H),
    trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
    carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    if (isWallAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;

      carSpeed *= -0.5;
    }
  }
}

function drawTracks() {
  for (let row = 0; row < TRACK_ROWS; row++) {
    for (let col = 0; col < TRACK_COLS; col++) {
      const arrayIndex = rowColToArrayIndex(col, row);

      if (trackGrid[arrayIndex] === TRACK_ROAD) canvasContext.drawImage(roadPic, TRACK_W * col, TRACK_H * row);
      else if (trackGrid[arrayIndex] === TRACK_WALL) canvasContext.drawImage(wallPic, TRACK_W * col, TRACK_H * row);
    }
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
