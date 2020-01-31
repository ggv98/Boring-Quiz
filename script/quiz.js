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
    
    question_count++;
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

console.log(typeof(answer[1]));
console.log(typeof(question));
for(let i =1; i<5; i++){
    answer[i].addEventListener("click" , e =>{
        showNextQuestion();

    });
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