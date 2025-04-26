const homeScreen = document.getElementById("homeScreen");
const viewerScreen = document.getElementById("viewerScreen");

function goToViewer() {
  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");
  drawSeats(currentSeat, currentGroup);
}

function goHome() {
  viewerScreen.classList.add("hidden");
  homeScreen.classList.remove("hidden");
}

const canvas = document.getElementById("seatCanvas");
const ctx = canvas.getContext("2d");
const minimap = document.getElementById("minimap");
const mctx = minimap.getContext("2d");
const output = document.getElementById("output");
const image = new Image();
image.src = "seatmap.png.jpg";

const zoomSize = 650;
const zoomScale = 0.7;

const seatData = {
"A": [
{
  "start": 5,
  "count": 3,
  "x": 1200,
  "y": 1961,
  "dy": 45.4
},
{
  "start": 8,
  "count": 9,
  "x": 1200,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 19,
  "count": 9,
  "x": 1200,
  "y": 1232,
  "dy": 45.4
},
{
  "start": 28,
  "count": 3,
  "x": 1200,
  "y": 749,
  "dy": 45.4
}
],
"B": [
{
  "start": 5,
  "count": 3,
  "x": 1251,
  "y": 1961,
  "dy": 45.4
},
{
  "start": 8,
  "count": 10,
  "x": 1251,
  "y": 1753,
  "dy": 45.4
},
{
  "start": 18,
  "count": 9,
  "x": 1251,
  "y": 1251,
  "dy": 45.4
},
{
  "start": 28,
  "count": 3,
  "x": 1251,
  "y": 748,
  "dy": 45.4
}
],
"C": [
{
  "start": 4,
  "count": 4,
  "x": 1304,
  "y": 2008,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1304,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 28,
  "count": 4,
  "x": 1304,
  "y": 752,
  "dy": 45.4
}
],
"D": [
{
  "start": 4,
  "count": 4,
  "x": 1355,
  "y": 2006,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1355,
  "y": 1755,
  "dy": 45.4
},
{
  "start": 28,
  "count": 4,
  "x": 1355,
  "y": 753,
  "dy": 45.4
}
],
"E": [
{
  "start": 4,
  "count": 4,
  "x": 1406,
  "y": 2007,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1406,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 28,
  "count": 4,
  "x": 1406,
  "y": 753,
  "dy": 45.4
}
],
"F": [
{
  "start": 3,
  "count": 5,
  "x": 1457,
  "y": 2051,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1457,
  "y": 1754,
  "dy": 45.4
},
{
  "start": 28,
  "count": 5,
  "x": 1457,
  "y": 750,
  "dy": 45.4
}
],
"G": [
{
  "start": 3,
  "count": 5,
  "x": 1511,
  "y": 2053,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1511,
  "y": 1733,
  "dy": 45.4
},
{
  "start": 28,
  "count": 5,
  "x": 1511,
  "y": 747,
  "dy": 45.4
}
],
"H": [
{
  "start": 2,
  "count": 6,
  "x": 1564,
  "y": 2099,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1562,
  "y": 1753,
  "dy": 45.4
},
{
  "start": 28,
  "count": 6,
  "x": 1562,
  "y": 750,
  "dy": 45.4
}
],
"I": [
{
  "start": 1,
  "count": 7,
  "x": 1613,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1613,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1613,
  "y": 750,
  "dy": 45.4
}
],
"J": [
{
  "start": 1,
  "count": 7,
  "x": 1666,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1666,
  "y": 1752,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1666,
  "y": 751,
  "dy": 45.4
}
],
"K": [
{
  "start": 1,
  "count": 7,
  "x": 1720,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 1720,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1717,
  "y": 750,
  "dy": 45.4
}
],
"L": [
{
  "start": 1,
  "count": 7,
  "x": 1771,
  "y": 2142,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1771,
  "y": 750,
  "dy": 45.4
}
],
"M": [
{
  "start": 1,
  "count": 7,
  "x": 1824,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1824,
  "y": 751,
  "dy": 45.4
}
],
"N": [
{
  "start": 1,
  "count": 7,
  "x": 1875,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 1875,
  "y": 1767,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 1873,
  "y": 1056,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1875,
  "y": 750,
  "dy": 45.4
}
],
"O": [
{
  "start": 1,
  "count": 7,
  "x": 1928,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 1924,
  "y": 1790,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 1926,
  "y": 1079,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1924,
  "y": 750,
  "dy": 45.4
}
],
"P": [
{
  "start": 1,
  "count": 7,
  "x": 1977,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 1977,
  "y": 1769,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 1977,
  "y": 1059,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 1977,
  "y": 750,
  "dy": 45.4
}
],
"Q": [
{
  "start": 1,
  "count": 7,
  "x": 2030,
  "y": 2145,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 2030,
  "y": 1789,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 2030,
  "y": 1079,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2030,
  "y": 751,
  "dy": 45.4
}
],
"R": [
{
  "start": 1,
  "count": 7,
  "x": 2084,
  "y": 2145,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 2081,
  "y": 1769,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 2079,
  "y": 1057,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2081,
  "y": 752,
  "dy": 45.4
}
],
"S": [
{
  "start": 1,
  "count": 7,
  "x": 2135,
  "y": 2145,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 2132,
  "y": 1793,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 2132,
  "y": 1080,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2132,
  "y": 752,
  "dy": 45.4
}
],
"T": [
{
  "start": 1,
  "count": 7,
  "x": 2186,
  "y": 2144,
  "dy": 45.4
},
{
  "start": 8,
  "count": 6,
  "x": 2186,
  "y": 1771,
  "dy": 45.4
},
{
  "start": 22,
  "count": 6,
  "x": 2186,
  "y": 1059,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2186,
  "y": 751,
  "dy": 45.4
}
],
"U": [
{
  "start": 1,
  "count": 7,
  "x": 2298,
  "y": 2144,
  "dy": 45.4
},
{
  "start": 8,
  "count": 10,
  "x": 2298,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 19,
  "count": 9,
  "x": 2298,
  "y": 1229,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2295,
  "y": 747,
  "dy": 45.4
}
],
"V": [
{
  "start": 1,
  "count": 7,
  "x": 2349,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 2349,
  "y": 1753,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2349,
  "y": 753,
  "dy": 45.4
}
],
"W": [
{
  "start": 1,
  "count": 7,
  "x": 2402,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 10,
  "x": 2402,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 19,
  "count": 9,
  "x": 2402,
  "y": 1229,
  "dy": 45.4
},

{
  "start": 28,
  "count": 7,
  "x": 2400,
  "y": 750,
  "dy": 45.4
}
],
"X": [
{
  "start": 1,
  "count": 7,
  "x": 2451,
  "y": 2145,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 2451,
  "y": 1753,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2451,
  "y": 750,
  "dy": 45.4
}
],
"Y": [
{
  "start": 1,
  "count": 7,
  "x": 2506,
  "y": 2142,
  "dy": 45.4
},
{
  "start": 8,
  "count": 10,
  "x": 2502,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 19,
  "count": 9,
  "x": 2502,
  "y": 1229,
  "dy": 45.4
},

{
  "start": 28,
  "count": 7,
  "x": 2502,
  "y": 748,
  "dy": 45.4
}
],
"Z": [
{
  "start": 1,
  "count": 7,
  "x": 2555,
  "y": 2140,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 2555,
  "y": 1752,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2555,
  "y": 748,
  "dy": 45.4
}
],
"AA": [
{
  "start": 1,
  "count": 7,
  "x": 2608,
  "y": 2142,
  "dy": 45.4
},
{
  "start": 8,
  "count": 10,
  "x": 2608,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 19,
  "count": 9,
  "x": 2608,
  "y": 1229,
  "dy": 45.4
},

{
  "start": 28,
  "count": 7,
  "x": 2608,
  "y": 749,
  "dy": 45.4
}
],
"AB": [
{
  "start": 1,
  "count": 7,
  "x": 2659,
  "y": 2146,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 2659,
  "y": 1753,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2659,
  "y": 748,
  "dy": 45.4
}
],
"AC": [
{
  "start": 1,
  "count": 7,
  "x": 2713,
  "y": 2145,
  "dy": 45.4
},
{
  "start": 8,
  "count": 10,
  "x": 2713,
  "y": 1730,
  "dy": 45.4
},
{
  "start": 19,
  "count": 9,
  "x": 2713,
  "y": 1229,
  "dy": 45.4
},

{
  "start": 28,
  "count": 7,
  "x": 2710,
  "y": 750,
  "dy": 45.4
}
],
"AD": [
{
  "start": 1,
  "count": 7,
  "x": 2764,
  "y": 2143,
  "dy": 45.4
},
{
  "start": 8,
  "count": 20,
  "x": 2764,
  "y": 1755,
  "dy": 45.4
},
{
  "start": 28,
  "count": 7,
  "x": 2764,
  "y": 750,
  "dy": 45.4
}
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
        ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
        if (label === mySeat) {
          ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
          ctx.fill();
        } else if (groupSeats.includes(label)) {
          ctx.fillStyle = "rgba(0, 255, 255, 0.3)";
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          ctx.fill();
        }
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