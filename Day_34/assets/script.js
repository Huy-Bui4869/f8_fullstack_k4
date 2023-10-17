const addBtn = document.querySelector(".add-btn");
const btnSave = document.querySelector(".save");
const btnCancel = document.querySelector(".cancel");
const inputShadow = document.querySelector(".add-todos");
const shadow = document.querySelector(".shadow");
const inputSearch = document.querySelector(".search");

const listTask = document.querySelector(".list-task");
const taskTop = document.querySelector("#task-top");
const taskBottom = document.querySelector("#task-bottom");
const btnCompleted = document.querySelector(".completed");

const btnDelete = document.querySelectorAll(".delete");
const numberComplated = btnCompleted.querySelector(".number-complated");

// const serverAPI = `http://localhost:3000`;
const serverAPI = `https://3f6tnp-3000.csb.app`;

function renderHtml(arr) {
  let check;
  if (arr === "datas") {
    check = true;
  } else if (arr === "completedAPI") {
    check = false;
  }
  return arr
    .map(
      ({ value, id, isCheck }) => `
              <div class="card-task">
                  <span>${value}</span>
                  <div class="tools">
                      <button class="delete" onclick="deleteTack(${id}, ${isCheck})">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button class="edit" onclick="editTack(${id}, ${isCheck})">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button class="add" data-index=${id} onclick="addTackCompleted(${id}, ${isCheck})" data-check="${check}">
                        <i class="fa-regular fa-circle-check"></i>
                      </button>
                  </div>
              </div>
            `
    )
    .join("");
}

//Lấy dữ liệu từ server render ra giao diện.
const getAndRenderTack = async () => {
  const responseAPI = await fetch(`${serverAPI}/datas`);
  const datas = await responseAPI.json();
  // complete
  const responseAPI2 = await fetch(`${serverAPI}/completed`);
  const completedAPI = await responseAPI2.json();

  taskTop.innerHTML = renderHtml(datas);

  numberComplated.innerText = completedAPI.length;

  taskBottom.innerHTML = renderHtml(completedAPI);
  clickButtonTools();
};
getAndRenderTack();

