var $ = function (tag) {
    return document.querySelector(tag)
};
var $$ = function (tagAll) {
    return document.querySelectorAll(tagAll)
};

// Đóng/mở form
var buyBtnModel = $(".js-btn-form");
var buyBtnModelOut = $(".overlay");
var form = $(".form-container");

var notificationLogin = $(".notification.login")
var notificationRegister = $(".notification.register")

var loginModel = function () {
    form.classList.toggle("js-block");
    //Reset form
    $$(".card-form input").forEach(function (item) {
        item.value = "";
    });
    $$(".card-form input + span").forEach(function (item) {
        item.innerHTML = ""
    });
    notificationLogin.innerHTML = "";
    notificationRegister.innerHTML = "";
    formLogin.classList.add("block")
    formRegister.classList.remove("block")
    buyBtnLogin.classList.add("active")
    buyBtnRegister.classList.remove("active")
};

buyBtnModel.addEventListener("click", loginModel);
buyBtnModelOut.addEventListener("click", loginModel);

//Chuyển đổi giữa 2 form đăng nhập và đăng ký
var buyBtnLogin = $(".js-form-login")
var buyBtnRegister = $(".js-form-register")
var formLogin = $(".card-form-login")
var formRegister = $(".card-form-register")

buyBtnLogin.addEventListener("click", function () {
    formLogin.classList.add("block")
    formRegister.classList.remove("block")
    buyBtnLogin.classList.add("active")
    buyBtnRegister.classList.remove("active")
});

buyBtnRegister.addEventListener("click", function () {
    formLogin.classList.remove("block")
    formRegister.classList.add("block")
    buyBtnLogin.classList.remove("active")
    buyBtnRegister.classList.add("active")
});

//Lấy các thẻ input trong form
var handleInputLogin = $$(".card-form-login .input-form input")
var handleInputRegister = $$(".card-form-register .input-form input")

var resultCheckLogin = function () {
    for (var i = 0; i < handleInputLogin.length; i++) {
        let value = handleInputLogin[i];
        var spanError = $("." + value.type + "_error");
        
        if (!validate(value, "check")) {
            spanError.innerHTML = validate(value, "mess");
        } else {
            spanError.innerHTML = ""
        }
    }
};

var resultCheckRegister = function () {
    for (var i = 0; i < handleInputRegister.length; i++) {
        var value = handleInputRegister[i];
        var spanErrors = $("." + value.type + "_errors");
        
        if (!validate(value, "check")) {
            spanErrors.innerHTML = validate(value, "mess");
        } else {
            spanErrors.innerHTML = ""
        }
    }
}

//Check sau khi thay đổi value
handleInputLogin.forEach(function (value) {
    value.addEventListener("blur", resultCheckLogin)
});

handleInputRegister.forEach(function (value) {
    value.addEventListener("blur", resultCheckRegister)
});

// hàm check value
function validate(item, a, mess) {
    var check = true
    if (item.value === "") {
        check = false;
        mess = "Vui lòng nhập thông tin";
    } else {
        //check name
        if (item.classList.contains("text")) {
            var username = item.value;
            for (var value of username) {
                if (!isNaN(+value)) {
                    check = false;
                    mess = "tên không chứa số"
                }
            }
        }
        //check email
        if (item.classList.contains("email")) {
            var email = item.value; //Lấy value của email
            if (!email.includes("@") || !email.includes(".") || 
                email.indexOf("@") === 0 || 
                email.lastIndexOf("@") === (email.length - 1) ||
                email.lastIndexOf(".") === (email.length - 1) ||
                email.indexOf("@") > email.indexOf(".")) {
                check = false;
                mess = "Nhập đúng định dạng email"
            }
        }
        //check password
        if (item.classList.contains("password")) {
            var password = item.value;
            if (password.length < 8) {
                check = false;
                mess = "Mật khẩu ít nhất 8 ký tự"
            }
        }
    };

    if (a === "check") {
        return check;
    } else if (a === "mess") {
        return mess;
    };
}

// Reset form.
buyBtnLogin.addEventListener("click", function () {
    $$(".card-form-register input + span").forEach(function (value) {
        value.innerHTML = "";
    })
    handleInputRegister.forEach(function (value) {
        value.value = "";
    })
    notificationRegister.innerHTML = "";
});

buyBtnRegister.addEventListener("click", function () {
    $$(".card-form-login input + span").forEach(function (value) {
        value.innerHTML = "";
    })
    handleInputLogin.forEach(function (value) {
        value.value = "";
    })
    notificationLogin.innerHTML = "";
});

// button đăng ký__Đăng nhập
var handleBtn = $$("button.btn-form");

handleBtn.forEach(function (item) {
    // console.log(item);
    item.addEventListener("click", function () {
        if (item.classList.contains("login")) {           
            handleInputLogin.forEach(function (value) {
                if (validate(value, "check")) {
                    notificationLogin.innerHTML = "Đăng nhập thành công";
                }
            })
        }

        if (item.classList.contains("register")) {           
            handleInputRegister.forEach(function (value) {
                if (validate(value)) {
                    notificationRegister.innerHTML = "Đăng Ký thành công";
                }
            })
        }
    })
});

//Ẩn/Hiện mật khẩu
