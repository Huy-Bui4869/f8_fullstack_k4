var inputEl = document.querySelector(".todoInput")
var btn = document.querySelector(".todoBtn")
var wrapper = document.querySelector(".todoWrapper")
var form = document.querySelector(".todoForm")
var todoList = document.querySelector(".todoList")
//hàm thêm thông tin
function addElTodoList(valueInput) {
    return `
        <div class="about">
            <div class="todoItem">
                <p class="textItem">${valueInput}</p>
                <div class="iconItem">
                    <i class="fa-solid fa-pen-to-square edit"></i>
                    <i class="fa-solid fa-trash delete"></i>
                </div>
            </div>
        </div>
        `;
};
//hàm sửa
function editForm(value) {
    return `
        <form class="todoForm">
            <input
                type="text"
                class="todoInput"
                placeholder="Update task"
                value="${value}"
            />
            <button type="submit" class="todoBtn">Add Task</button>
        </form>
    `;
}
//Thêm element.
form.addEventListener("submit", function (e) {
    e.preventDefault()
    var inputValue = inputEl.value.trim()
    if (inputValue !== "") {
        todoList.innerHTML += addElTodoList(inputValue)
        inputEl.value = "";
        // console.log(todoList);
    };
});

//Xóa
todoList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
});
//Sửa
todoList.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {

        var el = e.target.parentElement.parentElement.parentElement;//todoItem
        var value = el.querySelector(".textItem").innerText;
        console.log(value, el);
        var c = el.innerHTML = editForm(value);// form sửa
        console.log(c);
        console.log(this);
        //this_todoLisst
        this.addEventListener("click", function (e) {
            if (e.target.classList.contains("todoInput")) {
                e.preventDefault();
                var items = e.target;
                items.addEventListener("change", function () {
                })
            }

            if (e.target.classList.contains("todoBtn")) {
                e.preventDefault();
                var getForm = e.target.parentElement.parentElement;//.about_todoForm
                // var a = e.target.parentElement;
                console.log(getForm);
                // var newValue = getForm.children[0].children[0];
                var newValue = e.target.previousElementSibling;
                console.log(newValue);
                // console.log(getForm);
                // getForm.innerHTML = addElTodoList(a)
                getForm.innerHTML = addElTodoList(newValue.value)
                // a.outerHTML = addElTodoList(newValue);
                // console.log(getForm);
            }
        })
    }
});
// todoList.addEventListener("click", function (e) {
//     if (e.target.classList.contains("edit")) {

//         var el = e.target.parentElement.parentElement;
//         var value = el.querySelector(".textItem").innerText;
//         // console.log(value, el);
//         el.innerHTML = editForm(value);
//         this.addEventListener("click", function (e) {

//             if (e.target.classList.contains("todoBtn")) {
//                 e.preventDefault();
//                 var getForm = e.target.parentElement.parentElement;
//                 // console.log(getForm);
//                 var newValue = getForm.querySelector(".todoInput").value;
//                 // console.log(newValue);
//                 getForm.innerHTML = addElTodoList(newValue)
//             }
//         })
//     }
// });