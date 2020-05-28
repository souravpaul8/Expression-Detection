const video = document.getElementById('video');

const constraints = {audio: false , video: true};

const startVideo = () => {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        video.srcObject = mediaStream;
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err){
        console.error(err);
    });
}
startVideo();