const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));

let questions = [];
let remainingQuestions = [];
let incorrectAnswers = [];
let allAnswers = [];


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
				})
				 showQuestion();
            }
            if (xhr.status == 500) {
                console.log("serverfel");
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.send();
	
	function showQuestion() {
		remainingQuestions = [... questions];
		console.log(remainingQuestions);
		const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
		const randomAnswerIndex = Math.floor(Math.random() * 3);
		let currentQuestion = remainingQuestions[randomIndex].question;
		question.innerText = currentQuestion;
		let correctAnswer = remainingQuestions[randomIndex].correct_answer;
		incorrectAnswers = remainingQuestions[randomIndex].incorrect_answers;
		allAnswers = [... incorrectAnswers];
		allAnswers.splice(randomAnswerIndex, 0, correctAnswer);
		console.log(currentQuestion);
		console.log(correctAnswer);
		console.log(incorrectAnswers);
		console.log(allAnswers);
		answers[0].innerText = allAnswers[0];
		answers[1].innerText = allAnswers[1];
		answers[2].innerText = allAnswers[2];
		answers[3].innerText = allAnswers[3];
		
		answers.forEach(function(answer){
			answer.addEventListener("click", e => {
				const chosenAnswer = e.target;
				if(chosenAnswer === answers[0] && answers[0].innerText === correctAnswer){
					console.log("Det funker");
				}
				else if(chosenAnswer === answers[1] && answers[1].innerText === correctAnswer){
					console.log("Det funker");
				}
				else if(chosenAnswer === answers[2] && answers[2].innerText === correctAnswer){
					console.log("Det funker");
				}
				else if(chosenAnswer === answers[3] && answers[3].innerText === correctAnswer){
					console.log("Det funker");
				}
				else {
					console.log("fel svar");
				}
			})
		});
		
	}