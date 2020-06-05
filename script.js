/* eslint-disable no-console */
/* eslint-disable no-undef */
const video = document.getElementById('video');

const startVideo = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((mediaStream) => {
      video.srcObject = mediaStream;
    })
    .catch((err) => {
      console.log(err);
    });
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo);

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displayField = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displayField);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceExpressions();
    console.log(detections);
    const resizedResults = faceapi.resizeResults(detections, displayField);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
    faceapi.draw.drawFaceExpressions(canvas, resizedResults);
  }, 1);
});
