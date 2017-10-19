const roadPic = document.createElement('img'),
  wallPic = document.createElement('img'),
  carPic = document.createElement('img'),
  goalPic = document.createElement('img'),
  treePic = document.createElement('img'),
  flagPic = document.createElement('img');

let picsToLoad = 0;

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
    {varName: roadPic, fileName: 'track_road.png'},
    {varName: wallPic, fileName: 'track_wall.png'},
    {varName: goalPic, fileName: 'track_goal.png'},
    {varName: treePic, fileName: 'track_tree.png'},
    {varName: flagPic, fileName: 'track_flag.png'},
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    loadImage(imageList[i].varName, imageList[i].fileName);
  }
}
