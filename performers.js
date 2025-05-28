const homeScreen = document.getElementById("homeScreen");





function goHome() {
  window.location.href = "indextrue.html";
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

function toggleGroup(header) {
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.arrow');
  const isOpen = body.style.display === 'block';

  body.style.display = isOpen ? 'none' : 'block';
  header.classList.toggle('open', !isOpen);
}