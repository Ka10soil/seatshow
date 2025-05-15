function checkPassword() {
  const input = document.getElementById('authInput').value;
  const message = document.getElementById('authMessage');
  const correct = "IS2025"; // 任意のパスワード

  if (input === correct) {
    message.textContent = "";
    window.location.href = "indextrue.html";
  } else {
    message.textContent = "パスワードが違います";
    showErrorShake();
  }
}

function showErrorShake() {
  const auth = document.getElementById("authScreen");
  auth.animate([
    { transform: "translateX(0)" },
    { transform: "translateX(-10px)" },
    { transform: "translateX(10px)" },
    { transform: "translateX(0)" }
  ], {
    duration: 300,
    iterations: 1
  });
}

