"use strict";

const counter = document.querySelector(".counter")
const linkBtn = document.querySelector(".link-btn")

let totalTime = 20;
let requestId, start;

function checkTimes(currTime) {
  
  if (start === undefined) {
    start = currTime
  }

  //Tạo bộ đếm tính theo giây
  let count = parseInt((currTime - start) / 1000);

  counter.textContent = (totalTime - count);

  if ((totalTime - count) > 0) {
    requestId = requestAnimationFrame(checkTimes);
  } else {
    linkBtn.disabled = false;
    linkBtn.style.cursor = "pointer"
  }
}

// document.addEventListener("visibilitychange", (e) => {
//   if (document.visibilityState === "visible") {
//     requestAnimationFrame(checkTimes)
//   } else {
//     cancelAnimationFrame(requestId)
//   }
// });

requestAnimationFrame(checkTimes)

window.onload = function () {
  linkBtn.disabled = true;
  linkBtn.style.cursor = "no-drop"
};

linkBtn.addEventListener("click", function () {
  // console.log("click me");
  window.location.href="https://fullstack.edu.vn"
});