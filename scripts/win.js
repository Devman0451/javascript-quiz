let scoreText = document.querySelector(".score");

let score = localStorage.getItem("score");
let count = localStorage.getItem("count");

scoreText.innerHTML = `You got ${score} out of ${count}!`;