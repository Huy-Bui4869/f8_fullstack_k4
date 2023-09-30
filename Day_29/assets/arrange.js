var tableList = document.querySelector(".table-list")
var items = document.querySelectorAll(".item")
var root = document.querySelector("#root")


var isDrag = false; //Xác định hành động kéo thả.
var offsetX, offsetY;; //Lấy offset của element bị tác động.
var itemEl; //Element bị tác động.
var pre, next, newMin, newMax;


//Tạo bóng của element bị tác động và css.
var floating = document.createElement("div");

var css = {
    padding: "10px",
    border: "solid #fff",
    borderWidth: "0 1px 0 1px",
    cursor: "pointer",
    position: "absolute",
    // background: "#303742",
    background: "#4e84db",
    opacity: 0.6,
};
Object.assign(floating.style, css)

//Hàm cập nhật lại index.
var handleUpdateIndex = function () {
    var items = document.querySelectorAll(".item")
    var moduleIndex = 0, itemIndex = 0

    Array.from(items).forEach(function(item) {

        var itemChildren = item.children[0]
        
        if (itemChildren) {
            itemChildren.remove()
        }
        //check xem element đó là bài học hay chương.
        if (!item.classList.contains("module")) {
            //Đánh STT cho các bài học
            item.innerHTML = `<span class="moTa">Bài_${++itemIndex}: </span> ${item.innerText}`
        } else {
            //Đánh STT cho các chương học
            item.innerHTML = `<span class="moTa">Module_${++moduleIndex}: </span> ${item.innerText}`
        }
    })
};
handleUpdateIndex();

//Hàm thay đổi vị trí của element khi thỏa mãn đk.
function checkForConversion(curr) {
    if (curr < newMin) {
        //khi kéo element lên
        root.insertBefore(itemEl, pre)
        newMin = newMin - itemEl.clientHeight;
        newMax = newMax - itemEl.clientHeight;

    } else if (curr > newMax) {
        //khi kéo element xuống
        root.insertBefore(itemEl, next)
        newMax = newMax + itemEl.clientHeight;
        newMin = newMin + itemEl.clientHeight;
    }

    var items = document.querySelectorAll(".item")
    handleMouseDown(items)
}

var handleMouseDown = function (items) {
    Array.from(items).forEach(function (item) {
        item.addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation()
            //Xác định hành động kéo.
            isDrag = true

            //Lấy itemEl bị tác động
            if (e.target.classList.contains("moTa")) {
                itemEl = e.target.parentElement;
            } else {
                itemEl = e.target;
            }

            //Lấy vị trí khi bấm chuột xuống element cần tác động.
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            clientY = e.clientY;

            //Giới hạn để el lên hoặc xuống
            newMax = clientY + itemEl.clientHeight
            newMin = clientY - itemEl.clientHeight

            //Hiện bóng của element khi bấm chuột xuống.
            floating.style.width = `${itemEl.clientWidth}px`
            floating.innerText = itemEl.innerText
            document.body.append(floating)     
        })
    });
};
handleMouseDown(items)

document.addEventListener("mousemove", function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (isDrag) {

        //vị trí element bị chèn khi kéo lên - xuống.
        pre = itemEl.previousElementSibling
        next = itemEl.nextElementSibling.nextElementSibling;

        //Tạo bóng
        itemEl.style.opacity = 0.6

        //vị trí của bóng khi di chuyển.
        floating.style.top = `${e.clientY - offsetY}px`;
        floating.style.left = `${e.clientX - offsetX}px`

        checkForConversion(e.clientY)
    }
});

document.addEventListener("mouseup", function (e) {
    e.stopPropagation()
    isDrag = false;
    itemEl.style.opacity = 1;

    //Xóa bóng
    floating.remove();

    handleUpdateIndex()
});