const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const mostRecentScore2 = localStorage.getItem('mostRecentScore2')
const userName = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const highScore = JSON.parse(localStorage.getItem('highscore')) || [];


finalScore.textContent = mostRecentScore;


userName.addEventListener('keyup', (e) => {
  console.log(e.target)
  console.log(userName.value);
  saveScoreBtn.disabled = !userName.value;

})

saveScoreBtn.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)

  const score = {
    score: mostRecentScore2,
    name: userName.value
  };


  highScore.push(score)
  console.log(score)
  console.log(highScore)

  highScore.sort(function(a,b){
    return b.score - a.score;
  })

  localStorage.setItem('highscore', JSON.stringify(highScore));
 
})





console.log(mostRecentScore)