(() => {
    const questions = [];
    const answers = [];
    const correctAnswers = [];
    
    let questionIndex = 0;
    let score = 0;
    let count = 0;

    function loadQuestions() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', '../questions.txt', true);

        xhr.onload = function () {
            if (this.status == 200) {
                parseText(this.responseText);
                
            }
        }

        xhr.onerror = function() {
            console.log('Request questions.txt failed...');
        }

        xhr.send();
    }

    function parseText(text) {

        const newText = text.trim().split('\n');

        for (let question of newText) {
            let qandAs = question.split("@");
            questions.push(qandAs[0]);
            answers.push(qandAs[1], qandAs[2], qandAs[3]);
            correctAnswers.push(qandAs[1]);
        }

        generateQuiz();

    }


    function generateQuiz() {
        const questionText = document.querySelector(".question");
        const button1Text = document.querySelector(".answer1-text");
        const button2Text = document.querySelector(".answer2-text");
        const button3Text = document.querySelector(".answer3-text");

        const button1 = document.getElementById("dot1");
        const button2 = document.getElementById("dot2");
        const button3 = document.getElementById("dot3");


        questionIndex = Math.floor(Math.random() * questions.length);
        questionText.innerText = questions[questionIndex];
        questionText.dataset.rightanswer = answers[questionIndex * 3];

        let threeAnswers = [];
        threeAnswers.push(answers[questionIndex * 3],
            answers[questionIndex * 3 + 1],
            answers[questionIndex * 3 + 2]);

        threeAnswers = shuffle(threeAnswers);

        button1Text.innerHTML = threeAnswers[0];
        button2Text.innerHTML = threeAnswers[1];
        button3Text.innerHTML = threeAnswers[2];

        button1.dataset.answer = threeAnswers[0];
        button2.dataset.answer = threeAnswers[1];
        button3.dataset.answer = threeAnswers[2];

        playerInput();
    }


    function playerInput() {
        const button1 = document.getElementById("dot1");
        const button2 = document.getElementById("dot2");
        const button3 = document.getElementById("dot3");

        const buttons = [];
        buttons.push(button1, button2, button3);

        for (let button of buttons) {
            button.addEventListener("click", answerCall);
        }

    }


    function answerCall(event) {
        const questionText = document.querySelector(".question");
        const choice = event.target.dataset.answer;
        const correct = questionText.dataset.rightanswer;

        if (choice == correct) {
            score++ ,
                count++;
        } else {
            count++;
        }

        if (count >= 5) {
            localStorage.setItem("score", score);
            localStorage.setItem("count", count);
            window.open("win.html", "_self");
        }

        questions.splice(questionIndex, 1);
        correctAnswers.splice(questionIndex, 1);
        answers.splice(questionIndex * 3, 3);

        generateQuiz();
    }



    //HELPER FUNCTIONS
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    loadQuestions();
})();