// 正しいパスワード
const correctPassword = "IS2025"; // ここに設定したいパスワードを入れる

// フォームが送信されたときの処理
document.getElementById("password-form").addEventListener("submit", function(event) {
  event.preventDefault(); // フォームのデフォルト動作（送信）を防ぐ
  
  // 入力されたパスワードを取得
  const enteredPassword = document.getElementById("password").value;

  // パスワードが正しいかチェック
  if (enteredPassword === correctPassword) {
    alert("正しいパスワードです！アクセスできます。");
    window.location.href = "indextrue.html";
  } else {
    alert("パスワードが間違っています。再度試してください。");
  }
});
