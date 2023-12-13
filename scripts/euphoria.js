// constants
let audio2 = document.getElementById('audio2');
let lyric2 = document.querySelector('.lyric2');
let play2 = document.querySelector('.play2');
let time2 = document.querySelector('.time2');
let progresses2 = Array.from(document.querySelectorAll('.progress2'));

// add events
play2.addEventListener('click', e => {
  audio2.play();
  play2.style.opacity = '0';
  play2.style.pointerEvents = 'none';
});

audio2.addEventListener('playing', start2);

async function loadFile2(fileName) {
  try {
    const response = await fetch(fileName);
    const data = await response.text();
    const lines = data.trim().split("\n");
    return lines;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function start2(e) {
  let index = 1;
  const linesContainer = document.querySelector('.lyric2');
  const lrcFilePath = linesContainer.dataset.lrcFile; // Assuming you have a data attribute storing the file path

  const lines = await loadFile2(lrcFilePath);

  lines.forEach(line => {
    line = line.trim();
    let minute = parseInt(line.substr(1, 2));
    let second = parseInt(line.substr(4, 5));
    if (isNaN(minute) || isNaN(second)) return;

    let text = line.substr(line.indexOf(']') + 1, line.length).trim();
    setTimeout(() => {
      lyric2.style.transform = `rotateZ(${index++ * 360}deg)`;
      lyric2.innerText = text;
    }, (second + (minute * 60)) * 1000);
  });
}

setInterval(() => {
  let current = Math.floor(audio2.currentTime); // time of the current playing music
  let minute = Math.floor(current / 60);
  let second = current % 60;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  time2.innerText = `${minute}:${second}`;
  progresses2.forEach(progress => {
    progress.style.strokeDashoffset = 1414 - (1414 * ((current / audio2.duration) * 100)) / 100;
  });
}, 1000); // this function runs every second
