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
const choices = [];
constructChoiceElements = () =>{
    for(let i =1; i<5; i++){
        choices[i] = document.getElementById("choice" + i);
    }
}
constructChoiceElements();
console.log(choices);

const progres_elem = document.getElementById("progres");
const score_elem = document.getElementById("score");

MAX_QUESTIONS = 3;
SCORE_BONUS = 10;

let is_ready = false;
let question_count=0;
let score = 0;
let avaliable_question =[];
let currentquestion = {};
let questions = [
    {
        question: "С коя от съседните държави България има най-дълга граница?",
        answer1: "Румъния",
        answer2: "Сърбия",
        answer3: "Гърция",
        answer4: "Турция",
        type: "geography",
        correct: 1,
    },
    {
        question: "Кое от посочените твърдения е вярно?",
        answer1: "Площта на България е 100 000 кв. км.",
        answer2: "За връзка между България и Румъния са построени три моста над р. Дунав",
        answer3: "На югоизток България граничи с Турция",
        answer4: "България има най-къса граница с Гърция",
        type: "geography",
        correct: 3,
    },
    {
        question: "Коя е най-дългата река в България?",
        answer1: "Марица",
        answer2: "Камчия",
        answer3: "Янтра",
        answer4: "Искър",
        type: "geography",
        correct: 4,
    },
    {
        question: "Река Марица извира от:",
        answer1: "Стара планина",
        answer2: "Пирин",
        answer3: "Рила",
        answer4: "Родопите",
        type: "geography",
        correct: 3,
    },
    {
        question: "Как се наричали вождовете на славянските племена?",
        answer1: "царе",
        answer2: "князе",
        answer3: "ханове",
        answer4: "крале",
        type: "history",
        correct: 2,
    },
    {
        question: "Кой от посочените владетели управлява България през VІІІ век?",
        answer1: "Омуртаг",
        answer2: "Петър",
        answer3: "Калоян",
        answer4: "Тервел",
        type: "history",
        correct: 4,
    },
    {
        question: "Кое твърдение за управлението на цар Иван Асен ІІ НЕ е вярно?",
        answer1: " започнал да сече златни монети",
        answer2: "разширил територията на държавата до три морета",
        answer3: "сключил съюз с Византия срещу Латинската империя",
        answer4: "постигнал възстановяване на Българската патриаршия",
        type: "history",
        correct: 3,
    },
    {
        question: "Коя е най-многобройната обществена група в българската държава през Средновековието?",
        answer1: "духовенството",
        answer2: "селяните",
        answer3: "занаятчиите",
        answer4: "аристокрацията",
        type: "history",
        correct: 2,
    },
    {
        question: "Ако концентрациите на реагиращите вещества са равни на 1 mol/L, скоростта на химичната реакция:",
        answer1: "се променя с единица",
        answer2: "е равна на универсалната константа",
        answer3: "е равна на скоростната константа",
        answer4: "е равна на единица",
        type: "chemistry",
        correct: 3,
    },
    {
        question: "Общото между ненаситените водни разтвори на обикновена захар, меден сулфат и готварска сол е, че са:",
        answer1: "прозрачни",
        answer2: "нестабилни",
        answer3: "киселинни",
        answer4: "нееднородни",
        type: "chemistry",
        correct: 1,
    },
    {
        question: "При отваряне на бутилка с газирана вода се отделя газ. Отделянето на газ се дължи на:",
        answer1: "намаляване на разтворимостта на газа при понижаване на налягането",
        answer2: "увеличаване на обема на течността поради поглъщане на въздух",
        answer3: "увеличаване на обема на течността поради разтваряне на кислород от въздуха",
        answer4: "кипене на газираната вода при контакта с въздух",
        type: "chemistry",
        correct: 1,
    },
    {
        question: "За глицерола НЕ е вярно, че:",
        answer1: "е взривоопасно вещество",
        answer2: "има сладък вкус",
        answer3: "се използва в козметиката",
        answer4: "е продукт на хидролизата на мазнини",
        type: "chemistry",
        correct: 1,
    },
    {
        question: "Числата 2, 6, 18, … , 1458 образуват крайна геометрична прогресия. Броят на членовете на тази прогресия е:",
        answer1: "7",
        answer2: "4",
        answer3: "6",
        answer4: "8",
        type: "math",
        correct: 1,
    },
    {
        question: "Ако x е средноаритметичното на статистическия ред 2,2,3,5,8,13,21,34 и y е средноаритметичното на реда 4,4,5,7,10,15,23,36, то определете |x−y|.",
        answer1: "6",
        answer2: "8",
        answer3: "4",
        answer4: "2",
        correct: 4,
    },
    {
        question: "Броят на четните четирицифрени числа с различни цифри, записани с цифрите 1, 2, 3, 4 и 5 е:",
        answer1: "46",
        answer2: "120",
        answer3: "48",
        answer4: "52",
        type: "math",
        correct: 3,
    },
    {
        question: "Разликата от дължините на основите на трапец, вписан в окръжност, е 6cm и котангенсът на един от ъглите му е 0,6. Дължината на височината на трапеца е:",
        answer1: "10 cm",
        answer2: "5 cm",
        answer3: "3,6 sm",
        answer4: "7,2 cm",
        type: "math",
        correct: 2,
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
        localStorage.setItem("score", score);
        return window.location.assign("score.html");
    }
    
    question_count++;
    progres_elem.innerText = question_count + "\\" + MAX_QUESTIONS;
    let question_index = Math.floor(Math.random() * avaliable_question.length)
    currentquestion = avaliable_question[question_index];
    if(currentquestion.question.length > 80){
        if(window.innerWidth<500){
            question.style.fontSize = "1.1rem";
        }
        else{
            question.style.fontSize = "2rem";
        }
    }
    else if(currentquestion.question.length > 110){
        if(window.innerWidth<500){
            question.style.fontSize = "0.9rem";
        }
        else{
            question.style.fontSize = "1.5rem";
        } 
    }
    question.innerText = currentquestion.question;

    for(let i =1; i<5; i++){
        answer[i].innerText = currentquestion["answer" + i];
    }

    avaliable_question.splice(question_index,1)
    is_ready = true;

}


for(let i =1; i<5; i++){
    
    choices[i].addEventListener("click" , e =>{
        if(is_ready === false)return;
        let apply_style;
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
            is_ready=false;
        

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