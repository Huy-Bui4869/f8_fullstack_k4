var $ = function (es) {
    document.querySelector(es)
}
//Tạo các element
var progressBar = document.querySelector(".progress-bar")
var progress = document.querySelector(".progress")
var progressSpan = progress.querySelector(".progress span")

var progressBarWidth = progressBar.clientWidth;
var initialClientX;
var value, isDrag = false;
var currentValue = 0;

var audio = document.querySelector("audio");
var currentTimeElFirt = progressBar.previousElementSibling;
var currentTimeElLast = progressBar.nextElementSibling;
var playBtn = document.querySelector(".play-btn");
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;

var timeSuggest = progressBar.querySelector(".time-suggest");

//Hành động click vào vị trí bất kỳ trog progressBar để tua
progressBar.addEventListener("mousedown", function (e) {
    if (e.which === 1) { //Sử dụng chuột trái
        value = (e.offsetX * 100) / progressBarWidth;//Lấy chiều dài thời lg theo tgian
        progress.style.width = `${value}%`
        //Click vị trí bất kỳ trên progressBar vẫn kéo được.
        document.addEventListener("mousemove", handleDrag)
        initialClientX = e.clientX
        currentValue = value;
        handleInput(value)
    }
});

var handleDrag = function (e) {
    isDrag = true;
    var moveWidth = e.clientX - initialClientX;
    value = ((moveWidth * 100) / progressBarWidth) + currentValue;
    if (value < 0) {
        value = 0;
    }
    if (value > 100) {
        value = 100;
    }
    progress.style.width = `${value}%`
    handleInput(value)
};

progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation(); //Chặn hành động nổi bọt của span.

    document.addEventListener("mousemove", handleDrag)
    initialClientX = e.clientX
});

document.addEventListener("mouseup", function () {
    isDrag = false
    handleChange(value)
    document.removeEventListener("mousemove", handleDrag) 
    currentValue = value; //Lưu lần cuối cùng khi nhả chuột.
});

//Hàm nhận giá trị khi kéo và bấm chuột xuống.
var times = 0;
//1..Nhả chuột.
var handleChange = function (value) {
    
};
var abc;
//2..Bấm chuột xuống và kéo
var handleInput = function (value) {//value__%.width
    times = (audio.duration * value) / 100;
    currentTimeElFirt.innerText = getTime(times);
    // audio.currentTime = times;
    if (!isDrag) {
        audio.currentTime = times;
    }
};

//Hàm quy đổi tgian
var getTime = function (seconds) {
    var min = Math.floor(seconds / 60) //lấy phút
    second = Math.floor(seconds - min * 60)
    return `${min < 10 ? "0" + min : min}:${second < 10 ? "0" + second : second}`
};

//Lắng nghe sự kiện loadeddata => khi nào file tải xong.
audio.addEventListener("loadeddata", function () {
    currentTimeElLast.innerText = getTime(audio.duration)
    var time;
    progressBar.addEventListener("mousemove", function (e) {
        timeSuggest.style.left = `${e.offsetX}px`;
        time = (e.offsetX * 100) / progressBarWidth;
        timeSuggest.innerText = getTime((audio.duration) / 100 * time)
    })
});

playBtn.addEventListener("click", function () {
    if (audio.paused) { //paused = true => nhạc không phát
        audio.play();
    } else {
        audio.pause();
    }
});

//update width theo thời gian 
audio.addEventListener("timeupdate", function () {
    currentTimeElFirt.innerText = getTime(audio.currentTime)
    var value = (audio.currentTime * 100) / audio.duration;
    progress.style.width = `${value}%`
});

audio.addEventListener("play", function () {
    playBtn.innerHTML = pauseIcon
});

audio.addEventListener("pause", function () {
    playBtn.innerHTML = playIcon
});

//kết thúc bài reset.
audio.addEventListener("ended", function () {
    audio.currentTime = 0
    playBtn.innerHTML = playIcon
});