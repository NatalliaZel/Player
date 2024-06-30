const audio = document.querySelector(".audio");
const player = document.querySelector(".player");
const playBtn = document.querySelector(".controls-play-pause");
const controlsPlay = document.querySelector(".controls-play");
const controlsPause = document.querySelector(".controls-pause");
const prevBtn = document.querySelector(".controls-prev");
const nextBtn = document.querySelector(".controls-next");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress-bar");
const background = document.querySelector(".background");
const cover = document.querySelector(".player-img");
const imgSrc = document.querySelector(".img-src");
const titleArtist = document.querySelector(".controls-name");
const titleSong = document.querySelector(".controls-song");
const progressDuration = document.querySelector(".progress-duration");
const progressCurrentTime = document.querySelector(".progress-currentime");
const volumeSlider = document.querySelector(".volume-control-slider");
const volumeItem = document.querySelector(".controls-item-volume");
const volumeOff = document.querySelectorAll(".volume-off");
const volumOffMain = document.querySelector(".volum-off-main");
const volumeWrap = document.querySelector(".progress-volume-wrap");

// Titles of artists and songs
const artists = [
  "Scorpions",
  "Lenny Kravitz",
  "The Beatles",
  "A-ha",
  "Image Dragons",
];

const songs = [
  "Still loving you",
  "I belong to you",
  "Yesterday",
  "Summer moved on",
  "Believer",
];

// Default song
let songIndex = 0;

//Init
function loadSong(artist, song) {
  progress.value = 0;
  /*progressDuration.textContent = "00:00";*/
  /*progressCurrentTime.textContent = "00:00";*/
  titleArtist.innerHTML = artist;
  titleSong.innerHTML = song;
  audio.src = `assets/audio/${song}.mp3`;

  audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    console.log(audio.duration);
    console.log(changeTimeFormat(audio.duration));
    progressCurrentTime.textContent = changeTimeFormat(audio.duration);
  });

  background.style.backgroundImage = `url(assets/images/cover${
    songIndex + 1
  }.jpeg)`;
  cover.src = `assets/images/cover${songIndex + 1}.jpeg`;
}

loadSong(artists[songIndex], songs[songIndex]);

// Play
function playSong() {
  player.classList.add("play");
  cover.classList.add("active");
  controlsPlay.classList.add("controls-disactive");
  controlsPause.classList.add("controls-active");
  audio.play();
}

// Pause
function pauseSong() {
  player.classList.remove("play");
  cover.classList.remove("active");
  controlsPlay.classList.remove("controls-disactive");
  controlsPause.classList.remove("controls-active");
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(artists[songIndex], songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(artists[songIndex], songs[songIndex]);
  playSong();
}

prevBtn.addEventListener("click", prevSong);

// Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  progressDuration.innerHTML = changeTimeFormat(currentTime);
}

audio.addEventListener("timeupdate", updateProgress);

setInterval(() => {
  progress.value = audio.currentTime;
}, 500);

// Set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

// Set song durtion format
function changeTimeFormat(time) {
  let hours = Math.floor(time / 60);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = Math.floor(time % 60);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Autoplay
audio.addEventListener("ended", nextSong);

// Volume

function showVolumeSlider() {
  volumeSlider.classList.add("volume-control-slider-active");
}

function hideVolumeSlider() {
  volumeSlider.classList.remove("volume-control-slider-active");
}

/*volumeWrap.addEventListener("click", showVolumeSlider);*/

document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    !target.classList.contains("controls-item-volume") &&
    !target.classList.contains("volume-control-slider")
  ) {
    hideVolumeSlider();
  }
});

// Set volume
function setVolume() {
  let volume = this.value;
  audio.volume = volume / 100;
}

volumeSlider.oninput = setVolume;

volumeSlider.addEventListener("input", () => {
  if (audio.muted) {
    audio.muted = false;
    makeActive();
  }
});

// Set mute off / mute on

function makeDisactive() {
  volumeItem.classList.add("volume-off-active");
}

function makeActive() {
  volumeItem.classList.remove("volume-off-active");
}

volumeWrap.addEventListener("click", () => {
  if (volumeSlider.classList.contains("volume-control-slider-active")) {
    audio.muted = !audio.muted;
    if (audio.muted) {
      makeDisactive();
    } else {
      makeActive();
    }
  } else {
    volumeSlider.classList.add("volume-control-slider-active");
  }
});
