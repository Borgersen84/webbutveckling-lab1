const finalScore = document.getElementById("score-number");
const mostRecentScore = localStorage.getItem("finalScore");

finalScore.innerText = mostRecentScore;