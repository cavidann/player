var mytrack = document.getElementById('mytrack');
var playButton = document.getElementById('playButton');
var muteButton = document.getElementById('muteButton');

var duration = document.getElementById('fullDuration');
var currentTime = document.getElementById('currentTime');

var barSize=640;
var bar=document.getElementById('defaultBar');
var progressBar=document.getElementById('progressBar'); 

playButton.addEventListener('click', playOrPause, false);
muteButton.addEventListener('click', muteOrUnmute, false);
bar.addEventListener('click',clikedBar,false);

function playOrPause() {
    if (!mytrack.paused && !mytrack.ended) {
        mytrack.pause();
        playButton.style.backgroundImage = 'url(play.jpg)';
        window.clearInterval(updateTime);
    }
    else {
        mytrack.play();
        playButton.style.backgroundImage = 'url(pause.jpg)';
        updateTime = setInterval(update, 100);
    }
}

function muteOrUnmute() {
    if (mytrack.muted == true) {
        mytrack.muted = false;
        muteButton.style.backgroundImage = 'url(speaker.png)';
    }
    else {
        mytrack.muted = true;
        muteButton.style.backgroundImage = 'url(mute.png)';
    }
}

function update() {
    if (!mytrack.ended) {
        var playedMinutes = parseInt(mytrack.currentTime / 60);
        var playedSeconds = parseInt(mytrack.currentTime % 60);
        currentTime.innerHTML = playedMinutes + ':' + playedSeconds;

        var size=parseInt(mytrack.currentTime*barSize/mytrack.duration);
        progressBar.style.width=size+'px';
        progressBar.style.transition=10+'ms';
    }
    else{
        progressBar.style.width=100+'%';
        playButton.style.backgroundImage = 'url(reload.png)';
    }
}

mytrack.addEventListener("loadedmetadata", function () {
    var minutes = parseInt(mytrack.duration / 60);
    var seconds = parseInt(mytrack.duration % 60);
    duration.innerHTML = minutes + ':' + seconds;
});

function clikedBar(e){
    if(!mytrack.ended){
        var mouseX=e.pageX-bar.offsetLeft;
        var newtime=mouseX*mytrack.duration/barSize;
        mytrack.currentTime=newtime;
        progressBar.style.width=mouseX+'px'
        update();
    }
}
