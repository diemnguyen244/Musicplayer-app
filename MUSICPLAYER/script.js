let musicContainer = document.getElementById("music-container");
let playBtn = document.getElementById("play");
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let audio = document.getElementById("audio");
let progress = document.getElementById("progress");
let progressContainer = document.getElementById("progress-container");
let title = document.getElementById("title");
let cover = document.getElementById("cover");

//song
let songs = ["How You Like That", "Kill This Love", "SOLO", "WHISTLE"];
let songIndex = 0;

//call
loadSong(songs[songIndex]);

//load song
function loadSong(song) {
  //   console.log(song);
  title.innerText = song;
  cover.src = `./image/${song}.jpeg`;
  audio.src = `./music/${song}.mp3`;
}

//play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");
  audio.play();
}

//pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");
  audio.pause();
}
// pauseSong();

//prev song

function prevSong(event) {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//next song
function nextSong(event) {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//update progress
function updateProgress(event) {
  console.log(event);
  let currentTime = event.srcElement.currentTime;
  let duration = event.srcElement.duration;
  //   console.log(currentTime, duration);
  let progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//set Progress
function setProgress(event) {
  let width = this.clientWidth;
  //   console.log(width);
  console.log(event);
  let clickX = event.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//add event
playBtn.addEventListener("click", function () {
  let isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

window.addEventListener("keydown", function (event) {
  let isPlaying = musicContainer.classList.contains("play");

  if (event.code === "Space") {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
  console.log(event);
});

//change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("end", nextSong);

progressContainer.addEventListener("click", setProgress);
