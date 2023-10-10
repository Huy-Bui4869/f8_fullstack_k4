const counter = document.querySelector(".counter")
const linkBtn = document.querySelector(".link-btn")
linkBtn.style.cursor = "no-drop"

const totalTime = 5;
var requestId, start;

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function checkTimes(timeStamp) {
  
  if (start === undefined) {
    start = timeStamp;
  }

  //Tạo bộ đếm tính theo giây
  let count = totalTime - parseInt((timeStamp - start) / 1000);

  counter.textContent = count;

  if (count > 0) {
    requestId = requestAnimationFrame(checkTimes);
  }
  if (count === 0) {
    linkBtn.disabled = false;
    linkBtn.style.cursor = "pointer"
  }
}

document.addEventListener("visibilitychange", (e) => {
  if (document.visibilityState === "visible") {
    requestAnimationFrame(checkTimes)
  } else {
    cancelAnimationFrame(requestId)
  }
});

// requestAnimationFrame(checkTimes)

// open(url, target)
linkBtn.addEventListener("click", function () {
  // console.log("click me");
  window.open("https://fullstack.edu.vn", "_blank")
});