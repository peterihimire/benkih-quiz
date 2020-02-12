
// variables
const navbarBtn = document.querySelector('.navbar_btn');
const navbarLinks = document.querySelector('.navbar_links');
const navbarOverlay = document.querySelector('.navbar-overlay');
const quizDOM = document.querySelector('.main-question');
const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice_text');
const nextBtn = document.querySelector('#next-btn');
const timeBarFull = document.querySelector('.timeBarFull');
const progressText = document.querySelector('#progressText');
const time = document.querySelector('.hud_main_text');
const scoreText = document.querySelector('#score');
const category = document.querySelector('#category');
const difficulty = document.querySelector('#difficulty');





let currentQuestion = {};
let questionIndex = 0;
let availableQuestions = [];
let questionCounter = 0;
let score = 0;
let acceptAnswer = false;
let duration = 300;
let t = 0;




// navbar event listener
navbarBtn.addEventListener('click' , () => {
  let value = navbarLinks.classList.contains('navbar_collapse');

  if(value){
      navbarLinks.classList.remove('navbar_collapse');
      navbarBtn.classList.remove('change');
      navbarOverlay.classList.remove('transparent-background');
  }else{
      navbarLinks.classList.add('navbar_collapse');
      navbarBtn.classList.add('change');
      navbarOverlay.classList.add('transparent-background');
  }
})

navbarOverlay.addEventListener('click', (e)=> {
  console.log(e.target)
  console.log('navbar overlay has been clicked');
  let value = navbarLinks.classList.contains('navbar_collapse');
  if (value){
    navbarLinks.classList.remove('navbar_collapse');
    navbarBtn.classList.remove('change');
    navbarOverlay.classList.remove('transparent-background');
  }
})



let counter = document.querySelector('#counter').getContext('2d');
let no = 0;
let pointToFill = 4.72;
let counterWidth = counter.canvas.width;
let counterHeight = counter.canvas.height;
let diff;



let counter2 = document.querySelector('#counter2').getContext('2d');
let num = 0;
let pToFill = 4.72;
let cw = counter.canvas.width;
let ch = counter.canvas.height;
let difference;





const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20;






console.log(Math.floor(Math.random() * 3) + 1);
// answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);







// getting the question
class Questions {
  async getQuestions() {
    try{
      // let response = await fetch('https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple');
      let response = await fetch('questio.json')
      console.log(response)
      let data = await response.json();
      let loadedQuestions = data.results;
      console.log(loadedQuestions)
      loadedQuestions = loadedQuestions.map( quest => {
        // console.log(quest)

        const formattedQuestion = {
          question : quest.question,
          category : quest.category,
          difficulty : quest.difficulty
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
    // this.displayQuestions()
    this.displayQuestions2()
    console.log(availableQuestions)

  }

  // displayQuestions = () => {
  //   this.acceptingAnswer()
  //   this.removingColor()
  //   this.questionCounterCheck()
  //   this.timeCounterCheck()
    
   
  //   questionCounter++;

 

  //   // Takes care of the Question Numbering
  //   progressText.textContent = `Question ${questionCounter } of ${MAX_QUESTIONS}`;
  //   // This is for the progress bar output
  //   progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`

  //   questionIndex = Math.floor(Math.random() * availableQuestions.length);
  //   currentQuestion = availableQuestions[questionIndex];

  //   question.textContent = currentQuestion.question;
  //   choices.forEach((choice) => {
  //     const number = choice.dataset['number'];
  //     choice.textContent = currentQuestion['choice' + number];
  //   })

  //   availableQuestions.splice(questionIndex, 1)
  //   acceptAnswer = true;
   
  //   console.log(availableQuestions)
  // }

  displayQuestions2 = () => {

    this.acceptingAnswer()
    this.removingColor()
    this.questionCounterCheck()
    this.timeCounterCheck()
    
   
    questionCounter++;

    this.fillCounter()
    this.fillCounter2()

    questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    
    category.textContent = currentQuestion.category;
    difficulty.textContent = currentQuestion.difficulty;


    console.log(availableQuestions.difficulty);

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
        // this.displayQuestions()
        this.displayQuestions2()
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

        
        
        //For the code below, whenever a next button is clicked, it removes the classToApply class from the choice after 0.5 seconds delay.

    

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
      localStorage.setItem('mostRecentScore', ` ${score} of ${MAX_QUESTIONS}`)
      return window.location.assign('result.html')
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

     

    console.log(duration, t)

    duration = duration - 1;
    t = setTimeout(()=> {
      this.timeCount()
    }, 1000)

     // This is for the progress bar output
     timeBarFull.style.width = `${((duration/100)*100/3)}%`;

   
    console.log(duration, t)
  }


  timeCounterCheck = () => {
    if(duration === 0){
      localStorage.setItem('mostRecentScore2', `${score}`)
      localStorage.setItem('mostRecentScore', ` ${score} of ${MAX_QUESTIONS}`)
      return window.location.assign('result.html')
    }
  }





  fillCounter = () => {

    // // Takes care of the Question Numbering
    // progressText.textContent = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    // // This is for the progress bar output
    // progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`


    diff = ((questionCounter/MAX_QUESTIONS) * Math.PI*2*10)
  
    counter.clearRect(0, 0, counterWidth, counterHeight );
    // below is how thick the arc will be
    counter.lineWidth = 60;
    counter.fillStyle = '#000';
    counter.strokeStyle = '#e8491d';
    counter.textAlign = 'center';
    counter.font = '18px monospace';

    //1st digit below is for left and right
    //2nd digit below is for up and down , smaller means go up and vice-versa
    counter.fillText(`${questionCounter}/${MAX_QUESTIONS}`, 100, 110);
  
    counter.beginPath();
    //
    // 2nd is for up and down direction, smaller the more it goes up , bigger the more it comes down
    //3rd digit below is for the arc radius, the inner circle how big or small it is, smaller digit the more it gets smaller and vise-versa
    counter.arc(100, 100, 60, pointToFill, diff/10+pointToFill);
    counter.stroke();
    
  }  

  fillCounter2 = () => {

    difference = ((questionCounter/MAX_QUESTIONS) * Math.PI*2*10)
  
    counter2.clearRect(0, 0, cw, ch );
    counter2.lineWidth = 30;
    counter2.fillStyle = '#000';
    counter2.strokeStyle = '#e8491d';
    counter2.textAlign = 'center';
    counter2.font = '11px monospace';
    counter2.fillText(`${questionCounter}/${MAX_QUESTIONS}`, 50, 55);
  
    counter2.beginPath();
    counter2.arc(50, 50, 33, pToFill, difference/10+pToFill);
    counter2.stroke();
    
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