var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const searchBox = document.querySelector("#search-box");
const btnVoice = document.querySelector(".btn-voice");

// Tạo một thể hiện mới của SpeechRecognition
const recognition = new SpeechRecognition();

// Đặt một số thuộc tính cho việc nhận diện
recognition.continuous = false;
recognition.lang = "vi-VN"; // Sử dụng tiếng Việt
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const div = document.createElement("div");
div.classList.add("notification");
searchBox.append(div);
const topContent = document.createElement("p");
const bottomContent = document.createElement("p");
div.append(topContent);
div.append(bottomContent);

let isDarg; //xác định hành động nói
let check;
function showNotification() {
  if (isDarg) {
    topContent.classList.add("active");
    topContent.innerHTML = "Hãy nói nội dung bạn muốn";
    bottomContent.innerText = "";
    bottomContent.classList.remove("style");
  } else {
    topContent.classList.remove("active");
    topContent.innerHTML = "Đã nói xong. Hy vọng kết quả như ý bạn.";
    bottomContent.classList.add("style");

    if (check) {
      bottomContent.innerText = "Đã thực hiện xong";
    } else {
      bottomContent.innerText = "Không thực hiện được yêu cầu";
    }
  }
}

function handleVoice(text) {
  console.log(`Kết quả nhận được: ${text}.`);
  isDarg = false;
  check = true;

  text = text.toLowerCase().replaceAll(".", "").replaceAll("?", "");
  console.log(text);

  switch (text) {
    case "facebook":
      window.open("https://facebook.com", "_blank");
      break;

    case "google":
      window.open("https://google.com", "_blank");
      break;

    case "youtube":
      window.open("https://youtube.com", "_blank");
      break;

    case "google drive":
      window.open("https://drive.google.com/drive", "_blank");
      break;

    case "google maps":
    case "bản đồ":
      window.open("https://www.google.com/maps", "_blank");
      break;

    default:
      if (
        text.includes("chỉ đường tới") ||
        text.includes("chỉ đường") ||
        text.includes("tới") ||
        text.includes("đường tới") ||
        text.includes("đến")
      ) {
        const location = text
          .replace("chỉ đường", "")
          .replace("chỉ đường tới", "")
          .replace("tới", "")
          .replace("đường tới", "")
          .replace("đến", "");

        window.open(`https://www.google.com/maps/place/${location}`, "_blank");
      } else if (
        text.includes("bài hát") ||
        text.includes("mở bài hát") ||
        text.includes("nghe bài hát")
      ) {
        const music = text
          .replace("bài hát", "")
          .replace("mở bài hát", "")
          .replace("nghe bài hát", "");

        window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${music}`, "_blank");
      } else if (
        text.includes("video") ||
        text.includes("mở video") ||
        text.includes("xem video")
      ) {
        const video = text
          .replace("video", "")
          .replace("mở video", "")
          .replace("xem video", "");

        window.open(
          `https://www.youtube.com/results?search_query=${video}`,
          "_blank"
        );
      } else {
        check = false;
      }
      break;
  }

  showNotification();
}

// Bắt đầu nhận diện khi màn hình được nhấp vào
btnVoice.onclick = () => {
  recognition.start();
  // console.log("Sẵn sàng nhận lệnh bằng giọng nói.");
  isDarg = true;

  showNotification();
};

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
  // Lấy chuỗi văn bản đã nhận diện được
  const text = event.results[0][0].transcript;

  // Xử lý chuỗi văn bản để biết được người dùng vừa đọc gì
  handleVoice(text);
};

// // Dừng nhận diện khi giọng nói kết thúc
recognition.onspeechend = () => {
  recognition.stop();
};
