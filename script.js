function PLayer(className) {

    var self = this;
    var mytrack;
    var barSize = 640;
    var currentTime;
    var progressBar;
    var bar;

    self.tabs = document.querySelector("." + className);

    self.tabs.addEventListener('click', function (event) {
        var clicked_class = event.target.getAttribute("class");

        if (clicked_class == 'playButton') {
            mytrack = event.target.parentNode.parentNode.parentNode.children[0];
            currentTime = event.target.parentNode.children[2];
            progressBar = event.target.parentNode.parentNode.children[0].children[0];
            bar = event.target.parentNode.parentNode.children[0];
            bar.addEventListener('click', clikedBar, false);
            playOrPause();
        } 
        else if (clicked_class == 'muteButton') {
            mytrack = event.target.parentNode.parentNode.parentNode.children[0];
            muteOrUnmute();
        }
        if (clicked_class == 'defaultBar') {
            mytrack = event.target.parentNode.parentNode.children[0];
            currentTime = event.target.parentNode.children[1].children[2];
            progressBar = event.target.children[0];
            bar = event.target;
            clikedBar(event);
        }



        // functions start
        function playOrPause() {
            if (!mytrack.paused && !mytrack.ended) {
                mytrack.pause();
                event.target.style.backgroundImage = 'url(play.jpg)';
                window.clearInterval(updateTime);
            }
            else {
                mytrack.play();
                event.target.style.backgroundImage = 'url(pause.jpg)';
                updateTime = setInterval(update, 100);
            }
        }

        function muteOrUnmute() {
            if (mytrack.muted == true) {
                mytrack.muted = false;
                event.target.style.backgroundImage = 'url(speaker.png)';
            }
            else {
                mytrack.muted = true;
                event.target.style.backgroundImage = 'url(mute.png)';
            }
        }

        function update() {
            if (!mytrack.ended) {
                var playedMinutes = parseInt(mytrack.currentTime / 60);
                var playedSeconds = parseInt(mytrack.currentTime % 60);
                currentTime.innerHTML = playedMinutes + ':' + playedSeconds;

                var size = parseInt(mytrack.currentTime * barSize / mytrack.duration);
                progressBar.style.width = size + 'px';
                progressBar.style.transition = 10 + 'ms';
            }
            else {
                progressBar.style.width = 100 + '%';
                event.target.style.backgroundImage = 'url(reload.png)';
            }
        }

        function clikedBar(e) {
            if (!mytrack.ended) {
                var mouseX = e.pageX - bar.offsetLeft;
                var newtime = mouseX * mytrack.duration / barSize;
                mytrack.currentTime = newtime;
                progressBar.style.width = mouseX + 'px'
                update();
                console.log(e.pageX)
            }
        }



    });

}
var object_name2 = new PLayer("wrapper");

// var mytrack = document.getElementById('mytrack');
// var playButton = document.getElementById('playButton');
// var muteButton = document.getElementById('muteButton');

// var duration = document.getElementById('fullDuration');
// var currentTime = document.getElementById('currentTime');

// var barSize=640;
// var bar=document.getElementById('defaultBar');
// var progressBar=document.getElementById('progressBar'); 

// playButton.addEventListener('click', playOrPause, false);
// muteButton.addEventListener('click', muteOrUnmute, false);
// bar.addEventListener('click',clikedBar,false);

// mytrack.addEventListener("loadedmetadata", function () {
//     var minutes = parseInt(mytrack.duration / 60);
//     var seconds = parseInt(mytrack.duration % 60);
//     duration.innerHTML = minutes + ':' + seconds;
// });

// function playOrPause() {
//     if (!mytrack.paused && !mytrack.ended) {
//         mytrack.pause();
//         playButton.style.backgroundImage = 'url(play.jpg)';
//         window.clearInterval(updateTime);
//     }
//     else {
//         mytrack.play();
//         playButton.style.backgroundImage = 'url(pause.jpg)';
//         updateTime = setInterval(update, 100);
//     }
// }

// function muteOrUnmute() {
//     if (mytrack.muted == true) {
//         mytrack.muted = false;
//         muteButton.style.backgroundImage = 'url(speaker.png)';
//     }
//     else {
//         mytrack.muted = true;
//         muteButton.style.backgroundImage = 'url(mute.png)';
//     }
// }

// function update() {
//     if (!mytrack.ended) {
//         var playedMinutes = parseInt(mytrack.currentTime / 60);
//         var playedSeconds = parseInt(mytrack.currentTime % 60);
//         currentTime.innerHTML = playedMinutes + ':' + playedSeconds;

//         var size=parseInt(mytrack.currentTime*barSize/mytrack.duration);
//         progressBar.style.width=size+'px';
//         progressBar.style.transition=10+'ms';
//     }
//     else{
//         progressBar.style.width=100+'%';
//         playButton.style.backgroundImage = 'url(reload.png)';
//     }
// }



// function clikedBar(e){
//     if(!mytrack.ended){
//         var mouseX=e.pageX-bar.offsetLeft;
//         var newtime=mouseX*mytrack.duration/barSize;
//         mytrack.currentTime=newtime;
//         progressBar.style.width=mouseX+'px'
//         update();
//     }
// }
