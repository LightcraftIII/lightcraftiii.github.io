// Custom cursor movement
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Bring window to front z-index helper
let topZ = 100;
function getNextZIndex() {
  return ++topZ;
}

// Open window on icon click
document.querySelectorAll('.icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const winId = icon.dataset.window;
    if (!winId) return;
    const win = document.getElementById(winId);
    if (win) {
      win.style.display = 'block';
      // Add show class for fade-in & scale effect
      setTimeout(() => win.classList.add('show'), 10);
      win.style.zIndex = getNextZIndex();
    }
  });
});

// Close button handler
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const win = btn.closest('.window');
    if (!win) return;
    // Fade out before hiding
    win.classList.remove('show');
    setTimeout(() => {
      win.style.display = 'none';
    }, 200);
  });
});

// Drag windows by title bar
document.querySelectorAll('.window').forEach(windowEl => {
  const titleBar = windowEl.querySelector('.title-bar');
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    windowEl.style.zIndex = getNextZIndex(); // bring to front
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    windowEl.style.left = (e.clientX - offsetX) + 'px';
    windowEl.style.top  = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Focus window on click
  windowEl.addEventListener('mousedown', () => {
    windowEl.style.zIndex = getNextZIndex();
  });
});

// Sticky Note: load/save localStorage with debounce
const stickyText = document.getElementById('sticky-text');
window.addEventListener('load', () => {
  const savedNote = localStorage.getItem('stickyNoteContent');
  if (savedNote) stickyText.value = savedNote;
});

let saveTimeout;
stickyText.addEventListener('input', () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    localStorage.setItem('stickyNoteContent', stickyText.value);
  }, 500);
});

// Music Player
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('btn-play');
const pauseBtn = document.getElementById('btn-pause');
const stopBtn = document.getElementById('btn-stop');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const playlistEl = document.getElementById('playlist');
const vinyl = document.getElementById('vinyl');

const tracks = [
  { title: 'Nigga', src: 'music/Gangsta Rap - Nigga Nigga Nigga.mp3' },
  { title: 'Big Poppa', src: 'music/Big Poppa (2007 Remaster) (128kbit_AAC).m4a' },
  { title: 'Nightwalk', src: 'music/nightwalk.mp3' }
];

let currentTrackIndex = 0;

// Populate playlist UI
tracks.forEach((track, i) => {
  const li = document.createElement('li');
  li.textContent = track.title;
  li.tabIndex = 0;
  li.addEventListener('click', () => {
    loadTrack(i);
    playAudio();
  });
  li.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      loadTrack(i);
      playAudio();
    }
  });
  playlistEl.appendChild(li);
});

function loadTrack(i) {
  currentTrackIndex = i;
  audio.src = tracks[i].src;
  updateActivePlaylistItem();
}

function updateActivePlaylistItem() {
  [...playlistEl.children].forEach((li, i) => {
    li.classList.toggle('active', i === currentTrackIndex);
  });
}

function playAudio() {
  audio.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = '';
}

function pauseAudio() {
  audio.pause();
  playBtn.style.display = '';
  pauseBtn.style.display = 'none';
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  playBtn.style.display = '';
  pauseBtn.style.display = 'none';
}

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
stopBtn.addEventListener('click', stopAudio);

prevBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playAudio();
});

nextBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playAudio();
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

function updateVinylSpin() {
  if (!audio.paused && !audio.ended) {
    vinyl.classList.add('spinning');
  } else {
    vinyl.classList.remove('spinning');
  }
}

audio.addEventListener('play', updateVinylSpin);
audio.addEventListener('pause', updateVinylSpin);
audio.addEventListener('ended', updateVinylSpin);
updateVinylSpin();

loadTrack(0);

// Snake Game
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const tileSize = 16;
const tiles = canvas.width / tileSize;

let snake, food, dx, dy, gameInterval;

function startSnake() {
  snake = [{ x: 8, y: 8 }];
  dx = 1;
  dy = 0;
  spawnFood();
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 120);
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * tiles),
    y: Math.floor(Math.random() * tiles)
  };
}

function gameLoop() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wall collision resets game
  if (head.x < 0 || head.y < 0 || head.x >= tiles || head.y >= tiles) {
    return startSnake();
  }

  // Self collision resets game
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    return startSnake();
  }

  snake.unshift(head);

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    spawnFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function drawGame() {
  ctx.fillStyle = '#fff0f9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = '#ff00aa';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Draw snake
  ctx.fillStyle = '#330066';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': if (dy === 0) { dx = 0; dy = -1; } break;
    case 'ArrowDown': if (dy === 0) { dx = 0; dy = 1; } break;
    case 'ArrowLeft': if (dx === 0) { dx = -1; dy = 0; } break;
    case 'ArrowRight': if (dx === 0) { dx = 1; dy = 0; } break;
  }
});

// Start snake when snake window opens
document.querySelector('[data-window="win-snake"]').addEventListener('click', () => {
  startSnake();
});