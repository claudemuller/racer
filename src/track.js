'use strict';

const TRACK_W = 40,
  TRACK_H = 40,
  TRACK_COLS = 20,
  TRACK_ROWS = 15,
  TRACK_ROAD = 0,
  TRACK_WALL = 1,
  TRACK_PLAYER_START = 2,
  TRACK_GOAL = 3,
  TRACK_TREE = 4,
  TRACK_FLAG = 5;

let trackGrid = [
    4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4,
    4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4,
    4, 1, 1, 0, 3, 0, 4, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4,
    1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 0, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 1, 1, 4, 4, 1, 1, 0, 0, 0, 5, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 0, 1, 1, 4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

function isObstacleAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS &&
    row >= 0 && row < TRACK_ROWS) {
    const trackIndexUnderCoord = rowColToArrayIndex(col, row);

    return trackGrid[trackIndexUnderCoord] !== TRACK_ROAD;
  } else return false;
}

function carTrackHandling() {
  const carTrackCol = Math.floor(carX / TRACK_W),
    carTrackRow = Math.floor(carY / TRACK_H),
    trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
    carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;

      carSpeed *= -0.5;
    }
  }
}

function drawTracks() {
  for (let row = 0; row < TRACK_ROWS; row++) {
    for (let col = 0; col < TRACK_COLS; col++) {
      const arrayIndex = rowColToArrayIndex(col, row),
        tileKind = trackGrid[arrayIndex];

      let useImage;

      switch (tileKind) {
        case TRACK_ROAD:
          useImage = roadPic;
          break;
        case TRACK_WALL:
          useImage = wallPic;
          break;
        case TRACK_GOAL:
          useImage = goalPic;
          break;
        case TRACK_TREE:
          useImage = treePic;
          break;
        case TRACK_FLAG:
          useImage = flagPic;
          break;
        default:
          break;
      }

      canvasContext.drawImage(useImage, TRACK_W * col, TRACK_H * row);
    }
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
