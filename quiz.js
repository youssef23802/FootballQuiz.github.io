fetch('questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(questions => {

    const title = document.querySelector(".pagetitle");
    const start_btn = document.querySelector(".start_btn button");
    const info_box = document.querySelector(".info_box");
    const advice_box = document.querySelector(".advice_box");
    const exit_btn = info_box.querySelector(".buttons .quit");
    const continue_btn = info_box.querySelector(".buttons .restart");
    const before_btn = advice_box.querySelector(".buttons .quit");
    const after_btn = advice_box.querySelector(".buttons .restart");
    const quiz_box = document.querySelector(".quiz_box");
    const result_box = document.querySelector(".result_box");
    const option_list = document.querySelector(".option_list");
    const time_line = document.querySelector("header .time_line");
    const timeText = document.querySelector(".timer .time_left_txt");
    const timeCount = document.querySelector(".timer .timer_sec");
    const restart_quiz = result_box.querySelector(".buttons .restart");
    const quit_quiz = result_box.querySelector(".buttons .quit");
    const comment_text = document.querySelector(".comment_text");
    const comment_box = document.querySelector(".comment_box");

    start_btn.onclick = ()=>{
        title.classList.add("hideTitle"); 
        info_box.classList.add("activeInfo"); 
    }

    continue_btn.onclick = ()=>{
        advice_box.classList.add("activeAdvice"); 
        info_box.classList.remove("activeInfo"); 
    }

    exit_btn.onclick = ()=>{
        info_box.classList.remove("activeInfo");
    }

    before_btn.onclick = ()=>{
        advice_box.classList.remove("activeAdvice"); 
        info_box.classList.add("activeInfo"); 
    }

    after_btn.onclick = ()=>{
        advice_box.classList.remove("activeAdvice"); 
        quiz_box.classList.add("activeQuiz"); 
        showQuetions(0); 
        queCounter(1); 
        startTimer(15); 
        startTimerLine(0); 
    }

    let timeValue =  15;
    let que_count = 0;
    let que_numb = 1;
    let userScore = 0;
    let counter;
    let counterLine;
    let widthValue = 0;

    restart_quiz.onclick = ()=>{
        quiz_box.classList.add("activeQuiz"); 
        result_box.classList.remove("activeResult"); 
        timeValue = 15; 
        que_count = 0;
        que_numb = 1;
        userScore = 0;
        widthValue = 0;
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
        fiftyFiftyBtn.disabled = false;
        phoneFriendBtn.disabled = false;
        askTheAudienceBtn.disabled = false;
    }

    quit_quiz.onclick = ()=>{
        window.location.reload(); 
    }

    const next_btn = document.querySelector("footer .next_btn");
    const bottom_ques_counter = document.querySelector("footer .total_que");

    next_btn.onclick = ()=>{
        if(que_count < questions.length - 1){
            que_count++; 
            que_numb++; 
            showQuetions(que_count); 
            queCounter(que_numb); 
            clearInterval(counter); 
            clearInterval(counterLine); 
            startTimer(timeValue); 
            startTimerLine(widthValue); 
            timeText.textContent = "Time Left"; 
            next_btn.classList.remove("show"); 
        }else{
            clearInterval(counter); 
            clearInterval(counterLine); 
            showResult(); 
        }
    }

    function showQuetions(index){

        const que_text = document.querySelector(".que_text");
        comment_box.style.display = "none";
        let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
        let option_tag = '';
        if(questions[index].options.length == 2){
            option_tag +=  '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>';
        } 
        else {
            option_tag += '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
        }
        que_text.innerHTML = que_tag; 
        option_list.innerHTML = option_tag; 
        
        const option = option_list.querySelectorAll(".option");

        for(i=0; i < option.length; i++){
            option[i].setAttribute("onclick", "optionSelected(this)");
        }
    }

    let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
    let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

    function optionSelected(answer) {
        clearInterval(counter); 
        clearInterval(counterLine); 
        let userAns = answer.textContent; 
        let correcAns = questions[que_count].answer; 
        const allOptions = option_list.children.length; 

        comment_text.textContent = (userAns === correcAns) ? questions[que_count].commentCorrect : questions[que_count].commentIncorrect;
        comment_box.style.display = "block";

        if (userAns === correcAns) {
            userScore++; 
            answer.classList.add("correct"); 
        } else {
            answer.classList.add("incorrect"); 
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === correcAns) {
                    option_list.children[i].classList.add("correct");
                    break;
                }
            }
        }

        for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }

        next_btn.classList.add("show");
    }

    option_list.addEventListener("click", function(event) {
        if (event.target.classList.contains("option")) {
            optionSelected(event.target);
        }
    });

    function showResult(){
        info_box.classList.remove("activeInfo"); 
        quiz_box.classList.remove("activeQuiz"); 
        result_box.classList.add("activeResult"); 
        const scoreText = result_box.querySelector(".score_text");
        if (userScore > 9){
            let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
            scoreText.innerHTML = scoreTag; 
        }
        else if(userScore > 5){
            let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
            scoreText.innerHTML = scoreTag;
        }
        else{
            let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    }

    function startTimer(time){
        counter = setInterval(timer, 1000);
        function timer(){
            timeCount.textContent = time; 
            time--; 
            if(time < 9){ 
                let addZero = timeCount.textContent; 
                timeCount.textContent = "0" + addZero; 
            }
            if(time < 0){ 
                clearInterval(counter); 
                timeText.textContent = "Time Off"; 
                const allOptions = option_list.children.length; 
                let correcAns = questions[que_count].answer; 
                for(i=0; i < allOptions; i++){
                    if(option_list.children[i].textContent == correcAns){ 
                        option_list.children[i].setAttribute("class", "option correct"); 
                        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                        console.log("Time Off: Auto selected correct answer.");
                    }
                }
                for(i=0; i < allOptions; i++){
                    option_list.children[i].classList.add("disabled"); 
                }
                next_btn.classList.add("show"); 
            }
        }
    }

    function startTimerLine(time){
        counterLine = setInterval(timer, 29);
        function timer(){
            time += 1; 
            time_line.style.width = time + "px"; 
            if(time > 549){ 
                clearInterval(counterLine); 
            }
        }
    }

    function queCounter(index){
        let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
        bottom_ques_counter.innerHTML = totalQueCounTag; 
    }

    const fiftyFiftyBtn = document.getElementById("fiftyFiftyBtn");

    fiftyFiftyBtn.addEventListener("click", function() {
        const correctAnswer = questions[que_count].answer;
        const options = document.querySelectorAll(".option");
        const incorrectIndexes = [];

        options.forEach((option, index) => {
            if (option.textContent !== correctAnswer) {
                incorrectIndexes.push(index);
            }
        });

        const randomIndex1 = incorrectIndexes[Math.floor(Math.random() * incorrectIndexes.length)];
        incorrectIndexes.splice(incorrectIndexes.indexOf(randomIndex1), 1);
        const randomIndex2 = incorrectIndexes[Math.floor(Math.random() * incorrectIndexes.length)];

        options[randomIndex1].style.display = "none";
        options[randomIndex2].style.display = "none";

        fiftyFiftyBtn.disabled = true;
    });

    const phoneFriendBtn = document.getElementById("phoneAFriendBtn");

    phoneFriendBtn.addEventListener("click", function() {
        const correctAnswer = questions[que_count].answer;
        const randomFriendResponse = Math.random() < 0.5 ? correctAnswer : getWrongAnswer(correctAnswer);

        alert(`You called a friend and they think the answer is "${randomFriendResponse}".`);

        phoneFriendBtn.disabled = true;
    });

    function getWrongAnswer(correctAnswer) {
        const options = document.querySelectorAll(".option");
        const wrongOptions = Array.from(options).filter(option => option.textContent !== correctAnswer);
        const randomIndex = Math.floor(Math.random() * wrongOptions.length);
        return wrongOptions[randomIndex].textContent;
    }

    const askTheAudienceBtn = document.getElementById("askTheAudienceBtn");

    askTheAudienceBtn.addEventListener("click", function() {
        const correctAnswer = questions[que_count].answer;

        alert(`Le public pense que la réponse est "${correctAnswer}".`);

        askTheAudienceBtn.disabled = true;
    })

})
.catch(error => {
    console.error('There was a problem fetching the data:', error);
});
