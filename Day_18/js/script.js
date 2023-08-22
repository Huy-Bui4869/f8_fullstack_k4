// # Bài 01
// Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí
var arrNumbers = [1, 10, 100, 700, 300, 8,666];
var max, indexMax, min, indexMin;

if (arrNumbers.length > 0) {
    max = arrNumbers[0];
    min = arrNumbers[0]; 
    for (var i in arrNumbers) {
        if (max < arrNumbers[i]) {
            max = arrNumbers[i];
            indexMax = i;
        }
    
        if (min > arrNumbers[i]) {
            min = arrNumbers[i];
            indexMin = i;
        }
    }
    console.log(`Số lớn nhất: ${max} - index[${indexMax}]`);
    console.log(`Số nhỏ nhất: ${min} - index[${indexMin}]`);
} else {
    console.log("Danh sách rỗng");
}



// # Bài 02
// Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. 
// Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”
var arr = [4, 4, 2, 3, 5, 7, 8];

var isPrime = function(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (var i = 5; i * i < n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
};

function averagedPrime(arr) {
    if (!Array.isArray(arr)) {
        console.log("Đây không phải là mảng");
    } else {
        var total = 0, arrPrime = [];
        for (var j = 0; j < arr.length; j++) {  
            if (isPrime(arr[j])) {
                arrPrime.push(arr[j]);
                total += arr[j];
            }   
        }

        if (arrPrime.length === 0) {
            return "Không có số nguyên tố";
        } else {
            return `trung bình các số nguyên tố ${total / arrPrime.length}`;
        }
    }  
}

console.log(averagedPrime(arr));



// # Bài 03
// Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). 
// In ra mảng sau khi đã xử lý
var array = [1, 0, 3, 25, 5, 7, 11, 3, 5, 8, 6, 7, 6, 4, 0];

function filterArrays(arr) {
    if (arr.length === 0) return "Đây là mảng rỗng";
    var newArray = [];
    for (var index in arr) {
        if (!newArray.includes(arr[index])) {
            newArray.push(arr[index]);
        }
    }

    return newArray;
}
console.log(filterArrays(array));



// # Bài 04
// Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau
// Sắp xếp mảng theo thứ tự tăng dần
// Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

var arr = [5, 3, 8, 1, 2];
var element = 7;

function insertElement(arr, element) {
    arr.sort(function (next, pre) {
        return next - pre;
    });

    if (element > arr[arr.length - 1]) {
        arr.push(element);
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (element < arr[i]) {
                arr.splice(i, 0, element);
                break;
            };
        }
    }
    return arr;
}

console.log(insertElement(arr, element));