// Bài 1: Tính tiền taxi
// Tính tiền cước taxi dựa vào các điều kiện sau
// Số km ≤ 1 giá 15000đ
// 1 < số km ≤ 5 giá 13500đ
// Số km > 5 giá 11000đ
// Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền
console.log("Bài tập 1");

var km = 0,
    money = 0;

if (km > 0) {
    if (km <= 1) {
        money = km * 15000;
    } else if (km > 1 && km <= 5) {
        money = 15000 + (km - 1) * 13500;
    } else if (km > 5) {
        money = 15000 + 13500 * 4 + (km - 5) * 11000;
    }

    if (km > 120) {
        money -= (money * 0.1);
    }
} else {
    money;
}

console.log(`Số tiền phải trả ${money} VNĐ`);



// Bài 2: Tính tiền điện
// Học viên viết chương trình tiền điện hàng tháng theo yêu cầu sau
// Input: Số điện tiêu thụ hàng tháng
// Output: Hiển thị số tiền phải đóng
// Chi tiết giá điện theo bậc
// Bậc 1 - kWh 0->50 - 1.678
// Bậc 2 - kWh 51->100 - 1.734
// Bậc 3 - kWh 101->200 - 2.014
// Bậc 4 - kWh 201->300 - 2.536
// Bậc 5 - kWh 301->400 - 2.834
// Bậc 6 - kWh 401 trở lên - 2.927
console.log(" ");
console.log("Bài tập 2");

var numberKwh = 440, kwh;
var total = 0;

if (numberKwh > 0) { // 6
    if (numberKwh > 400) {
        kwh = numberKwh - 400; // 
        total = kwh * 2927; //117080
        numberKwh -= kwh;
    }
    if (numberKwh > 300 && numberKwh <= 400) { // 5
        kwh = numberKwh - 300;
        total += kwh * 2834;
        numberKwh -= kwh;
    }
    if (numberKwh > 200 && numberKwh <= 300) { // 4
        kwh = numberKwh - 200;
        total += kwh * 2536;
        numberKwh -= kwh;
    }
    if (numberKwh > 100 && numberKwh <= 200) { // 3
        kwh = numberKwh - 100;
        total += kwh * 2014;
        numberKwh -= kwh;
    }
    if (numberKwh > 50 && numberKwh <= 100) { // 3
        kwh = numberKwh - 50;
        total += kwh * 1734;
        numberKwh -= kwh;
    }
    if (numberKwh <= 50) { // 3
        total += numberKwh * 1678;
    }
}
console.log(`Tổng số tiền điện phải nộp là ${total}`); //1026080



// # Bài 3: Tính giá trị biểu thức
// Cho trước số nguyên n. Tính giá trị biểu thức sau
// S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
console.log(" ");
console.log("Bài tập 3");

var n = 5,
    totals = 0;

if (n % 1 !== 0 || n < 1) {
    totals = "n là số không hợp lệ";
} else {
    for (var i = 1; i <= n; i++) {
        totals += i * (i + 1);
    }
}

console.log(totals);



// Bài 4: Viết hàm kiểm tra số nguyên tố
// Viết 1 hàm kiểm tra 1 số có phải số nguyên tố hay không?
// Hàm có 1 tham số là số cần kiểm tra
// Hàm có giá trị trả về
// Gọi hàm trong câu điều kiện if else
console.log(" ");
console.log("Bài tập 4");

var n = 6; // số cần kiểm tra
function getPrime(number) {
    if (number % 1 === 0 && number > 1) {
        for (var i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
}

if (n % 1 !== 0 || n < 1) {
    console.log("Số không hợp lệ");
} else {
    console.log(`${n} - ${getPrime(n) ? "là" : "không phải"} số nguyên tố`);
}



// Bài 5: Vẽ tam giác số
// Vẽ tam giác số sau với N dòng
// 1
// 2 3
// 4 5 6
// 7 8 9 10
// 11 12 13 14 15
document.write(`<h4>---- Bài tập 5 ----</h4>`)

var m = 6;
if (m % 1 === 0 && m > 0) {
    var counter = 0;

    for (var i = 1; i <= m; i++) {
        for (var j = 1; j <= i; j++) {
            document.write(++counter + " ")
        }
        document.write(`<br />`)
    }
} else {
    document.write(`Vui lòng nhập số hàng(cột)!`)
}



// # Bài 6: Vẽ bàn cờ vua
// Học viên sử dụng kiến thức đã học về vòng lặp, câu lệnh rẽ nhánh để vẽ bàn cờ vua
document.write(`<h4>---- Bài tập 6 ----</h4>`)

var e = 5; //số hàng và cột

if (e % 1 === 0 && e > 0) {
    for (var i = 1; i <= e; i++) {
        for (var j = 1; j <= e; j++) {
            if ((i + j) % 2 === 0) {
                document.write(`<span style="display: inline-block; width: 80px; height: 80px; background: #000;"></span>`)
            } else {
                document.write(`<span style="display: inline-block; width: 80px; height: 80px;"></span>`)
            }
        }
        document.write(`<br />`)
    }
} else {
    document.write(`Vui lòng nhập số hàng(cột)!`)
}


// # Bài 7: Vẽ bảng cửu chương
// Học viên sử dụng kiến thức đã học để vẽ bảng cửu chương từ 1 đến 10
document.write(`<h4>---- Bài tập 7 ----</h4>`)

var n = 10;

if (n % 1 === 0 && n > 0) {
    for (var i = 1; i < n; i++) {
        for (var j = 1; j <= n; j++) {
            total = i * j;
            document.write(`${i} * ${j} = ${total}`)
            document.write(`<br />`)
        }
        document.write("<hr />")
    }
}



// # Bài 8: Tính giá trị biểu thức không dùng vòng lặp
// Tính giá trị biểu thức: S = 1 + 1/2 + 1/3 + 1/4 + 1/5 +…+1/N
console.log(" ");
console.log("Bài tập 8");

function loop(n) {
    if (n === 1) {
        return n
    }
    return 1 / n + loop(n - 1);
}

var n = 3;

if (n % 1 !== 0 || n < 1) {
    console.log(`Số không hợp lệ`)
} else {
    console.log(`Giá trị của biểu thức S = ${loop(n)}`);
}