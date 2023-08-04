/*
Bài 1: Hoán vị 2 số
 Input: Cho trước 2 số a, b

 Output: Thực hiện hoán vị 2 số không dùng biến trung gian
*/
var a = 8,
    b = 6;

a += b; // 18
b = a - b; // 8
a = a - b; // 10
// b = (a + b) - a;

console.log(`Kết quả là: ${a} ${b}`);


/*
Bài 2: Thực hiện phép toán
 S = 10 + 20 + 5^10 / 2
*/
var S = 10 + 20 + 5**10 / 2;

console.log(S);


/*
Bài 3: Tìm số lớn nhất
 Input: cho trước 3 số a, b, c

 Output: Tìm số lớn nhất trong 3 số và hiển thị kết quả
*/
var j = 37,
    k = 223,
    m = 223,
    biggestNumber;

if (j >= k && j >= m) {
    biggestNumber = j;
} else if (k >= j && k >= m) {
    biggestNumber = k;
} else if (m >= j && m >= k) {
    biggestNumber = m;
}
console.log(`Số lớn nhất là : ${biggestNumber}`)


/*
Bài 4: Kiểm tra số cùng dấu

Input: Cho trước 2 số a, b

Output:
Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình
*/

var i = 1,
    d = -2;
    
var e = i * d;

if (e > 0) {
    document.write(`Hai số ${i}, ${d} cùng dấu`)
} else if (e < 0) {
    document.write(`Hai số ${i}, ${d} trái dấu`)
} else {
    document.write(`Hai số ${i}, ${d} có số bằng 0`)
}


/*
Bài 5: Sắp xếp 3 số
Input: Cho trước 3 số a, b, c

Output:
Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
*/

var z = 10, x = 18, c = 0,
    biggest = z;

if (z > x) {
    z = x // 18
    x = biggest // 10
}
// 10, 18, 0
if (z > c) {
    z = c // 0
    c = biggest // 10
}
// 0, 18, 10
if (x > c) {
    biggest = x // 18
    x = c // 10
    c = biggest // 18
}
// 0, 10, 18

console.log(`Sắp xếp 3 số tăng dần ${z}, ${x}, ${c}`);


// var z = 2, x = 0, c = -4,
//     smallest, biggest;

// if (z <= x && z <= c) {
//     smallest = z;
// } else if (x <= z && x <= c) {
//     smallest = x;
// } else if (c <= x && c <= z) {
//     smallest = c;
// }

// if (z >= x && z >= c) {
//     biggest = z;
// } else if (x >= z && x >= c) {
//     biggest = x;
// } else if (c >= x && c >= z) {
//     biggest = c;
// }

// var fit = (z + x + c) - smallest - biggest;

// console.log(`Sắp xếp ${smallest}, ${fit}, ${biggest}`);