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

let levelOne = [
    4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4,
    4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4,
    4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4,
    1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 1, 1, 4, 4, 1, 1, 0, 0, 0, 5, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 0, 1, 1, 4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1,
  ],
  trackGrid = [];

function tileTypeAtColRow(col, row) {
  if (col >= 0 && col < TRACK_COLS &&
    row >= 0 && row < TRACK_ROWS) {
    const trackIndexUnderCoord = rowColToArrayIndex(col, row);

    return trackGrid[trackIndexUnderCoord];
  } else return TRACK_WALL;
}

function carTrackHandling(car) {
  const carTrackCol = Math.floor(car.x / TRACK_W),
    carTrackRow = Math.floor(car.y / TRACK_H);

  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
    carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    const tileHere = tileTypeAtColRow(carTrackCol, carTrackRow);

    if (tileHere === TRACK_GOAL) {
      console.log(car.name, 'WINS!');
      loadLevel(levelOne);
    } else if (tileHere !== TRACK_ROAD) {
      car.x -= Math.cos(car.ang) * car.speed;
      car.y -= Math.sin(car.ang) * car.speed;

      car.speed *= -0.5;
    }
  }
}

function drawTracks() {
  let arrayIndex = 0,
    tileX = 0,
    tileY = 0;
  for (let row = 0; row < TRACK_ROWS; row++) {
    for (let col = 0; col < TRACK_COLS; col++) {
      const tileKind = trackGrid[arrayIndex],
        useImage = trackPics[tileKind];

      canvasContext.drawImage(useImage, tileX, tileY);

      tileX += TRACK_W;
      arrayIndex++;
    }
    tileX = 0;
    tileY += TRACK_H;
  }
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
