const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "song1.mp3",
        cover: "cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "song2.mp3",
        cover: "cover2.jpg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "song3.mp3",
        cover: "cover3.jpg"
    }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const muteBtn = document.getElementById("mute");

let songIndex = 0;
let isPlaying = false;
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

loadSong(songs[songIndex]);

function playSong() {
    isPlaying = true;
    audio.play();

    playBtn.innerHTML = '<i class="fas fa-pause"></i>';

    cover.style.animationPlayState = "running";
}

function pauseSong() {
    isPlaying = false;
    audio.pause();

    playBtn.innerHTML = '<i class="fas fa-play"></i>';

    cover.style.animationPlayState = "paused";
}

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("ended", nextSong);
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
}

audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration);
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = Math.floor(audio.currentTime);
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});
volume.addEventListener("input", () => {
    audio.volume = volume.value;

    if (audio.volume == 0) {
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});

muteBtn.addEventListener("click", () => {

    if (audio.muted) {
        audio.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audio.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }

});
const favoriteBtn = document.getElementById("favorite");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

let isShuffle = false;
let isRepeat = false;
let isFavorite = false;

// Favorite
favoriteBtn.addEventListener("click", () => {
    isFavorite = !isFavorite;

    if (isFavorite) {
        favoriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        favoriteBtn.style.color = "red";
    } else {
        favoriteBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        favoriteBtn.style.color = "#fff";
    }
});

// Shuffle
shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffleBtn.style.color = "#00ff99";
    } else {
        shuffleBtn.style.color = "#fff";
    }
});

// Repeat
repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;

    if (isRepeat) {
        repeatBtn.style.color = "#00ff99";
    } else {
        repeatBtn.style.color = "#fff";
    }
});

// Song End
audio.addEventListener("ended", () => {

    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    }
    else if (isShuffle) {
        songIndex = Math.floor(Math.random() * songs.length);
        loadSong(songs[songIndex]);
        playSong();
    }
    else {
        nextSong();
    }

});
