const question = document.getElementById('question');

let questions = [];
let remainingQuestions = [];


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
		console.log(remainingQuestions[randomIndex].question);
		question.innerText = remainingQuestions[randomIndex].question;
	}