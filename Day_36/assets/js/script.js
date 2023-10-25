import { config } from "./config.js";
import { client } from "./client.js";

const startUp = document.querySelector(".start-up");
const btnStartUp = document.querySelector(".btn-start-up");

//Bộ đếm t.gian trc khi bắt đầu.
const timeStartUp = document.createElement("div");
timeStartUp.classList.add("time-start-up");

let questionCounter = 0; //STT của các câu hỏi
let acceptingAnswers = false;
let global; //lưu đáp án đúng lấy từ server.
const SCORE = 1000;
let TOTAL_SCORE = 0; //Tổng điểm
let numberCorrect = 0; //Số câu đúng.
let numberIncorrect = 0; //Số câu sai.
let count = 5;

//Sự kiện bắt đầu khi bấm Start.
btnStartUp.addEventListener("click", () => {
  btnStartUp.style.display = "none";
  // btnStartUp.remove();
  startUp.append(timeStartUp);

  startGame(count);
});

//Hàm delay trước khi bắt đầu.
function startGame(count) {
  if (count === 0) {
    timeStartUp.innerText = "GO!";
    setTimeout(() => {
      multipleChoice.start();
    }, 1000);

    return;
  } else {
    timeStartUp.innerText = count;
  }

  setTimeout(() => {
    count--;
    startGame(count);
  }, 1000);
}

//Hàm xử lý các tính năng
const multipleChoice = {
  rootEl: document.querySelector(".app"),

  query: {
    _sort: "id",
    _order: "desc",
  },

  renderHtml: function () {
    this.rootEl.innerHTML = `
      <div class="currTime">
          <div class="range">
              <div class="currRange"></div>
          </div>
          <div class="counter">
              <div class="pages">
                  <span class="currPage"></span>
                  /
                  <span class="totalPage"></span>
              </div>
              <div class="streak"></div>
              <div class="score">SCORE: <span class="text-score">0</span></div>
          </div>
      </div>
      <div class="text-bottom">
          <div class="question"></div>
          <div class="answer" data-id="">
              <span>A. </span>
              <span class="content"></span>
          </div>
          <div class="answer" data-id="">
              <span>B. </span>
              <span class="content"></span>
          </div>
          <div class="answer" data-id="">
              <span>C. </span>
              <span class="content"></span>
          </div>
          <div class="answer" data-id="">
              <span>D. </span>
              <span class="content"></span>
          </div>
      </div>
    `;
  },

  //Lấy dữ liệu từ server
  getmultiplesAPI: async function (query = {}) {
    let queryString = new URLSearchParams(query).toString();

    queryString = queryString ? "?" + queryString : "";

    const { data: multiples } = await client.get(`/multiple${queryString}`);
    let newMuitiples = [...multiples];
    // console.log(newMuitiples.length, newMuitiples);
    this.getNewQuestion(newMuitiples, multiples);
  },

  getNewQuestion: function (newMultiples, multiples) {
    if (newMultiples.length === 0) {
      console.log("Heets caau hoit");
      this.renderEndGame();
      return null;
    }
    //Lấy và tăng STT của câu hỏi.
    const currPage = this.rootEl.querySelector(".currPage"); //stt câu hoit
    const totalPage = this.rootEl.querySelector(".totalPage"); //tổng sô câu
    const questionEl = this.rootEl.querySelector(".question");
    const content = this.rootEl.querySelectorAll(".content");

    //Stt câu hỏi
    currPage.innerText = 1 + questionCounter++;
    totalPage.innerText = multiples.length;

    //Random câu hỏi.
    const questionIndex = Math.floor(Math.random() * newMultiples.length);

    const cauDuocChon = newMultiples[questionIndex]["id"];
    const c = multiples.find(({ id }) => id === cauDuocChon);

    const { question, correct, answerOptions } = c;
    questionEl.innerText = question;
    global = correct;

    //Render câu trả lời
    content.forEach((item, i) => {
      answerOptions.forEach(({ id, content }, j) => {
        if (i === j) {
          item.innerText = content;
          item.parentElement.dataset.id = id;
        }
      });
    });

    newMultiples.splice(questionIndex, 1);
    this.handleClickAnswer(newMultiples, multiples);
    acceptingAnswers = true;
  },

  //Xử lý hành động click render ra kết quả.
  handleClickAnswer: function (newMultiples, multiples) {
    let times = 10000;
    const answerAll = this.rootEl.querySelectorAll(".answer");
    const that = this;
    // console.log(correct);

    answerAll.forEach((answer) => {
      answer.addEventListener("click", (e) => {
        e.preventDefault();
        let elClick;
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        if (e.target.classList.contains("content")) {
          elClick = e.target.parentElement;
        }
        if (e.target.classList.contains("answer")) {
          elClick = e.target;
        }

        let checkId = +elClick.dataset["id"]; //Lấy id của đáp án
        let classToApp = checkId === global ? "correct" : "incorrect";

        elClick.classList.add(classToApp);
        if (classToApp === "correct") {
          numberCorrect++;
          that.getTotalStore();
        }

        if (classToApp === "incorrect") {
          numberIncorrect++;
        }

        setTimeout(() => {
          elClick.classList.remove(classToApp);
          that.getNewQuestion(newMultiples, multiples);
        }, 500);
      });
    });

    //Tự động chuyển câu hỏi mới khi hết tgian.
    setTimeout(() => {
      that.getNewQuestion(newMultiples, multiples);
    }, times);
  },

  getTotalStore: function () {
    const score = this.rootEl.querySelector(".text-score");
    console.log(score);
    TOTAL_SCORE += SCORE;
    score.innerText = TOTAL_SCORE;
  },

  renderEndGame: function () {
    this.rootEl.innerHTML = `
      <div class="end-game">
      <h3>Game performance</h3>
      <div class="content-end">
        <div class="accuracy">
          <h4>Accuracy</h4>
          <div class="sub-accuracy"></div>
        </div>
        <div class="score-end result-end">
          <span>${TOTAL_SCORE}</span>
          <p>Score</p>
        </div>
        <div class="streak-end result-end">
          <span>0</span>
          <p>Streak</p>
        </div>
        <div class="correct-end result-end">
          <span>${numberCorrect}</span>
          <p>Correct</p>
        </div>
        <div class="incorrect-end result-end">
          <span>${numberIncorrect}</span>
          <p>Incorrect</p>
        </div>
      </div>
      <button class="btnPlayAgain">Play Again</button>
    </div>
    `;
    // this.handlePlayAgain();
  },

  // handlePlayAgain: function () {
  //   const playAgain = this.rootEl.querySelector(".btnPlayAgain");
  //   // console.log(playAgain);
  //   const that = this;
  //   playAgain.addEventListener("click", () => {
  //     console.log("play again");
  //     that.rootEl.innerHTML = `
  //       <div class="start-up">
  //         <button class="btn-start-up">START</button>
  //       </div>
  //     `;
  //     that.rootEl.style.justifyContent = "center";
  //     questionCounter = 0;
  //     acceptingAnswers = false;
  //     TOTAL_SCORE = 0;
  //     numberCorrect = 0;
  //     numberIncorrect = 0;
  //     //   that.start();
  //     // count = 5;
  //     startGame();
  //   });
  // },

  start: function () {
    startUp.style.display = "none";
    this.rootEl.style.justifyContent = "space-between";
    // questionCounter = 0;
    this.getmultiplesAPI(this.query);
    this.renderHtml();
  },
};
