console.log("Bài tập 1");
// # Bài 1: Viết hàm getError(field) có tham số truyền vào là field tương ứng với nhóm cần lấy lỗi.
//Tuy nhiên, chỉ trả về 1 chuỗi là lỗi đầu tiên tìm được(lỗi đầu tiên đúng) của 1 nhóm
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự"
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email"
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    }
}

var getError = function (field) {
    if (errors[field] === undefined) {
        return "Không có lỗi";
    } else {
        for (var key in errors[field]) {
            return errors[field][key];
        }
    }
}

console.log(getError('email'));



console.log("Bài tập 2");
// # Bài 2:
// Viết một hàm tạo (Constructor) để khởi tạo ra một đối tượng có 3 thuộc tính: name, age và address.
// Sau đó viết một hàm nhận vào một mảng chứa nhiều đối tượng để khởi tạo ra một mảng mới chứa các đối tượng có cấu trúc như trên.
// Kết quả trả về là một mảng chứa tất cả thông tin của các đối tượng đó được sắp xết tăng dần theo tuổi và thêm một thuộc tính mới là shortName của mỗi đối tượng.
const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
  ];

var condition = customers.every(function (customer) {
    typeof customer.name === "string" && customer.name &&
    typeof customer.age === "number" && customer.age && customer.age > 0 && customer.age % 1 === 0 &&
    typeof customer.address === "string" && customer.address
});

var Constructor = function (name, age, address) {
    var current = this;
    current.name = name;
    current.age = age;
    current.address = address;
};

var createCustomers = function (arr) { 
    var newArr = arr.map(function (item) {
        var shortName = getName(item["name"]);
        var news = new Constructor(item.name, item.age, item.address);
        news.shortName = shortName;
        return news;
    });
    arrange(newArr);
    return newArr;
};
//Tạo shortName.
function getName(item) {
    var names = item.split(" ");
    if (names.length <= 2) {
        return item;
    } else {
        return names[0] + " " + names[names.length - 1];
    }
};

// Sắp xếp theo thứ tự tăng dần.
function arrange(a) {
    return a.sort(function (next, pre) {
        // console.log(next.age, pre.age);
        return next.age - pre.age;
    });
}

// console.log(customers);
const result = createCustomers(customers); // Tạo hàm createCustomers này. return về mảng mới.

if (condition) {
    console.log(result);
} else {
    console.log("Kiểm tra lại thông tin");
}



console.log("Bài tập 3");
// # Bài 3:
// Viết một hàm tạo (Constructor) để khởi tạo ra một đối tượng có 3 thuộc tính: name, password và email.
// Tạo một hàm register nhận vào nhiều tham số để khởi tạo ra một mảng chứa các đối tượng có cấu trúc như trên.
// Yêu cầu:
// Kiểm tra tất cả thông tin có đầy đủ không, nếu không đủ, báo lỗi và dừng chương trình.
// Nếu đăng ký thêm một lần nữa, phải trả về được thông tin 2 người.
// Tự động thêm role là user cho mỗi đối tượng.
// Tạo một hàm login nhận vào 2 tham số email và password.
// Yêu cầu:
// Nếu thông tin hợp lệ với một trong các đối tượng đã đăng ký, trả về thông tin của đối tượng đó.
// Nếu không, báo cho người dùng rằng “Thông tin đăng nhập không hợp lệ”.
var User = function (name, password, email) {
    var current = this;
    current.name = name;
    current.password = password;
    current.email = email;
}

const data = []; //
var handleRegister = function (name, password, email) {
    if (name && password && email) {
        var newUser = new User(name, password, email)
        newUser.role = 'user';
        data.push(newUser)
        return data;
    } else {
        return console.log("Nhập thiếu thông tin");;
    }
}

var dataRegister = handleRegister(
    "Nguyen Van A",
    "123456",
    "nguyenvana@email.com"
);
var dataRegister = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com"
);
console.log(data);

function handleLogin(email, password) {
    // var ramdom;
    for (var i in data) {
        if (email === (data[i]["email"]) && password === (data[i]["password"])) {
            return data[i];
        }
        return "Thông tin đăng nhập không hợp lệ"
    }
}
var dataLogin = handleLogin("nguyenvana@email.com", "1234567");

console.log(dataLogin); 