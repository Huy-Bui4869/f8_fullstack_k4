/*
Bài 1: Hoán vị 2 số
 Input: Cho trước 2 số a, b

 Output: Thực hiện hoán vị 2 số không dùng biến trung gian
*/
var a = 8,
    b = 6;

a = a + b; // 18
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

var z = 2,
    x = 10,
    c = 10,
    one,
    three;

var total = z + x + c;

if (z <= x && z <= c) {
    one = z;
} else if (x <= z && x <= c) {
    one = x;
} else if (c <= x && c <= z) {
    one = c;
}

if (z >= x && z >= c) {
    three = z;
} else if (x >= z && x >= c) {
    three = x;
} else if (c >= x && c >= z) {
    three = c;
}

var two = total - one - three
console.log(`Sắp xếp ${one} < ${two} < ${three}`);