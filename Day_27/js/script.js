var tableProduct = document.querySelector("#table_product")

var products = [
    {
        id: 1,
        product: "Sản phẩm 1",
        price: 1000,
    },
    {
        id: 2,
        product: "Sản phẩm 2",
        price: 2000,
    },
    {
        id: 3,
        product: "Sản phẩm 3",
        price: 3000,
    },
    {
        id: 4,
        product: "Sản phẩm 4",
        price: 4000,
    }
];

var carts = JSON.parse(localStorage.getItem('cart'));

function toLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function updateDataToBrowser(cart) {
    //Đẩy dữ liệu lên trình duyệt.
    toLocalStorage(cart)
    //Lấy dữ liệu.
    carts = JSON.parse(localStorage.getItem('cart'))
    //Cập nhật lên màn hình.
    randerCart();
}

var cart = [];
// hàm tạo danh sách sản phầm
function createProductList() {
    var tbody = document.createElement("tbody")
    tableProduct.append(tbody)
    
    products.forEach(function (values, i) {
        var tr = document.createElement("tr")
        var html = `
            <td>${i + 1}</td>
            <td>${values.product}</td>
            <td>${values.price}</td>
            <td>
                <input class="quantity" type="number" value="1">
                <button type="submit" class="btn" data-id="${values.id}">Thêm giỏ hàng</button>
            </td>
        `
        tr.innerHTML = html
        tbody.append(tr)
    
        //Xác định vị trí btn và value
        var btnEl = document.querySelectorAll(".btn")
        // console.log(btnEl)  

        btnEl.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var btnId = parseInt(btn.getAttribute("data-id"))// click lấy vị trí button
                var quantityValue = parseInt(btn.previousElementSibling.value) //Lấy số lượng sản phẩm

                if (btnId === values.id) {
                    var indexCartItem = cart.findIndex((cart) => {
                        return (cart.id === btnId)
                    })
                    if (indexCartItem !== -1) {
                        //nếu tồn tại thì update value
                        cart[indexCartItem].quantity += quantityValue;
                    } else {
                        //Thêm mới nếu k có
                        values.quantity = quantityValue;
                        cart.push(values);
                    }

                    // updateDataToBrowser(cart)
                    toLocalStorage(cart)
                    carts = JSON.parse(localStorage.getItem('cart'))
                    randerCart();
                }
            })
        })
    });
};
createProductList();

//Tạo giỏ hàng
var cartEl = document.querySelector("#cart-container")
var h2 = document.createElement("h2")
var tables = document.createElement("div")

h2.innerText = 'Sản phẩm';
cartEl.append(h2);
cartEl.append(tables)

function randerCart() {
    const tableCart = `
    <table id="table_cart" width="95%" border="1" cellspacing="0" cellpadding="5">
      <tr>
        <th width="5%">STT</th>
        <th>Tên sản phẩm</th>
        <th width="10%">Giá</th>
        <th width="10%">số lượng</th>
        <th width="10%">Thành tiền</th>
        <th width="10%">xóa</th>
      </tr>
    </table>
    <hr />
    <button class="btn-update">Cập nhật giỏ hàng</button>
    <button class="btn-delete-all">Xóa giỏ hàng</button>
    `
    tables.innerHTML = tableCart;
    
    //Lấy thẻ table
    var cartTable = document.querySelector("#table_cart")
    
    carts.forEach(function (cart, i) {
        var tr = document.createElement("tr");
        var html = `
            <td>${i + 1}</td>
            <td>${cart.product}</td>
            <td>${cart.price}</td>
            <td><input type="number" class="input_quantity" value="${cart.quantity}"></td>
            <td>${cart.price * cart.quantity}</td>
            <td><button class="delete-product">Xóa</button></td>
        `
        tr.innerHTML = html;
        cartTable.append(tr)
    })

    var tableFooter = document.createElement("tr")
    
    var a = carts.reduce(function (pre, cur) {
        return pre += cur.quantity;
    }, 0)
    var b = carts.reduce(function (pre, cur) {
        return pre += (cur.price * cur.quantity);
    }, 0)

    tableFooter.innerHTML = `
        <tr>
            <th colspan="3">Tổng</th>
            <td>${a}</td>
            <td colspan="2">${b}</td>
        </tr>`;
    cartTable.append(tableFooter)

    if (a <= 0 || b <= 0) {
        tables.innerHTML = "Không có sản phẩm nào";
        return
    }
    
    var deleteProduct = document.querySelectorAll(".delete-product")
    //Xóa sản phẩm trong giỏ hàng
    deleteProduct.forEach(function (deleteEl, index) {
        deleteEl.addEventListener("click", function () {
            // console.log(carts);
            carts.splice(index, 1);
            updateDataToBrowser(carts)
        })
    });

    var updateBtnAll = tables.querySelector(".btn-update")
    var removeBtnAll = tables.querySelector(".btn-delete-all")
    // console.log(updateBtnAll, removeBtnAll)
    
    //Sự kiện cập nhật giỏ hàng
    updateBtnAll.addEventListener("click", function () {
        var quantityA = document.querySelectorAll(".input_quantity");
    
        quantityA.forEach(function (input, i) {
            var sl = +(input.value);
            console.log(sl);
            if (sl <= 0) {
                carts.splice(i, 1);
            } else {
                carts[i].quantity = sl
            }
    
            updateDataToBrowser(carts)
        })
    });
    
    //Sự kiện xóa giỏ hàng
    removeBtnAll.addEventListener("click", function () {
        carts = [];
        cart = []
        
        updateDataToBrowser(carts)
        tables.innerHTML = "Không có sản phẩm nào"
    });
};
randerCart();