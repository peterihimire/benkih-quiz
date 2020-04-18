const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const mostRecentScore2 = localStorage.getItem("mostRecentScore2");
const userName = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const highScore = JSON.parse(localStorage.getItem("highscore")) || [];
const alertSuccess = document.querySelector("#success");
const alertWarning = document.querySelector("#warning");
const successReplace = document.querySelector("#successReplace");

finalScore.textContent = mostRecentScore2;

userName.addEventListener("keyup", e => {
  saveScoreBtn.disabled = !userName.value;
});

saveScoreBtn.addEventListener("click", e => {
  e.preventDefault();
  const score = {
    score: mostRecentScore2,
    name: userName.value
  };

  highScore.push(score);
  highScore.sort(function(a, b) {
    return b.score - a.score;
  });
  highScore.splice(10);

  localStorage.setItem("highscore", JSON.stringify(highScore));
  userName.value = "";
  alertSuccess.innerHTML = `
  <p>Success, score saved successfully.</p>
  <span id="close" class="closebtn">&times</span>
  `;
  successReplace.textContent = `SAVED`;
  alertSuccess.classList.add("success");

  setTimeout(() => {
    alertSuccess.remove();
  }, 3000);
});
