const homeScreen = document.getElementById("homeScreen");
const viewerScreen = document.getElementById("viewerScreen");
const attentionScreen = document.getElementById("attentionScreen");



const noticeScreen = document.getElementById("noticeScreen");
const consentModal = document.getElementById("consentModal");

window.addEventListener("resize", () => {
  redrawAll(); // これで描き直すだけにする
});

function goToViewer() {
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
    window.location.href = "viewer.html";
  }, 400);
  
}


function goToAttentionScreen() {
  showScreenWithGlitch('attentionScreen')
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';

    document.getElementById('viewerScreen').style.display = 'none';
    document.getElementById('consentModal').style.display = 'none';
    document.getElementById('performerScreen').style.display = 'none';


    document.getElementById('attentionScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  homeScreen.classList.add("hidden");
  attentionScreen.classList.remove("hidden");

}

function goToPerformerScreen() {
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
    window.location.href = "performers.html";
  }, 400);
  

}

function goTonoticeScreen() {
  showScreenWithGlitch('consentModal')
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('attentionScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'none';
    document.getElementById('consentModal').style.display = 'flex';
  

    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  homeScreen.classList.add("hidden");
  viewerScreen.classList.remove("hidden");

}


function goHome() {
  showScreenWithGlitch('homeScreen')
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {

    document.getElementById('attentionScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'none';
    document.getElementById('consentModal').style.display = 'none';
    document.getElementById('performerScreen').style.display = 'none';

 
    document.getElementById('homeScreen').style.display = 'block';
    blackout.style.opacity = 0;
    blackout.style.pointerEvents = 'none';
  }, 500);

  viewerScreen.classList.add("hidden");
  attentionScreen.classList.add("hidden");
  performerScreen.classList.add("hidden");
  consentModal.classList.add("hidden");


  homeScreen.classList.remove("hidden");
}

function goForm() {
  blackout.style.pointerEvents = 'auto';
  blackout.style.opacity = 1;
  setTimeout(() => {
    document.getElementById('homeScreen').style.display = 'none';
    document.getElementById('attentionScreen').style.display = 'none';
    document.getElementById('viewerScreen').style.display = 'none';

    document.getElementById('consentModal').style.display = 'block';
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

function proceedIfAgreed() {
  const checkbox = document.getElementById('consentCheckbox');
  if (checkbox.checked) {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSeyNcvT0H7vYAGnbPIsaM_NsKXA1EugeslVmHinKDx7BTB76w/viewform?embedded=true" )
    goHome();
  } else {
    alert('確認が完了していません');
  }
}