//
// Thêm/Sửa dữ liệu trên server.
const postTack = async (data, taskId, isDarg) => {
  //   isDarg = !!isDarg;
  console.log(`save: ${taskId}, isDarg: ${isDarg}`, typeof isDarg);

  if (taskId === 0 || taskId === undefined) {
    // console.log("nhánh post");
    await fetch(`${serverAPI}/datas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    getAndRenderTack();
  } else {
    let resource;
    // console.log(!isDarg);
    if (isDarg === "true") {
      resource = "datas";
    } else if (isDarg === "false") {
      resource = "completed";
      data.isCheck = isDarg;
    }

    await fetch(`${serverAPI}/${resource}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    getAndRenderTack();
  }
};

//Sửa dữ liệu
const editTack = async (id, isCheck) => {
  // console.log(`id:${id}, ${isCheck ? "trên" : "dưới"}_isCheck = ${isCheck}`);
  shadow.classList.add("active");
  inputShadow.focus();
  btnSave.setAttribute("data-ids", id);
  const responseAPI = await fetch(
    `${serverAPI}/${isCheck ? "datas" : "completed"}/${id}`
  );
  const a = await responseAPI.json();
  console.log(`server.ischeck_${a.isCheck}`, typeof a.isCheck);
  btnSave.setAttribute("data-isDarg", a.isCheck); //khai báo
  // console.log(`isGarg: ${btnSave.getAttribute("data-isDarg")}`);

  shadow.children[0].children[0].value = a.value;
};

//Xóa dữ liệu yêu cầu
const deleteTack = async (id, isCheck) => {
  console.log(isCheck);
  const responseAPI = await fetch(
    `${serverAPI}/${isCheck ? "datas" : "completed"}/${id}`,
    {
      method: "DELETE",
    }
  );

  getAndRenderTack();
};

//Sắp xếp.
const addTackCompleted = async (id, isCheck) => {
  const responseAPI = await fetch(
    `${serverAPI}/${isCheck ? "datas" : "completed"}/${id}`
  );
  const mucTieu = await responseAPI.json();

  let newObj = Object.assign({}, mucTieu);
  await fetch(`${serverAPI}/${isCheck ? "datas" : "completed"}/${id}`, {
    method: "DELETE",
  });

  newObj.isCheck = isCheck ? false : true;

  await fetch(`${serverAPI}/${!isCheck ? "datas" : "completed"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj),
  });

  getAndRenderTack();
};

//_Ẩn/Hiện add_todos
addBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  shadow.classList.add("active");
  shadow.children[0].children[0].value = "";
  btnSave.setAttribute("data-ids", 0);
  inputShadow.focus();
  addBtn.classList.add("focus");
});

btnCancel.addEventListener("click", (e) => {
  e.preventDefault();
  shadow.classList.remove("active");
  addBtn.classList.remove("focus");
});

// shadow.addEventListener("click", (e) => {
//   // e.preventDefault();
//   // e.stopPropagation();
//   shadow.classList.remove("active");
// });

//_Sự kiện lưu khi thêm và sửa.
btnSave.addEventListener("click", function (e) {
  const values = inputShadow.value;

  //Xác định h.động thêm mới hay sửa.
  let taskId = this.getAttribute("data-ids");
  let isDarg = this.getAttribute("data-isDarg");
  // console.log(values, +taskId, isDarg);

  postTack(
    {
      value: values,
      isCheck: true,
    },
    +taskId,
    isDarg
  );

  shadow.classList.remove("active");
});

//_Ẩn hiện completed.
btnCompleted.addEventListener("click", () => {
  if (!btnCompleted.classList.contains("focus")) {
    btnCompleted.classList.add("focus");
  } else {
    btnCompleted.classList.remove("focus");
  }
});

//
//_Xây dựng tính năng tìm kiếm
inputSearch.addEventListener("keyup", () => {
  const valueCheck = inputSearch.value;

  getResultSearch(valueCheck);
});

//Render lại giao diện khi tìm kiếm.
const renderHTMLSearch = (arr, valueCheck) => {
  let check;
  if (arr === "datas") {
    check = true;
  } else if (arr === "completedAPI") {
    check = false;
  }
  return arr
    .map(({ value, id, isCheck }) => {
      if (value.includes(valueCheck)) {
        const newText = [...valueCheck.split("")];

        value = value.replaceAll(
          valueCheck,
          `<b style="background: #7e9bac9e;">${newText.join("")}</b>`
        );

        return `
            <div class="card-task">
              <span>${value}</span>
              <div class="tools">
                <button class="delete" onclick="deleteTack(${id}, ${isCheck})">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button class="edit" onclick="editTack(${id}, ${isCheck})">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="add" onclick="addTackCompleted(${id}, ${isCheck})" data-check="true">
                  <i class="fa-regular fa-circle-check"></i>
                </button>
              </div>
            </div>
          `;
      }
    })
    .join("");
};

const getResultSearch = async (valueCheck) => {
  const responseAPI = await fetch(`${serverAPI}/datas`);
  const datas = await responseAPI.json();

  const responseAPI2 = await fetch(`${serverAPI}/completed`);
  const completedAPI = await responseAPI2.json();
  //   console.log(datas);

  taskTop.innerHTML = renderHTMLSearch(datas, valueCheck);
  numberComplated.innerText = completedAPI.length;
  taskBottom.innerHTML = renderHTMLSearch(completedAPI, valueCheck);
};

function clickButtonTools() {
  const tools = document.querySelectorAll(".tools");

  tools.forEach((tool) => {
    Array.from(tool.children).forEach((but) => {
      but.addEventListener("mousedown", () => {
        if (!but.classList.contains("focus")) {
          but.classList.add("focus");
        }
      });

      but.addEventListener("mouseup", () => {
        if (but.classList.contains("focus")) {
          but.classList.remove("focus");
        }
      });
    });
  });
}
