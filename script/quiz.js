const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const type = urlParams.get('type');
const question = document.getElementById("question");
const answer = [];
constructAnswerElements = () =>{
    for(let i =1; i<5; i++){
        answer[i] = document.getElementById("answer" + i);
    }
}
constructAnswerElements();
const progres_elem = document.getElementById("progres");
const score_elem = document.getElementById("score");

MAX_QUESTIONS = 3;
SCORE_BONUS = 10;

let question_count=0;
let score = 0;
let avaliable_question =[];
let currentquestion = {};
let questions =[
    { 
        question: "С коя от съседните държави България има най-дълга граница?",
        answer1: "Румъния",
        answer2: "Сърбия",
        answer3: "Гърция",
        answer4: "Турция",
        type: "geography",
        correct:1,
      },
    { 
        question: "Кое от посочените твърдения е вярно?",
        answer1: "Площта на България е 100 000 кв. км.",
        answer2: "За връзка между България и Румъния са построени три моста над р. Дунав",
        answer3: "На югоизток България граничи с Турция",
        answer4: "България има най-къса граница с Гърция",
        type: "geography",
        correct:3,
      },
    { 
        question: "Коя е най-дългата река в България",
        answer1: "Марица",
        answer2: "Камчия",
        answer3: "Янтра",
        answer4: "Искър",
        type: "geography",
        correct:4,
      }
]

start = () =>{
    question_count = 0;
    avaliable_question = getQuestionByType();
    
    showNextQuestion();
}

constructAnswerElements = () =>{
    for(let i =1; i<5; i++){
        answer[i] = document.getElementById("answer" + i);
    }
}
showNextQuestion = () =>{
    if(avaliable_question.length === 0 || question_count === MAX_QUESTIONS){
        return window.location.assign("score.html");
    }
    
    question_count++;
    progres_elem.innerText = question_count + "\\" + MAX_QUESTIONS;
    let question_index = Math.floor(Math.random() * avaliable_question.length)
    currentquestion = avaliable_question[question_index];
    console.log(question_index);
    question.innerText = currentquestion.question;

    for(let i =1; i<5; i++){
        answer[i].innerText = currentquestion["answer" + i];
    }

    avaliable_question.splice(question_index,1)
    console.log(avaliable_question);
}


for(let i =1; i<5; i++){
    answer[i].addEventListener("click" , e =>{
        let apply_style
        if(currentquestion.correct === i){
           apply_style = "correct";
            increaseScore();
        }
        else{
            apply_style = "incorect";
        }
        answer[i].parentElement.classList.add(apply_style);

        setTimeout(() =>{
            answer[i].parentElement.classList.remove(apply_style);
            showNextQuestion();}, 1500);
        

    });
}
increaseScore = () =>{
    score += SCORE_BONUS;
    score_elem.innerText = score;
}
getQuestionByType = () =>{
    let newAray = [];
    questions.forEach(element => {
        if(element.type == type){
            newAray.push(element);
        }
    });
    return newAray;
}

start();