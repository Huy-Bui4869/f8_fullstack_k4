const btnFile = document.querySelector(".file")
const subDropdown = btnFile.nextElementSibling;
const content = document.querySelector(".content")

const btnNew = subDropdown.children[0]
const btnTXT = subDropdown.children[1]
const btnPDF = subDropdown.children[2]
const fileName = document.querySelector(".file-name")

const tools = document.querySelector(".tools")
const btnBold = document.querySelector(".tools .bold-btn")
const btnLine = document.querySelector(".tools .underline-btn")
const btnItalic = document.querySelector(".tools .italic-btn")
const btnColor = document.querySelector(".tools .color-btn")
//Tự động forcus khi load trang xong
content.focus();

//Xây dựng bộ đếm
var counter = document.querySelector("#counter")

var characters = document.createElement("span")
var words = document.createElement("span")

characters.innerHTML = `Số ký tự: `
words.innerHTML = `Số từ: `

counter.appendChild(characters)
counter.appendChild(words)
var number = document.createTextNode(0);
var number2 = document.createTextNode(0);

characters.append(number)
words.append(number2)

content.addEventListener("keyup", function (e) {
    var text = this.innerText.trim()
    
    // //lấy số ký tự
    var numberCharacters = text.length;
    number.data = numberCharacters

    var numberWords;
    //Lấy số từ
    if (text.length) {
        numberWords = text.replaceAll('\n', " ").split(" ").length
    } else {
        numberWords = 0
    }

    number2.data = numberWords;
});

// document.execCommand(tenLenhThucThi, hienThi, giaTri)

btnBold.addEventListener("click", function () {
    document.execCommand("bold")
});

btnLine.addEventListener("click", function () {
    document.execCommand("underline")
});

btnItalic.addEventListener("click", function () {
    document.execCommand("italic") 
});

btnColor.addEventListener("input", function () {
    document.execCommand("foreColor", true, btnColor.value) 
});

//Sự kiện đóng mở file.
btnFile.addEventListener("click", function (e) {
    e.stopPropagation()

    if (!subDropdown.classList.contains("active")) {
        subDropdown.classList.add("active")
    } else {
        subDropdown.classList.remove("active")
    }
});

//Đóng tab file khi click ra ngoài
document.addEventListener("click", function () {
    if (subDropdown.classList.contains("active")) {
        subDropdown.classList.remove("active")
    }
});

//Tạo file mới.
btnNew.addEventListener("click", function () {
    content.innerText = "";
    fileName.value = ""
    btnColor.value = "#000000"
});

//Download file dạng TXT.
btnTXT.addEventListener("click", function () {
    var blob = new Blob([content.innerText])

    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${fileName.value}.txt`
    link.click()
    
});

//Download file dạng PDF.
btnPDF.addEventListener("click", function () {
    html2pdf().from(content.innerText).save(fileName.value);
});

//hiệu ứng khi click các nút công cụ.
Array.from(tools.children).forEach((btn) => {
    if (btn === btnColor) {
        return;
    }
    btn.addEventListener("mousedown", function () {
        this.style.scale = 0.9;
    });
    btn.addEventListener("mouseup", function () {
        this.style.scale = "";
    });
})