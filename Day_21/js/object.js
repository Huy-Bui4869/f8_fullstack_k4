// # Bài 1
// Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter
// Yêu cầu chi tiết:
// Hàm return về giá trị
// Ép ràng buộc kiểu dữ liệu là số
// Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi.
function getTotal(str, ...args) {

    for (var i in args) {

        args[i] = +args[i];
        if (!isNaN(args[i]) && args[i] !== isFinite && typeof args[i] === "number") {
            // console.log(args[i]);
            str += args[i]
        } else {
            return "dữ liệu truyền vào không hợp lệ";
        }
    };
    return str;

}

console.log(getTotal(1, 3, "-4", 5, "6"));



// # Bài 3
// Chuyển đổi mảng 1 chiều thành dạng lồng (nested)
var datas =
[
    {id: 1, name: "Chuyên mục 1", parent: 0,},
    {id: 2, name: "Chuyên mục 2", parent: 0},
    {id: 3, name: "Chuyên mục 3", parent: 0},
    {id: 4, name: "Chuyên mục 2.1", parent: 2},
    {id: 5, name: "Chuyên mục 2.2", parent: 2},
    {id: 6, name: "Chuyên mục 2.3", parent: 2},
    {id: 7, name: "Chuyên mục 3.1", parent: 3},
    {id: 8, name: "Chuyên mục 3.2", parent: 3},
    {id: 9, name: "Chuyên mục 3.3", parent: 3},
    {id: 10, name: "Chuyên mục 2.2.1", parent: 5},
    {id: 11, name: "Chuyên mục 2.2.2", parent: 5},
];

function buildTree(arr, parentId = 0) {
    var result = [];
  
    for (var value of arr) {      
        if (value.parent === parentId) {

            var children = buildTree(arr, value.id)
            if (children.length > 0) { 
                value.children = children;
            }
            delete value.parent;

            result.push(value)
        }
    };
    return result;
};

console.log(buildTree(datas));

// # Bài 4
// Viết lại vòng lặp reduce() trong Array bằng cách sử dụng Prototype trong Javascript
var numbers = [1, 2, 3, 4, 5, 6];

Array.prototype.reduce2 = function (cb, initialValue) {
    var prev = (initialValue === undefined) ? this[0] : initialValue;

    for (var i = 0; i < this.length; i++) {
        if (i === 0) {
            if (initialValue === undefined) {
                continue;
            }
        }
        prev = cb(prev, this[i])
    }

    return prev;
}

var result = numbers.reduce(function (pre, current) {
    return pre + current
});
var result2 = numbers.reduce2(function (pre, current) {
    console.log(pre, current);
    return pre + current;
});

console.log(result); //21.
console.log(result2); //21.

   // if (initialValue === undefined) {
    //     prev = this[0];
    //     for (var i = 1;i < this.length; i++) {
    //         newPrev = cb(prev, this[i])
    //         prev = newPrev;
    //     }
    //     return prev;
    // } else {
    //     prev = initialValue;
    //     for (var i = 0;i < this.length; i++) {
    //         returnPrev = cb(prev, this[i])
    //         prev = returnPrev;
    //     }
    //     return prev;
    // }