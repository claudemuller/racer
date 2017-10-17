'use strict';

function drawBitmapCentredWithRotation(useBitmap, atX, atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
}

function colourRect(x, y, width, height, colour) {
  canvasContext.fillStyle = colour;
  canvasContext.fillRect(x, y, width, height);
}

function colourCircle(x, y, radius, colour) {
  canvasContext.fillStyle = colour;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colourText(msg, x, y, colour) {
  canvasContext.fillStyle = colour;
  canvasContext.fillText(msg, x, y);
}
