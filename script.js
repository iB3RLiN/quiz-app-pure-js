//Selctors 
let qcount = document.querySelector('.quiz-info .count span'),
    bullitSpansContener = document.querySelector('.bullets .spans'),
    questionsArea = document.querySelector('.quiz-area'),
    answersArea = document.querySelector('.answers-area'),
    button = document.querySelector('.submit-button'),
    resultsContainer = document.querySelector(".results");


// setting
let currntIndex = 0,
    rightAnswers = 0;

function getQuestions(){
    let myRespon = new XMLHttpRequest();

    myRespon.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let questionsObject = JSON.parse(this.responseText);
            let questionsCuont = questionsObject.length;
            creatBullit(questionsCuont);
            getQuestionsData(questionsObject[currntIndex],questionsCuont);
            button.onclick = function (){
                let theRightAnswer = questionsObject[currntIndex].right_answer;
                currntIndex++;
                checkAnswer(theRightAnswer,questionsCuont);
                questionsArea.innerHTML = "";
                answersArea.innerHTML = "";
                bullitColors(questionsCuont);
                getQuestionsData(questionsObject[currntIndex],questionsCuont);
                result(questionsCuont);
            }
            // console.log(questionsObject,questionsCuont,typeof(questionsObject))
        }
    }

    myRespon.open("GET","history_qus.json", true);
    myRespon.send();
}

getQuestions();

function creatBullit(num){
    qcount.innerHTML = num;
    for(let i = 0; i <= num; i++){
        let bullitSpan = document.createElement('span');
        // if(i == 1){
        //     bullitSpan.className = 'on'
        // }
        bullitSpansContener.appendChild(bullitSpan)
    }
}

function getQuestionsData(obj,num){
    if(currntIndex < num){
        let h2Elemnt = document.createElement('h2'),
        getquestionsFromData = document.createTextNode(obj["title"]);

    h2Elemnt.appendChild(getquestionsFromData);
    questionsArea.appendChild(h2Elemnt);

    for(let i = 1; i <= 4; i++){
        let ansDiv = document.createElement('div'),
            userInput = document.createElement('input');
            
        ansDiv.className = 'answer';
        userInput.type = 'radio';
        userInput.id = `answer_${i}`;
        userInput.name ='question';
        userInput.dataset.answer = obj[`answer_${i}`];
        if(i === 1){
            userInput.checked = true
        }
        let theLabel = document.createElement('label');
        theLabel.htmlFor = `answer_${i}`;
        let theLabelText = document.createTextNode(obj[`answer_${i}`]);

        ansDiv.appendChild(userInput);
        ansDiv.appendChild(theLabel);
        theLabel.appendChild(theLabelText);
        answersArea.appendChild(ansDiv);
    }
    }
}

function checkAnswer(rAnswer,qCount){
    let inputSelctor = document.getElementsByName('question');
    let userChosing;
    for(let i = 0; i<inputSelctor.length; i++){
        if(inputSelctor[i].checked){
            userChosing = inputSelctor[i].dataset.answer;
        }
    }
    if(rAnswer === userChosing){
        rightAnswers++
    }
}

function bullitColors(){
    let bulitSpanColor = document.querySelectorAll('.bullets .spans span');
    let arryOfSpans = Array.from(bulitSpanColor);
    arryOfSpans.forEach((span, index) => {
        if (currntIndex === index) {
            span.className = "on";
        }
    });
}


function result(rcuont){
    let theResults;
    if(currntIndex === rcuont){
        questionsArea.remove();
        answersArea.remove();
        button.remove();
        bullitSpansContener.remove();

        
    if (rightAnswers > rcuont / 2 && rightAnswers < rcuont) {
        theResults = `<span class="good">Good</span>, ${rightAnswers} From ${rcuont}`;
        } else if (rightAnswers === rcuont) {
        theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
        } else {
        theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${rcuont}`;
        }
        resultsContainer.innerHTML = theResults;
    }
}





















// function getQuestions(){
//     let myRequest = new XMLHttpRequest();

//     myRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         let questionsObject = JSON.parse(this.responseText);
//         let qCount = questionsObject.length;

//     }
// }


























// //selctor
// let questionsCount = document.querySelector('.quiz-info .count span');
// let bullets = document.querySelector('.bullets .spans');
// let quizArea = document.querySelector('.quiz-area');
// let answersArea = document.querySelector('.answers-area');
// let submitButton = document.querySelector('.submit-button');
// let radioValueClear = document.querySelector('.answers-area .answer .test');

// let index = 0,
//     rightChosingCount = 0;


// function getQuiz(){
//     let myRespon = new XMLHttpRequest(); // creat new object from XML http Request

//     myRespon.onreadystatechange = function(){
//         // if Requset complit 4 step conect and and Requset status 200 [ok]
//         if(this.readyState === 4 && this.status === 200){
//             let objectOfRespon = JSON.parse(this.responseText) //creat var to Convert text from respon to object
//             let count = objectOfRespon.length;
//             creatBullets(count);
//             getAnswers(objectOfRespon,count);
//             submitButton.onclick = () => {
//                 let rightAns = objectOfRespon[index].true_answer;
//                 index++;
//                 chickAnswer(rightAns,count);
//                 quizArea.innerHTML = '';
//                 answersArea.innerHTML = '';
                
//                 getAnswers(objectOfRespon,count);
                
                
//             }
//         }
//     }
//     myRespon.open('GET', 'history_qus.json', true); 
//     myRespon.send()
// }



// function creatBullets(num){

//     questionsCount.innerHTML = num;
    

//     for(i = 1; i <= num; i++){
//         let spanBullets = document.createElement('span');
        
//         if(i === 1){
//             spanBullets.className = 'on'
//         }

//         bullets.appendChild(spanBullets);
//     }

// }

// function getAnswers(obj,count){
//     let title = document.createElement('h2');
//     let qus = document.createTextNode(obj[index].title);
//     title.appendChild(qus);
//     quizArea.appendChild(title);
//     // console.log(qus);

//     for(let i=1; i <= 4; i++){
//         let mainDiv = document.createElement('div');
//         mainDiv.className = 'answer';

//         let inputRido = document.createElement('input');
//         inputRido.type = 'radio';
//         inputRido.name = 'question';
//         inputRido.id = `answer_${i}`;
//         inputRido.dataset.answer = obj[`answer_${i}`];


//         // inputRido.value = obj[i][`answer_${i}`];
//         // inputRido.className = 'test';

        

//         let label = document.createElement('label');
//         label.htmlFor = `answer_${i}`;
//         let textLabel = document.createTextNode(obj[i][`answer_${i}`]);
//         label.appendChild(textLabel);
//         mainDiv.appendChild(inputRido);
//         mainDiv.appendChild(label);
//         answersArea.appendChild(mainDiv);
//         //console.log(textLabel);
//     }
// }


// function chickAnswer(rAnswer, count){
    
//     let answers = document.getElementsByName('question');
//     let theChoosenAnswer;

//     for (let i = 0; i < answers.length; i++) {
//     if (answers[i].checked) {
//         theChoosenAnswer = answers[i].dataset.answer;;
//         }
//     }
    
//     if(theChoosenAnswer === rAnswer){
//         rightChosingCount++;
//     }
//     console.log(answers)

// }





// getQuiz();