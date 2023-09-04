console.log("Bài tập 1");
// # Bài 1
// Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter
// Yêu cầu chi tiết:
// Hàm return về giá trị
// Ép ràng buộc kiểu dữ liệu là số
// Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi
function getSum(str, ...args) {
    for (var value of args) {

        value = +value;
        if (!isNaN(value) && value !== isFinite && typeof value === "number") {
            str += value
        } else {
            return "dữ liệu truyền vào không hợp lệ";
        }
    };
    return str;
};

console.log(getSum(2, 3, 4, "1"));




console.log("Bài tập 2");
// # Bài 2
// Viết 1 phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị
// Kết quả sẽ hiển thị ra kết định dạng kèm đơn vị tiền tệ.
var price = "12000000"; 

Object.prototype.getCurrency = function (unit) {
    var value = +this;

    if (isNaN(value) || value === Infinity || typeof value !== "number") return `số không hợp lệ`;

    return value .toLocaleString("en-US") + " " + unit;
};

// Object.prototype.getCurrency = function(unit) {
//     var value = +this;

//     if (isNaN(value) || value === Infinity || typeof value !== "number") return "so khong hop le"
//     var arr = value.toString().split("").reverse();

//     for (var i = 0; i < arr.length; i += 4) {
//         arr.splice(i, 0, ",")
//     }
//     arr.shift();

//     return arr.reverse().join("") + " " + unit;
// };

console.log(price.getCurrency("đ"));



console.log("Bài tập 3");
// # Bài 3
// Viết lại hàm push() trong Array. Đặt tên là push2()
var colors = ["black", "brow", "red", "orange"];
var n = "yellow", c = "green";

Array.prototype.push2 = function (n) {
    var arrs = this, count;
    arrs[arrs.length] = n;
    // console.log(arrs);
    for (var i = 1; i <= arrs.length; i++) {
            count = i
    }
    return count;
}

colors.push2(n)
colors.push2(c);
var arrColor2 = colors.push2("blue");
console.log(arrColor2);
console.log(colors);




console.log("Bài tập 4");
// # Bài 4
// Viết làm vòng lặp filter trong Array. Đặt tên là filter2()
var users = ["Nam", "Dũng", "An", "Hoàng", "Lan"];

Array.prototype.filter2 = function (cb) {
    var arr = this, newArr = [];

    for (var i = 0; i < arr.length; i++) {
        var a = cb(arr[i], i);
        if (a) {
            newArr[newArr.length] = arr[i];
        }
    }
    return newArr;
}

var result2 = users.filter2(function (user) {
    // console.log((user));
    if (user === "An" || user === "Dũng") {
        return true;
    }
});
var result = users.filter(function (user) {
    if (user === "An" || user === "Dũng") {
        return true;
    }
});

console.log(result);
console.log(result2);




// # Bài 5:
// Chuyển mảng sau thành dạng thẻ html select option
var categories = [
  {id: 1, name: "Chuyên mục 1"},
  {id: 2,name: "Chuyên mục 2", children: [
      {id: 4, name: "Chuyên mục 2.1"},
      {id: 5,name: "Chuyên mục 2.2", children: [
          {id: 10, name: "Chuyên mục 2.2.1"},
          {id: 11, name: "Chuyên mục 2.2.2"},
          {id: 12, name: "Chuyên mục 2.2.3"}
        ],
      },
      {id: 6, name: "Chuyên mục 2.3"}
    ]
  },
  {id: 3, name: "Chuyên mục 3", children: [
      {id: 7, name: "Chuyên mục 3.1"},
      {id: 8, name: "Chuyên mục 3.2"},
      {id: 9, name: "Chuyên mục 3.3"}
  ]}
];

var arrA = [];
function flatten(arr) {
    arr.forEach(function (value) {
        arrA[arrA.length] = (value.name).trim().slice(((value.name).lastIndexOf(" ") + 1));

        if (value.children) {
            flatten(value.children)
        }
    });
    return arrA;
};

var datas = function (arrs) {
    var newArrs = flatten(arrs), count = 0;

    return newArrs.map(function (element) {
        var selective = element.split(""), icon = ``;

        for (var i in selective) {
            if (selective[i] === ".") {
                icon += `--|`;
            }
        }
        return `<option value="${count++}">${icon}Chọn chuyên mục ${element}</option>`
    });
}

var options = datas(categories).join("");

document.write(`
    <select name="selects" id="" class="selects">
        <option value="">Chọn chuyên mục</option>
        ${options}
    </select>
`);