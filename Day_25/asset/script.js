var $ = function (tag) {
    return document.querySelector(tag)
};
var $$ = function (tagAll) {
    return document.querySelectorAll(tagAll)
};

var carousel = $(".carousel")
var carouselInner = carousel.children[0];
var items = carouselInner.children;
var next = $(".carousel-nav .next")
var prev = $(".carousel-nav .prev")

//lấy kích thước của 1 item
var itemWidth = carouselInner.clientWidth;
//Tổng kích thước 
var totalWidth = itemWidth * items.length 
console.log(itemWidth, totalWidth);

//Cập nhật kích thước.
carouselInner.style.width = `${totalWidth}px`; 

var position = 0, index;
function handleEffectsSwipes(a, b) {
    if (a === "next") {
        if (Math.abs(position) + itemWidth * 2 > totalWidth) return //Điều kiện dừng  
        position -= itemWidth; //Bấm next trừ đi kích thước của 1 item.
    } else if (a === "prev") {
        if (Math.abs(position) < itemWidth) return //Điều kiện dừng
        position += itemWidth;
    }

    carouselInner.style.translate = `${position}px`;
    if (b === "effect") {
        carouselInner.style.transition = null;
        swiping = true;
    }
    index = position / itemWidth;
};

function getDots() {
    spanAll.forEach(function (value, i) {
        if (value.classList.contains("active")) {
            value.classList.remove("active")
        }
        if (Math.abs(index) === i) {
            value.classList.add("active")
        }
    })
};

//Lắng nghe sk của next
next.addEventListener("click", function () {
    handleEffectsSwipes("next", "noEffect");
    getDots();
});

//Lắng nghe sk của prev
prev.addEventListener("click", function () {
    handleEffectsSwipes("prev", "noEffect");
    getDots();
});

// HÀNH ĐỘNG VUỐT SLIDE
var swiping = true;
var offsetX;
carouselInner.addEventListener("mousedown", function (e) {
    e.preventDefault()
    swiping = false
    offsetX = e.offsetX; //Vị trí bấm chuột xuống
});

carouselInner.addEventListener("mousemove", function (e) {
    e.preventDefault()
    if (!swiping) {
        var result = e.offsetX - offsetX //Khoảng cách đã vuốt.
        var checkWidth = itemWidth * 0.1; //điều kiện để chuyển slide.(10)
        
        carouselInner.style.translate = `${position + result}px`; //khi vuốt ảnh di chuyển theo__ 0 + "khoảng cách vuốt"
        carouselInner.style.transition = "none"; //Bỏ hiệu ứng để k bị deloy.

        //next__res < 0; pre__res > 0
        if (result < 0) {
            if (Math.abs(result) > checkWidth) { //khi thỏa mãn đk vuốt__hơn 10%
                handleEffectsSwipes("next", "effect");
            }
        } else {
            if (Math.abs(result) > checkWidth) {
                handleEffectsSwipes("prev", "effect");
            }
        }
    }
});

carouselInner.addEventListener("mouseup", function (e) {
    e.preventDefault()
    handleEffectsSwipes(1, "effect");
    getDots();
});

//Dots
var isDots = $(".dots-list");
var arr = [];

for (var i = 0; i < items.length; i++) {
    arr[arr.length] = items[i]
};

var newArr = arr.map(function (a) {
    return `<span></span>`
});
isDots.innerHTML = newArr.join("");

var spanAll = $$(".dots-list span");

spanAll.forEach(function (value, i) {
    if (i === 0) {
        value.classList.add("active")
    }

    value.addEventListener("click", function () {
        position = -1 * itemWidth * i
        carouselInner.style.translate = `${position}px`;
   
        for (var j = 0; j < spanAll.length; j++) {

            if (spanAll[j].classList.contains("active")) {
                spanAll[j].classList.remove("active")
            }
        }
        value.classList.add("active");
    });
});