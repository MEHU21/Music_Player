console.log("Welcome to GrooveHaven");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let repeatButton = document.getElementById('repeat');
let shuffleButton = document.getElementById('shuffle');
let searchInput = document.getElementById('search');

let isShuffling = false;
let isReplaying = false;

let songs = [
    { songName: "Golden hour", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "Loosu Penne", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Vaarayo Vaarayo", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Anbe en Anbe", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (isShuffling) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        if (songIndex >= songs.length - 1) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (isShuffling) {
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        if (songIndex <= 0) {
            songIndex = 0;
        } else {
            songIndex -= 1;
        }
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Autoplay next song
audioElement.addEventListener('ended', () => {
    if (isReplaying) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        if (isShuffling) {
            songIndex = Math.floor(Math.random() * songs.length);
        } else {
            if (songIndex >= songs.length - 1) {
                songIndex = 0;
            } else {
                songIndex += 1;
            }
        }
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
});

// Repeat button
repeatButton.addEventListener('click', () => {
    isReplaying = !isReplaying;
    repeatButton.classList.toggle('active', isReplaying);
});

// Shuffle button
shuffleButton.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle('active', isShuffling);
});

// Search functionality
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    songItems.forEach((item, index) => {
        const songName = songs[index].songName.toLowerCase();
        if (songName.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});
