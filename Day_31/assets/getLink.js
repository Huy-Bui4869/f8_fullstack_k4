const counter = document.querySelector(".counter")
const linkBtn = document.querySelector(".link-btn")

// let count;
let totalTime = 20;
let stopId, start;

function checkTimes(currTime) {
  // console.log(currTime);
  
  if (start === undefined) {
    start = currTime
  }

  //Tạo bộ đếm tính theo giây
  // let curr = Math.floor((currTime - start) / 1000);
  // let count = totalTime - curr;
  let count = totalTime - parseInt((currTime - start) / 1000);
  console.log(count);

  counter.textContent = count;

  if (count >= 0) {
    stopId = requestAnimationFrame(checkTimes);
  } else {
    // count = 0
    linkBtn.disabled = false;
    linkBtn.style.cursor = "pointer"
    linkBtn.addEventListener("click", function () {
      // console.log("click me");
      window.location.href="https://fullstack.edu.vn"
    });
  }
}

window.onload = function () {
  linkBtn.disabled = true;
  linkBtn.style.cursor = "no-drop"

};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === 'visible') {
    window.requestAnimationFrame(checkTimes)
  } else {
    cancelAnimationFrame(stopId)
  }
});
