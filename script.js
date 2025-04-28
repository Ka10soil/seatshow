const homeScreen = document.getElementById("homeScreen");
const viewerScreen = document.getElementById("viewerScreen");
const attentionScreen = document.getElementById("attentionScreen");
const formScreen = document.getElementById("formScreen");

function goToViewer() {
  showScreenWithGlitch('viewerScreen');
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('formScreen').style.display = 'none';
    document.getElementById('attentionScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");
  drawSeats(currentSeat, currentGroup);
}

function goToAttentionScreen() {
  showScreenWithGlitch('attentionScreen')
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('formScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'none';
    document.getElementById('attentionScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");
  drawSeats(currentSeat, currentGroup);
}

function goToformScreen() {
  showScreenWithGlitch('formScreen')
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('attentionScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'none';
    document.getElementById('formScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");
  drawSeats(currentSeat, currentGroup);
}


function goHome() {
  showScreenWithGlitch('homeScreen')
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('formScreen').style.display = 'none';
    document.getElementById('attentionScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'none';
    document.getElementById('homeScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  viewerScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
}

const blackout = document.getElementById('blackout');
function showScreenWithGlitch(screenId) {
  const blackout = document.getElementById('blackout');
  const glitch = document.getElementById('glitch');

  // グリッチ発動
  glitch.style.opacity = 1;
  glitch.style.animation = 'glitchEffect 0.6s ease-in-out';

  setTimeout(() => {
    blackout.style.opacity = 1;
  }, 300);

  setTimeout(() => {
    // ここで画面切り替え！！
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');

    // blackoutとglitchをリセット
    glitch.style.opacity = 0;
    glitch.style.animation = 'none';
    blackout.style.opacity = 0;
  }, 800);
}


const links = document.querySelectorAll('.fade-link');


links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    blackout.style.opacity = 1;

    blackout.style.pointerEvents = 'auto';

    setTimeout(() => {
      window.location.href = link.href;
    }, 500);
  });
});

const canvas = document.getElementById("seatCanvas");
const ctx = canvas.getContext("2d");
const minimap = document.getElementById("minimap");
const mctx = minimap.getContext("2d");
const output = document.getElementById("output");
const image = new Image();
image.src = "seatmap.png.jpg";

const zoomSize = 550;
const zoomScale = 0.55;

const ax = 1200
const seatData = {
"A": [
    { "start": 5, "count": 3, "y": 1961, "dy": 45.4, "x": 1200.0 },
    { "start": 8, "count": 9, "y": 1730, "dy": 45.4, "x": 1200.0 },
    { "start": 19, "count": 9, "y": 1232, "dy": 45.4, "x": 1200.0 },
    { "start": 28, "count": 3, "y": 749, "dy": 45.4, "x": 1200.0 }
  ],
  "B": [
    { "start": 5, "count": 3, "y": 1961, "dy": 45.4, "x": 1251.9 },
    { "start": 8, "count": 10, "y": 1753, "dy": 45.4, "x": 1251.9 },
    { "start": 18, "count": 9, "y": 1251, "dy": 45.4, "x": 1251.9 },
    { "start": 28, "count": 3, "y": 749, "dy": 45.4, "x": 1251.9 }
  ],
  "C": [
    { "start": 4, "count": 4, "y": 2008, "dy": 45.4, "x": 1303.8 },
    { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1303.8 },
    { "start": 28, "count": 4, "y": 749, "dy": 45.4, "x": 1303.8 }
  ],
  "D": [
    { "start": 4, "count": 4, "y": 2006, "dy": 45.4, "x": 1355.7 },
    { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1355.7 },
    { "start": 28, "count": 4, "y": 749, "dy": 45.4, "x": 1355.7 }
  ],
  "E": [
    { "start": 4, "count": 4, "y": 2007, "dy": 45.4, "x": 1407.6 },
    { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1407.6 },
    { "start": 28, "count": 4, "y": 749, "dy": 45.4, "x": 1407.6 }
  ],
  "F": [
    { "start": 3, "count": 5, "y": 2051, "dy": 45.4, "x": 1459.5 },
    { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1459.5 },
    { "start": 28, "count": 5, "y": 749, "dy": 45.4, "x": 1459.5 }
  ],
  "G": [
    { "start": 3, "count": 5, "y": 2053, "dy": 45.4, "x": 1511.4 },
    { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1511.4 },
    { "start": 28, "count": 5, "y": 749, "dy": 45.4, "x": 1511.4 }
  ],
  "H": [
    { "start": 2, "count": 6, "y": 2099, "dy": 45.4, "x": 1563.3 },
    { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1563.3 },
    { "start": 28, "count": 6, "y": 749, "dy": 45.4, "x": 1563.3 }
  ],
  "I": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1615.2 },
    { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1615.2 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1615.2 }
  ],
  "J": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1667.1 },
    { "start": 8, "count": 20, "y": 1753, "dy": 45.4, "x": 1667.1 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1667.1 }
  ],
  "K": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1719.0 },
    { "start": 8, "count": 20, "y": 1730, "dy": 45.4, "x": 1719.0 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1719.0 }
  ],
  "L": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1770.9 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1770.9 }
  ],
  "M": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1822.8 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1822.8 }
  ],
  "N": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1874.7 },
    { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 1874.7 },
    { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 1874.7 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1874.7 }
  ],
  "O": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1926.6 },
    { "start": 8, "count": 6, "y": 1790, "dy": 45.4, "x": 1926.6 },
    { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 1926.6 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1926.6 }
  ],
  "P": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 1978.5 },
    { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 1978.5 },
    { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 1978.5 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 1978.5 }
  ],
  "Q": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2030.4 },
    { "start": 8, "count": 6, "y": 1790, "dy": 45.4, "x": 2030.4 },
    { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 2030.4 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2030.4 }
  ],
  "R": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2082.3 },
    { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 2082.3 },
    { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 2082.3 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2082.3 }
  ],
  "S": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2134.2 },
    { "start": 8, "count": 6, "y": 1790, "dy": 45.4, "x": 2134.2 },
    { "start": 22, "count": 6, "y": 1079, "dy": 45.4, "x": 2134.2 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2134.2 }
  ],
  "T": [
    { "start": 1, "count": 7, "y": 2143, "dy": 45.4, "x": 2186.1 },
    { "start": 8, "count": 6, "y": 1768, "dy": 45.4, "x": 2186.1 },
    { "start": 22, "count": 6, "y": 1056, "dy": 45.4, "x": 2186.1 },
    { "start": 28, "count": 7, "y": 749, "dy": 45.4, "x": 2186.1 }
  ],
  "U": [
  { "start": 1, "count": 7, "x": 2296.5, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2296.5, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2296.5, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2296.5, "y": 749,  "dy": 45.4 }
],
"V": [
  { "start": 1, "count": 7, "x": 2348.4, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2348.4, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2348.4, "y": 749,  "dy": 45.4 }
],
"W": [
  { "start": 1, "count": 7, "x": 2400.3, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2400.3, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2400.3, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2400.3, "y": 749,  "dy": 45.4 }
],
"X": [
  { "start": 1, "count": 7, "x": 2452.2, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2452.2, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2452.2, "y": 749,  "dy": 45.4 }
],
"Y": [
  { "start": 1, "count": 7, "x": 2504.1, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2504.1, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2504.1, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2504.1, "y": 749,  "dy": 45.4 }
],
"Z": [
  { "start": 1, "count": 7, "x": 2556.0, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2556.0, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2556.0, "y": 749,  "dy": 45.4 }
],
"AA": [
  { "start": 1, "count": 7, "x": 2607.9, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2607.9, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2607.9, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2607.9, "y": 749,  "dy": 45.4 }
],
"AB": [
  { "start": 1, "count": 7, "x": 2659.8, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2659.8, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2659.8, "y": 749,  "dy": 45.4 }
],
"AC": [
  { "start": 1, "count": 7, "x": 2711.7, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 10, "x": 2711.7, "y": 1730, "dy": 45.4 },
  { "start": 19, "count": 9, "x": 2711.7, "y": 1229, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2711.7, "y": 749,  "dy": 45.4 }
],
"AD": [
  { "start": 1, "count": 7, "x": 2763.6, "y": 2143, "dy": 45.4 },
  { "start": 8, "count": 20, "x": 2763.6, "y": 1753, "dy": 45.4 },
  { "start": 28, "count": 7, "x": 2763.6, "y": 749,  "dy": 45.4 }
]
};


