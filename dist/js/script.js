
// variables
const navbarBtn = document.querySelector('.navbar_btn');
const navbarLinks = document.querySelector('.navbar_links');
const quizDOM = document.querySelector('.main-question');
const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice_text');
const nextBtn = document.querySelector('#next-btn');
const progressBarFull = document.querySelector('#progressBarFull');
const progressText = document.querySelector('#progressText');
const time = document.querySelector('.hud_main_text');
const scoreText = document.querySelector('#score');





let currentQuestion = {};
let questionIndex = 0;
let availableQuestions = [];
let questionCounter = 0;
let score = 0;
let acceptAnswer = false;
let duration = 300;
let t = 0;

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20;



// navbar event listener
navbarBtn.addEventListener('click' , () => {
    let value = navbarLinks.classList.contains('navbar_collapse');

    if(value){
        navbarLinks.classList.remove('navbar_collapse');
        navbarBtn.classList.remove('change');
    }else{
        navbarLinks.classList.add('navbar_collapse');
        navbarBtn.classList.add('change');
    }
})



console.log(Math.floor(Math.random() * 3) + 1);
// answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);







// getting the question
class Questions {
  async getQuestions() {
    try{
      let response = await fetch('https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple');
      console.log(response)
      let data = await response.json();
      let loadedQuestions = data.results;
      console.log(loadedQuestions)
      loadedQuestions = loadedQuestions.map( quest => {
        // console.log(quest)

        const formattedQuestion = {
          question : quest.question
        }

        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        let answerChoices = [... quest.incorrect_answers]; 
        answerChoices.splice( formattedQuestion.answer - 1, 0, quest.correct_answer)
        // console.log(question, answer, answerChoices)

        answerChoices.forEach((choice, index) => {
          // console.log(choice, index +1);
          // console.log(`choice${index + 1}`);
         formattedQuestion[`choice${index + 1}`] = choice;
        })
        // console.log(formattedQuestion)
        return formattedQuestion;




















        // const { question, correct_answer, incorrect_answers} = quest;
        // console.log(question, correct_answer, incorrect_answers[0], incorrect_answers[1], incorrect_answers[2])
        // return {
        //   question: question,
        //   choice1:correct_answer, 
        //   choice2:incorrect_answers[0],
        //   choice3:incorrect_answers[1],
        //   choice4:incorrect_answers[2],
        //   answer: 1,
        // }
      })
      console.log(loadedQuestions)
      return loadedQuestions;
    } catch(error) {
        console.log(error);
    }
  }
}

class UI {

  startQuiz = (loadedQuestions) => {
    console.log(loadedQuestions)
    questionCounter = 0;
    availableQuestions = [...loadedQuestions]
    this.displayQuestions()
    console.log(availableQuestions)

  }

