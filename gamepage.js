const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const scoreNumber = document.getElementById("score-number");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progressbar-filled-up");
const points = 10;

let questions = [];
let remainingQuestions = [];
let incorrectAnswers = [];
let allAnswers = [];
let correctAnswer;
let currentQuestion;
let score = 0;
let questionCounter = 1;
let finalScore = 0;


// Fetching request from api
var url = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"; 
    var xhr = new XMLHttpRequest;
    var res;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                res = xhr.response;
				res.results.forEach(function (question) {
				// pushing response to new array
				questions.push(question);
				});
				 gameStarter();
            }
            if (xhr.status == 500) {
                console.log("serverfel");
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.send();
	
	function gameStarter() {
		// copying content to new array so we can edit it and keep the old as it is
		remainingQuestions = [... questions];
		showQuestion();
	}
	
	function showQuestion() {
		
		//go to endpage and save score locally when there is no more questions in the array
		if(remainingQuestions.length === 0){
			localStorage.setItem("finalScore", score);
			return window.location.assign("endpage.html");
		}
		//fills up progressbar for every question generated
		progressBar.style.width = `${(questionCounter / 10) * 100}%`;
		questionNumber.innerText = questionCounter + "/" + 10;
		// Generates a random index so we can use it to get a random question from our array
		const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
		const randomAnswerIndex = Math.floor(Math.random() * 4);
		currentQuestion = remainingQuestions[randomIndex].question;
		question.innerText = currentQuestion;
		// Gets the correct answer so we can use it to compare players choice
		correctAnswer = remainingQuestions[randomIndex].correct_answer;
		incorrectAnswers = remainingQuestions[randomIndex].incorrect_answers;
		allAnswers = [... incorrectAnswers];
		// puts the correct answer in a random position with the incorrect answers
		allAnswers.splice(randomAnswerIndex, 0, correctAnswer);
		// makes our answer options visible on the page
		answers[0].innerText = allAnswers[0];
		answers[1].innerText = allAnswers[1];
		answers[2].innerText = allAnswers[2];
		answers[3].innerText = allAnswers[3];
		// removes question from array so it doesn't repeat itself during the game
		remainingQuestions.splice(randomIndex, 1);
	};
	
	// checks and gives points for correct answer
	answers.forEach(function(answer){
			answer.addEventListener("click", e => {
				const chosenAnswer = e.target;
				if(chosenAnswer === answers[0] && answers[0].innerText === correctAnswer){
					score += points;
				}
				else if(chosenAnswer === answers[1] && answers[1].innerText === correctAnswer){
					score += points;
				}
				else if(chosenAnswer === answers[2] && answers[2].innerText === correctAnswer){
					score += points;
				}
				else if(chosenAnswer === answers[3] && answers[3].innerText === correctAnswer){
					score += points;
				}

				questionCounter++;
				scoreNumber.innerText = score;
				showQuestion();
			})
		});
	
	
