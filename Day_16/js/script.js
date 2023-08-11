// Bài 1: N số fibonaci
// Hiển thị N số Fibonaci đầu tiên
// Ví dụ: Gán n = 10 sẽ hiển thị danh sách 10 số fibonaci
// Yêu cầu: Không dùng vòng lặp

var fibonaci = function (a) {
  if (a === 1 || a === 2) {
    return 1;
  } 
  return fibonaci(a - 1) + fibonaci(a - 2);
};

var n = 3;

if (n % 1 === 0 && n > 0) {
  var showFb = "";
  var allFibonaci = function(n) {
    if (n === 1) {
      return showFb += fibonaci(n);
    } 
    if (n > 1) {
      showFb += allFibonaci(n - 1) + ", " + fibonaci(n);
    }
    return showFb;
  } 

  console.log(`Danh sách ${n} số fibonaci đầu tiên: ` + allFibonaci(n));
} else {
  console.log(`Số không hợp lệ`);
}    
    
// Bài 2: Đảo ngược số
// Viết hàm đảo ngược số nguyên với tham số là số cần đảo ngược
// Ví dụ: Khi gọi hàm và truyền đối số 12345 sẽ trả về kết quả 54321

var ramdomNumber = 12345; //Số cần đảo ngược

function reverse(e) {
  if (e < 10) {
    return e;
  } else {
    str = [];
    for (var i = 10; i <= ramdomNumber*10; i *= 10) {
        var num = parseInt((ramdomNumber % i) / (i / 10));
        // console.log(num);
        str += num;
    }
    // console.log(str);
    return Number.parseInt(str);
  }
}

if (ramdomNumber % 1 === 0 && ramdomNumber >= 0) {
  console.log(reverse(ramdomNumber)); 
} else {
  console.log("Số cần đảo ngược không hợp lệ");
}
// i = 10 -> num = 5 / 1 -> 5;
// i = 100 -> num = 45 / 10 -> 4;
// i = 1000 -> num = 345 / 100 -> 3;
// i = 10000 -> num = 2345 / 1000 -> 2;
// i = 100000 -> num = 12345 / 10000 -> 1;


// Bài 3: Viết hàm chuyển số thành chữ
// Ví dụ: Số 4298 sẽ chuyển thành: Bốn ngàn hai trăm chín tám
// Ràng buộc: Số cần chuyển đổi có giá trị từ 0 đến 9999

var check = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bẩy", "tám", "chín"];

var ngan, tram, chuc, donVi, result, a;
var showNumber = function(c) {
  ngan = parseInt(c / 1000); //lấy số hàng ngàn
  tram = parseInt((c % 1000) / 100);
  chuc = parseInt((c % 100) / 10);
  donVi = c % 10;
}

function exchange() {
  if (chuc === 0 && donVi === 0) {
    a = "";
  } else if (chuc === 0) {
    a = "linh " + check[donVi];
  } else if (chuc === 1 & donVi === 0) {
    a = "mười"
  } else {
    a = "mười " + check[donVi];
  }
}

function convert(number) {
  showNumber(number);

  if (number < 10) {
    return check(number);
  }

  if (number > 10 && number < 100 ) {
    if (number % 10 === 0) {
        return check[chuc] + " mươi";
    } else if (number > 10 && number < 20) {
        return "mười " + check[donVi];
    } else {
        return check[chuc] + " " + check[donVi];
    }
  }
  exchange();

  if (number % 1000 === 0 && number >= 1000) {
    result = check[ngan] + " ngàn";
  } else {
    result = check[ngan] + " ngàn " + check[tram] + " trăm " + a;
  }

  if (number >= 100 && number < 1000) {
    result = check[tram] + " trăm " + a;
  }
  return result;
}

var numbers = 9900; // Số cần đổi

if (numbers % 1 === 0 && 0 <= numbers && numbers < 10000) {
  console.log(convert(numbers));
} else {
  console.log("Số không hợp lệ");
}