  displayQuestions = () => {
    this.acceptingAnswer()
    this.removingColor()
    this.questionCounterCheck()
    this.timeCounterCheck()
   
    questionCounter++;

    // Takes care of the Question Numbering
    progressText.textContent = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    // This is for the progress bar output
    progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`

    questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    question.textContent = currentQuestion.question;
    choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.textContent = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1)
    acceptAnswer = true;
   
    console.log(availableQuestions)
  }


  
  getNextQuestion = () => {
    nextBtn.addEventListener('click', () => {
      setTimeout(()=>{
        this.removingColor()
        this.displayQuestions()
        this.disableNextBtn()
      },500)
    })
    
  }


  acceptingAnswer = () => {
    for(let choice of choices){

      choice.addEventListener('click', (event) => {
        if(!acceptAnswer) return;
        acceptAnswer = false;

        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        if(classToApply == 'correct'){
          this.incrementScore(CORRECT_BONUS)
        }
      
        const ans = currentQuestion.answer ;
        const anser = choice.dataset['number'];

        // if(!selectedAnswer){
        //   nextBtn.disabled = true;
        // } else {
        //   nextBtn.disabled = false;
        // }

        nextBtn.disabled = !selectedChoice;

        // const newPtagCheck = document.createElement('p');
        // const newPtagTimes = document.createElement('p');

        // const newItagCheck = document.createElement('i');
        // const newItagTimes = document.createElement('i');

        // newPtagCheck.className = 'answer-indicator';
        // newPtagTimes.className = 'answer-indicator';

        // newItagCheck.classList.add('fas' ,'fa-check');
        // newItagTimes.classList.add('fas', 'fa-times')

        // newPtagCheck.appendChild(newItagCheck);
        // newPtagTimes.appendChild(newItagTimes);
    
        
      
        console.log(ans, typeof(ans))
        console.log(anser, typeof(anser))
        console.log(selectedAnswer);
        console.log(selectedChoice.parentElement)
        console.log(selectedChoice);
        console.log(currentQuestion.answer)

        choices.forEach(choice => {
          console.log(choice)
          console.log(currentQuestion.answer)
          if(choice.dataset['number'] == currentQuestion.answer){
            console.log(choice.parentElement)
            // choice.parentElement.classList.add(green)
            choice.parentElement.classList.add('correct')
          }
        })

      })
    }


    
  }






  removingColor = () => {
      for(let choice of choices){
      choice.addEventListener('click', (event) => {
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // console.log(selectedChoice);
        
        
        //For the code below, whenever a next button is clicked, it removes the classToApply class from the choice after 0.5 seconds delay.

        // nextBtn.disabled = !selectedChoice;

        if(nextBtn.addEventListener('click', (e)=> {
          e.preventDefault()
          setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply)
          },500)
        })){
          return selectedChoice.parentElement.classList.remove(classToApply)
        }
      })

      if(nextBtn.addEventListener('click', (e) => {
        e.preventDefault()
        setTimeout(() => {
          choice.parentElement.classList.remove('correct')
        }, 500)
      })){
        return choice.parentElement.classList.remove('correct')
      }
    }
  }

  disableNextBtn = () => {
    choices.forEach(choice => {
      console.log(choice)
      choice.addEventListener('click', (event) => {
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        nextBtn.disabled = !selectedAnswer
      })
    })
  }



  incrementScore = (num) => {
    score += num;
    console.log(score)
  }


  questionCounterCheck = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
      localStorage.setItem('mostRecentScore2', `${score}`)
      localStorage.setItem('mostRecentScore', `correct: ${score} of ${MAX_QUESTIONS}`)
      return window.location.assign('/result.html')
    }

    if(availableQuestions.length === 1 || questionCounter === MAX_QUESTIONS - 1){
      return  nextBtn.innerHTML = `
      <i class="fas fa-list-alt"> result</i>
    `;
    }
  }



  timeCount = () => {
    this.timeCounterCheck()
    let minutes = parseInt(duration / 60) % 60;
    let seconds = duration % 60;
    console.log(minutes, seconds)
    let fullTime = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    time.textContent = fullTime;
    console.log(fullTime);

    duration = duration - 1;
    t = setTimeout(()=> {
      this.timeCount()
    }, 1000)
    console.log(duration, t)
  }


  timeCounterCheck = () => {
    if(duration === 0){
      localStorage.setItem('mostRecentScore2', `${score}`)
      localStorage.setItem('mostRecentScore', `correct: ${score} of ${MAX_QUESTIONS}`)
      return window.location.assign('/result.html')
    }
  }








}




class Storage extends UI {
  static saveQuestions(loadedQuestions){
    localStorage.setItem('questions', JSON.stringify(loadedQuestions))
  }

  static getSavedQuestions(loadedQuestions){
    let questions = JSON.parse(localStorage.getItem('questions'))
    console.log(questions)
    return questions;
  }

}


document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const questions = new Questions();

  questions.getQuestions()
    .then(loadedQuestions => {
      ui.startQuiz(loadedQuestions)
      ui.getNextQuestion()
      ui.timeCount()
      Storage.saveQuestions(loadedQuestions);
    })
   
})








































// (startQuiz = () => {

//   const ui = new UI();
//   const questions = new Questions();



//   questions.getQuestions()
//     .then(loadedQuestions => {

//       availableQuestions = [...loadedQuestions];

//       ui.displayQuestions(availableQuestions);
//       Storage.saveQuestions(loadedQuestions);

//       console.log(availableQuestions)
//       console.log(loadedQuestions)
//     }) 
// })()





  // let result = '';
    

    // result += `

    //   <article>
    //     <h2 id="question">${currentQuestion.question}</h2>

    //     <div class="choice_container">
    //         <p class="choice_prefix">A</p>
    //         <p class="choice_text" data-number="1">${currentQuestion.choice1}</p>
    //     </div>

    //     <div class="choice_container">
    //         <p class="choice_prefix">B</p>
    //         <p class="choice_text" data-number="2">${currentQuestion.choice2}</p>
    //     </div>

    //     <div class="choice_container">
    //         <p class="choice_prefix">C</p>
    //         <p class="choice_text" data-number="3">${currentQuestion.choice3}</p>
    //     </div>

    //     <div class="choice_container">
    //         <p class="choice_prefix">D</p>
    //         <p class="choice_text" data-number="4">${currentQuestion.choice4}</p>
    //     </div>
    //   </article>
      
    // `;


    // quizDOM.innerHTML = result;








       // const correctAnswer = 'correct';
        // const incorrectAnswer = 'incorrect';

        // if(selectedAnswer == currentQuestion.answer){
        //   selectedChoice.parentElement.classList.add(correctAnswer);
        // }else{
        //   selectedChoice.parentElement.classList.add(incorrectAnswer);
        //   // selectedChoice.parentElement.classList.add(correctAnswer)
        // }














        // const newPtagCheck = document.createElement('p');
        // const newPtagTimes = document.createElement('p');

        // const newItagCheck = document.createElement('i');
        // const newItagTimes = document.createElement('i');

        // newPtagCheck.className = 'answer-indicator';
        // newPtagTimes.className = 'answer-indicator';

        // newItagCheck.classList.add('fas' ,'fa-check');
        // newItagTimes.classList.add('fas', 'fa-times')

        // newPtagCheck.appendChild(newItagCheck);
        // newPtagTimes.appendChild(newItagTimes);
        
        // console.log(selectedChoice);


        // const correctAnswer = 'correct';
        // const incorrectAnswer = 'incorrect';

        // if(selectedAnswer == currentQuestion.answer){
        //   selectedChoice.parentElement.classList.add('correct');
        //   // selectedChoice.appendChild(newPtagCheck);
        // } else {
        //   selectedChoice.parentElement.classList.add('incorrect');
        //   // selectedChoice.appendChild(newPtagTimes);
        // }
        
        // //For the code below, whenever a next button is clicked, it removes the classToApply class from the choice after 0.5 seconds delay.
        // if(nextBtn.addEventListener('click', ()=> {
        //   setTimeout(()=> {
        //     // selectedChoice.removeChild(newPtagTimes);
        //     // selectedChoice.removeChild(newPtagCheck);
        //     selectedChoice.parentElement.classList.remove('incorrect');
        //   },500)
        // })){
        //   // selectedCho