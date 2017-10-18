const roadPic = document.createElement('img'),
  wallPic = document.createElement('img'),
  carPic = document.createElement('img');

let picsToLoad = 0;

function countLoadedImagesAndLaunch() {
  picsToLoad--;
  if (picsToLoad === 0) startGame();
}

function loadImage(varName, imageName) {
  varName.onload = countLoadedImagesAndLaunch;
  varName.src = imageName;
}

function loadImages() {
  const imageList = [
    {varName: carPic, fileName: 'assets/player1car.png'},
    {varName: roadPic, fileName: 'assets/track_road.png'},
    {varName: wallPic, fileName: 'assets/track_wall.png'}
  ];

  picsToLoad = imageList.length;

  for (let i = 0; i < imageList.length; i++) {
    loadImage(imageList[i].varName, imageList[i].fileName);
  }
}
