const highScoreList = document.querySelector('#highScoreList');
const highScore = JSON.parse(localStorage.getItem('highscore')) || [];




highScoreList.innerHTML =   highScore.map((score) => {
  return `<li class='highList' > ${score.name} - ${score.score} </li>`
}).join('')