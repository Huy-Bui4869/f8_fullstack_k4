var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");

//Yêu cầu: Chuyển đổi hết thành phần trăm (%)

var handleUpdateValue = function (value) {
  progress.style.width = `${value}%`;
};

//Tính độ dài của progress-bar
var progressBarWidth = progressBar.clientWidth;
var isDrag = false; //Cắm cờ
var initialClientX;
var initialValue = 0;
var value;

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    var offsetX = e.offsetX;
    value = (offsetX * 100) / progressBarWidth;
    initialValue = value;
    initialClientX = e.clientX;
    isDrag = true;
    handleUpdateValue(value);

    var currentTime = (value / 100) * audio.duration;

    currentTimeEl.innerText = getTime(currentTime);

    audio.currentTime = currentTime;
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  if (e.which === 1) {
    isDrag = true;
    initialClientX = e.clientX;
  }
});

document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    value = (moveWidth * 100) / progressBarWidth;
    value = initialValue + value;

    if (value < 0) {
      value = 0;
    }

    if (value > 100) {
      value = 100;
    }

    handleUpdateValue(value);

    var currentTime = (value / 100) * audio.duration;

    currentTimeEl.innerText = getTime(currentTime);

    timePreview.classList.remove("show");
    timePreview.innerText = 0;
    timePreview.style.left = 0;
  }
});

document.addEventListener("mouseup", function () {
  if (isDrag) {
    isDrag = false;
    initialValue = value;

    var currentTime = (value / 100) * audio.duration;
    audio.currentTime = currentTime;
  }
});

progressSpan.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});

//Xây dựng trình phát nhạc
var audio = document.querySelector(".audio");
var durationEl = progressBar.nextElementSibling;
var currentTimeEl = progressBar.previousElementSibling;
var playBtn = document.querySelector(".play-btn");
var pauseBtnIcon = `<i class="fa-solid fa-pause"></i>`;
var playBtnIcon = `<i class="fa-solid fa-play"></i>`;
var timePreview = progressBar.querySelector(".time-preview");

