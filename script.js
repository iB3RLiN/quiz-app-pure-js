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