const studentToSeat = {
  "123456": "A10",
  "123457": "A11",
  "123458": "B10"
};

const groups = [["123456", "123457", "123458"]];

let highlightBox = null;
let zoomedIn = true;
let fullImageLoaded = false;
let currentSeat = null;
let currentGroup = [];

image.onload = () => {
  fullImageLoaded = true;
  minimap.width = 300;
  minimap.height = image.height / image.width * minimap.width;
  drawSeats();
};

minimap.addEventListener("click", () => {
  zoomedIn = !zoomedIn;
  drawSeats(currentSeat, currentGroup);
});

function drawSeats(mySeat = null, groupSeats = []) {
  if (!fullImageLoaded) return;

  let highlight = null;
  for (const col in seatData) {
    for (const segment of seatData[col]) {
      for (let i = 0; i < segment.count; i++) {
        const seatNum = segment.start + i;
        const label = `${col}${String(seatNum).padStart(2, '0')}`;
        if (label === mySeat) {
          highlight = { x: segment.x, y: segment.y - segment.dy * i };
        }
      }
    }
  }

  highlightBox = highlight;
  const scale = (zoomedIn && highlightBox) ? zoomScale : 1;

  if (zoomedIn && highlightBox) {
    const sx = Math.max(0, highlightBox.x - zoomSize / 2);
    const sy = Math.max(0, highlightBox.y - zoomSize / 2);
    canvas.width = zoomSize * zoomScale;
    canvas.height = zoomSize * zoomScale;
    ctx.drawImage(image, sx, sy, zoomSize, zoomSize, 0, 0, canvas.width, canvas.height);
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }

  
  for (const col in seatData) {
    for (const segment of seatData[col]) {
      for (let i = 0; i < segment.count; i++) {
        const seatNum = segment.start + i;
        const label = `${col}${String(seatNum).padStart(2, '0')}`;
        let x = segment.x;
        let y = segment.y - segment.dy * i;

        if (zoomedIn && highlightBox) {
          x = (x - highlightBox.x + zoomSize / 2) * zoomScale;
          y = (y - highlightBox.y + zoomSize / 2) * zoomScale;
        }

        ctx.beginPath();
        const size = 35 * scale; // 直径と同じサイズ

        
        

        if (label === mySeat) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(255, 0, 0, 0.8)";
            ctx.strokeStyle = "rgb(242, 255, 0, 0.6)";
            ctx.lineWidth = 4;
            ctx.strokeRect(x - size/2, y - size/2, size, size);
          } else {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
        }

        ctx.fillStyle = groupSeats.includes(label) 
        ? "rgba(100, 200, 255, 0.3)"
        : (label === mySeat ? "rgba(190, 70, 255, 0.3)" : "rgba(22, 22, 62, 0.4)");

        ctx.fillRect(x - size/2, y - size/2, size, size);
      }
    }
  }

  const s = minimap.width / image.width;
  mctx.clearRect(0, 0, minimap.width, minimap.height);
  mctx.drawImage(image, 0, 0, minimap.width, minimap.height);
  if (highlightBox) {
    mctx.strokeStyle = "red";
    mctx.lineWidth = 1;
    mctx.strokeRect(
      (highlightBox.x - zoomSize / 2) * s,
      (highlightBox.y - zoomSize / 2) * s,
      zoomSize * s,
      zoomSize * s
    );
  }
}

