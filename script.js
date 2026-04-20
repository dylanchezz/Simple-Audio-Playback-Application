const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const speedSelect = document.getElementById('speedSelect');

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        playPauseBtn.style.backgroundColor = '#61dafb';
        playPauseBtn.style.color = '#1e222a';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        playPauseBtn.style.backgroundColor = 'transparent';
        playPauseBtn.style.color = '#fff';
    }
}
playPauseBtn.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    if (audio.volume > 0 && audio.muted) {
        toggleMute();
    }
});

function toggleMute() {
    audio.muted = !audio.muted;
    if (audio.muted) {
        muteBtn.textContent = 'Unmute';
        muteBtn.style.borderColor = '#ff4d4d'; 
    } else {
        muteBtn.textContent = 'Mute';
        muteBtn.style.borderColor = '#61dafb';
    }
}
muteBtn.addEventListener('click', toggleMute);

speedSelect.addEventListener('change', (e) => {
    audio.playbackRate = parseFloat(e.target.value);
});

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// FIX: This function handles the duration once the browser calculates it
function updateDuration() {
    if (!isNaN(audio.duration) && audio.duration !== Infinity) {
        durationDisplay.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
    }
}

// Listen for durationchange (the most reliable event for MP3 files)
audio.addEventListener('durationchange', updateDuration);
audio.addEventListener('loadedmetadata', updateDuration);

audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        progressBar.value = audio.currentTime;
    }
});

progressBar.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); 
        togglePlay();
    }
    if (e.key.toLowerCase() === 'm') {
        toggleMute();
    }
});