const carPic = document.createElement('img'),
  otherCarPic = document.createElement('img');

let picsToLoad = 0,
  trackPics = [];

function countLoadedImagesAndLaunch() {
  picsToLoad--;
  if (picsToLoad === 0) startGame();
}

function loadImage(varName, imageName) {
  varName.onload = countLoadedImagesAndLaunch;
  varName.src = `assets/${imageName}`;
}

function loadImages() {
  const imageList = [
    {varName: carPic, fileName: 'player1car.png'},
    {varName: otherCarPic, fileName: 'player2car.png'},
    {trackType: TRACK_ROAD, fileName: 'track_road.png'},
    {trackType: TRACK_WALL, fileName: 'track_wall.png'},
    {trackType: TRACK_GOAL, fileName: 'track_goal.png'},
    {trackType: TRACK_TREE, fileName: 'track_tree.png'},
    {trackType: TRACK_FLAG, fileName: 'track_flag.png'},
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].varName !== undefined) loadImage(imageList[i].varName, imageList[i].fileName);
    else loadImageForTrack(imageList[i].trackType, imageList[i].fileName);
  }
}

function loadImageForTrack(trackCode, fileName) {
  trackPics[trackCode] = document.createElement('img');
  loadImage(trackPics[trackCode], fileName);
}
