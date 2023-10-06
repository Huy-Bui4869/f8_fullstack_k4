const counter = document.querySelector(".counter")
const linkBtn = document.querySelector(".link-btn")
linkBtn.style.cursor = "no-drop"

const totalTime = 20;
let requestId, start;

function checkTimes(timeStamp) {
  
  if (start === undefined) {
    start = timeStamp;
  }

  //Tạo bộ đếm tính theo giây
  let count = totalTime - parseInt((timeStamp - start) / 1000);

  counter.textContent = count;

  if (count > 0) {
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

linkBtn.addEventListener("click", function () {
  // console.log("click me");
  window.location.href="https://fullstack.edu.vn"
});