function highlightGroup() {
  const inputId = document.getElementById("studentId").value.trim();
  const mySeat = studentToSeat[inputId];
  if (!mySeat) {
    currentSeat = null;
    currentGroup = [];
    output.innerHTML = "<strong>エラー:</strong> HRNOが登録されていません。";
    drawSeats();
    return;
  }

  zoomedIn = true;
  const myGroup = groups.find(g => g.includes(inputId)) || [];
  const groupInfo = myGroup.map(id => ({ id, seat: studentToSeat[id] || "-" }));

  currentSeat = mySeat;
  currentGroup = groupInfo.map(g => g.seat).filter(s => s !== mySeat);

  drawSeats(currentSeat, currentGroup);

  output.innerHTML = `
    <strong>あなたの席:</strong> ${mySeat}<br>
    <strong>グループのメンバーの席:</strong><br>
    <ul>
      ${groupInfo.map(g => `<li>${g.id} → ${g.seat}${g.id === inputId ? "（あなた）" : ""}</li>`).join("")}
    </ul>
  `;
}


let button = document.querySelector('.button');
let buttonText = document.querySelector('.tick');

const tickMark = "<svg width=\"58\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";

buttonText.innerHTML = "Submit";

button.addEventListener('click', function() {

  if (buttonText.innerHTML !== "Submit") {
    buttonText.innerHTML = "Submit";
  } else if (buttonText.innerHTML === "Submit") {
    buttonText.innerHTML = tickMark;
  }
  this.classList.toggle('button__circle');
});