var getTime = function (seconds) {
  //Giây => Phút và giây
  var mins = Math.floor(seconds / 60);
  seconds -= mins * 60;
  seconds = Math.floor(seconds);

  return `${mins < 10 ? `0${mins}` : mins}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
//Lắng nghe sự kiện load xong nhạc
audio.addEventListener("loadeddata", function () {
  //lấy tổng thời gian của bài hát
  durationEl.innerText = getTime(audio.duration);
});

playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseBtnIcon;
  } else {
    audio.pause();
    this.innerHTML = playBtnIcon;
  }
});

audio.addEventListener("timeupdate", function () {
  //Lấy ra tỷ lệ phần trăm dựa vào currentTime và duration
  var value = (audio.currentTime * 100) / audio.duration;

  if (!isDrag) {
    currentTimeEl.innerText = getTime(audio.currentTime);

    handleUpdateValue(value);
    checkInLyric(lyrics);
  }
});
progressBar.addEventListener("mousemove", function (e) {
  timePreview.classList.add("show");
  var rate = (e.offsetX * 100) / progressBarWidth;
  var currentTime = (rate / 100) * audio.duration;
  timePreview.innerText = getTime(currentTime);
  timePreview.style.left = `${e.offsetX}px`;
});

progressBar.addEventListener("mouseout", function () {
  timePreview.classList.remove("show");
  timePreview.innerText = 0;
  timePreview.style.left = 0;
});

audio.addEventListener("ended", function () {
  playBtn.innerHTML = playBtnIcon;
  handleUpdateValue(0);
  audio.currentTime = 0;
});

audio.addEventListener("play", function () {
  playBtn.innerHTML = pauseBtnIcon;
});

audio.addEventListener("pause", function () {
  playBtn.innerHTML = playBtnIcon;
});

//_BEGIN.........
//_Xây dựng tính năng karaoke...............................
function layoutWalk() {
  if (divTop.classList.contains("effect")) {
    divTop.classList.remove("effect")
  }
  if (divBottom.classList.contains("effect")) {
    divBottom.classList.remove("effect")
  }

  divTop.innerText = "Tát nước đầu đình"
  divBottom.innerText = "calvados"
}
//layout
function renderLyrics() {}
var karaoke = document.createElement("div");
karaoke.innerHTML = `
    <div class="header">
        <div class="sub-header">
            <span>Karaoke</span>
            <i class="fa-solid fa-angles-down"></i>
        </div>
    </div>`
karaoke.classList.add("box-karaoke")
document.body.append(karaoke)

var btnKaraoke = document.querySelector(".btn_el")
var header = karaoke.querySelector(".header")
var btnExit = header.children[0].children[1]

//hiện lời bài hát
var divText = document.createElement("div")
var divTop = document.createElement("p")
var divBottom = document.createElement("p")
divText.classList.add("html-music")

layoutWalk()
header.append(divText)
divText.append(divTop)
divText.append(divBottom)

//Đóng mở tính năng karaoke
btnKaraoke.addEventListener("click", function () {
  if (!karaoke.classList.contains("open")) {
    karaoke.classList.add("open")
    btnExit.style.rotate = "0deg"
  } else {
    karaoke.classList.remove("open")
  }
});

btnExit.addEventListener("click", function () {
  if (karaoke.classList.contains("open")) {
    karaoke.classList.remove("open")
  }
});

//
var lyricsObj = JSON.parse(lyric);
// var lyricsObj = JSON.parse(lyric2);
// console.log(lyricsObj);

//bắt đầu lấy dữ liệu
var lyrics = lyricsObj.data.sentences;

var nextStartTime; //thời gian bắt đầu của câu tiếp theo.
var check = true; //xác định câu phía trên là câu chắn hay lẻ.
var interludeMusic = false;//check xem có đang dạo nhạc hay không.

function checkInLyric(lyric) {
  lyric.forEach((objWords, i) => {
    // console.log(i, objWords.words);
    
    //Thời gian bắt đầu và kết thúc của một câu.
    var startTime = objWords.words[0].startTime
    var endTime = objWords.words[objWords.words.length - 1].endTime;

    //Thời gian hiện tại      
    var currTime = Math.floor(audio.currentTime * 1000);

    //Xác định hành động dạo nhạc
    if (interludeMusic) {
      if (i % 2 !== 0) {
        check = false
      }
    }
      
    if (currTime >= startTime && currTime <= endTime) {
      //lấy ra câu hiện tại và câu tiếp theo__tại currentTime
      var cauHienTai = [], cauKeTiep = [];

      if (i < (lyric.length - 1)) {

        objWords.words.forEach((arr) => {
          cauHienTai.push(arr.data)
        });

        (lyric[i + 1].words).forEach((arr) => {
          cauKeTiep.push(arr.data)
        });
  
        cauHienTai = cauHienTai.join(" ")
        cauKeTiep = cauKeTiep.join(" ")

        //Xý lý phần ẩn hiện lời_opacity...........
        var timeDelay = (startTime + endTime) / 2 //ms
        //Hiệu ứng
        divTop.style.transition = `opacity ${((timeDelay - startTime) / 1000 - 0.1)}s`
        divBottom.style.transition = `opacity ${((timeDelay - startTime) / 1000 - 0.1)}s`
  
        if (divTop.innerText === cauHienTai) {
          if (currTime < timeDelay) {
            divBottom.classList.add("effect")
          }
          if (currTime >= timeDelay) {
            divBottom.innerText = cauKeTiep
            divBottom.classList.remove("effect")
          }
        } else if (divBottom.innerText === cauHienTai) {

          if (currTime < timeDelay) {
            divTop.classList.add("effect")
          }
          if (currTime >= timeDelay) {
            divTop.innerText = cauKeTiep
            divTop.classList.remove("effect")
          }
        }

        //???
        if (check) {
          if (i % 2 === 0) {
            divTop.innerText = cauHienTai
          }
        } else {
          if (i % 2 !== 0) {
            divTop.innerText = cauHienTai
          }
        }
      }
    }

    //Xử lý logic phần dạo nhạc
    if (i < (lyric.length - 1)) {
      //Thời gian bắt đầu câu tiếp theo
      nextStartTime = lyric[i + 1].words[0].startTime
      // var nextEndTime = lyric[i + 1].words[(lyric[i + 1].words.length) - 1].endTime

      //Dạo nhạc khi thời gian giữa hai câu quá 5s...
      if ((nextStartTime - endTime) > 5000) {
        // console.log(check);
        // delay 1s sau đó hiện layout chờ...
        if (currTime > startTime && currTime < (endTime + 1000)) {
          var cauTruoc = [];
          (lyric[i - 1].words).forEach((value) => {
            cauTruoc.push(value.data)
          });
  
          if (divTop.innerText === cauHienTai) {
            if (divBottom.classList.contains("effect")) {
              divBottom.classList.remove("effect")
            }

            divBottom.innerText = cauTruoc.join(" ")

          } else if (divBottom.innerText === cauHienTai) {
            if (divTop.classList.contains("effect")) {
              divTop.classList.remove("effect")
            }

            divTop.innerText = cauTruoc.join(" ")
          }
        }
  
        //hiện lời bài hát sớm hơn 1s...
        if (currTime > endTime && currTime < (nextStartTime - 1000)) {
          layoutWalk()
          interludeMusic = true//Đang dạo nhạc.
        }
        if (currTime >= (nextStartTime - 1000) && currTime < nextStartTime) {
          //Hiện 2 câu kế tiếp khi dạo nhạc xong
          var keTiep = [],keTiep2 = [];
          var m = lyric[i + 1].words;
          var n = lyric[i + 2].words
          
          m.forEach(function (obj) {
            keTiep.push(obj.data)
          })
          n.forEach(function (obj) {
            keTiep2.push(obj.data)
          })

          keTiep = keTiep.join(" ")
          keTiep2 = keTiep2.join(" ")

          if (divTop.classList.contains("effect")) {
            divTop.classList.remove("effect")
          }
          if (divBottom.classList.contains("effect")) {
            divBottom.classList.remove("effect")
          }
          divTop.innerText = keTiep;
          divBottom.innerText = keTiep2;
        }
      }

    //Xử lý layout ở cuối bài hát
    } else if (i >= (lyric.length - 1)) {
      //Lấy index của từ cuối-tại dòng cuối cùng-của bài hát
      var indexEnd = (lyric[lyric.length - 1].words.length) - 1
      //lấy endTime của từ cuối cùng trong bài hát.
      var theEndTime = lyric[lyric.length - 1].words[indexEnd].endTime
      //delay_1s_trước khi hiện layout chờ ở cuối bài
      if (currTime > (theEndTime + 1000)) {
        layoutWalk()
      }
    }
  });
};

// if (check) {
//   //Câu chẵn ở trên_mặc định.
//   if (i % 2 === 0) {
//     divTop.innerText = cauHienTai
//     // divBottom.innerText = cauKeTiep //..............
//   } else {
//     // divTop.innerText = cauKeTiep //...........
//     divBottom.innerText = cauHienTai
//   }
// } else {
//   //Câu lẻ ở trên
//   //sau khi dạo nhạc xong nếu bđ từ câu lẻ thì sẽ đẩy câu lẻ_trên, chẵn_xuống dưới.
//   if (i % 2 !== 0) {
//     divTop.innerText = cauHienTai
//     // divBottom.innerText = cauKeTiep //...............
//   } else {
//     // divTop.innerText = cauKeTiep//............
//     divBottom.innerText = cauHienTai
//   }
// }
// console.log(check);