console.log("Bài tập 1");
// # Bài 1
// Lấy kết quả giao giữa 2 mảng
// Kết quả: [1,2]
var arrA = [1, 4, 3, 2, 7, 8, 7];
var arrB = [5, 2, 6, 7, 1, 2, 3, 3];

if (Array.isArray(arrA) && Array.isArray(arrB)) {
    var duplicate = arrA.reduce(function (prev, current) {
        if (arrB.includes(current) && !prev.includes(current)) {
            prev.push(current);
        }
    
        return prev;
    }, []);
    
    console.log(duplicate);
} else {
    console.log("arrA, arrB không phải là mảng");
}
//End



console.log(" ");
console.log("Bài tập 2");
// # Bài 2: Làm phẳng array sau (Chuyển về mảng 1 chiều)
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

function flatten(n) {
        return n.reduce(function (prev, current) {
            return prev.concat(Array.isArray(current) ? flatten(current) : current);
        }, []);
}

if (Array.isArray(arr)) {
    console.log(flatten(arr));
} else {
    console.log("Đây không phải là mảng");
}
// End



console.log(" ");
console.log("Bài tập 3");
// # Bài 3: Tách phần tử trong mảng theo đúng kiểu dữ liệu
// Kết quả: [["a", "b"], [1, 2], [true, false]]

var arrays = [
    ["a", 1, true],
    ["b", 2, false],
    [[], null, undefined, function() {}]
];

function flatten(n) {
    return n.reduce(function (prev, current) {
        return prev.concat(Array.isArray(current) ? flatten(current) : current);
    }, []);
}

function elementSeparation(arrays) {
    var news = flatten(arrays);
    console.log(news);

    var a = [], b = [], c = [], d = [], e = [], f = [];
    for (var i in news) {
        var type = typeof news[i];

        if (type === "string") {
            a.push(news[i]);
        } else if (type === "number") {
            b.push(news[i]);
        } else if (type === "boolean") {
            c.push(news[i]);
        } else if (type === "object") {
            d.push(news[i]);
        } else if (type === "undefined") {
            e.push(news[i]);
        } else if (type === "function") {
            f.push(news[i]);
        } 
    }
    var newArr = [a, b, c, d, e, f];

    return newArr.filter(function (item) {
        return item.length > 0;
    })
};

if (Array.isArray(arrays) && arrays.length > 0) {
    console.log(elementSeparation(arrays));
} else {
    console.log("Đây không phải là mảng");
}



// # Bài 4: Dựa vào hình ảnh giao diện sau, hãy thiết kế 1 mảng phù hợp và thực hiện đổ dữ liệu lên giao diện

var interfaceData = [
    [
        "https://picsum.photos/200/130",
        "Tiêu đề bài viết 1",
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid natus
        rerum, non accusantium recusandae sapiente voluptates! Sint cumque,
        incidunt ipsa sapiente velit beatae ab doloribus, provident eveniet
        nesciunt tenetur molestias.`
    ],
    [
        "https://picsum.photos/200/130",
        "Tiêu đề bài viết 2",
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid natus
        rerum, non accusantium recusandae sapiente voluptates! Sint cumque,
        incidunt ipsa sapiente velit beatae ab doloribus, provident eveniet
        nesciunt tenetur molestias.`
    ],
    [
        "https://picsum.photos/200/130",
        "Tiêu đề bài viết 3",
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid natus
        rerum, non accusantium recusandae sapiente voluptates! Sint cumque,
        incidunt ipsa sapiente velit beatae ab doloribus, provident eveniet
        nesciunt tenetur molestias.`
    ]
];

document.write(`<div class="container">`)
for (var i in interfaceData) {
    var a = interfaceData[i];
    var html =
        `<div class="img">
            <img src="${a[0]}" alt="Mô tả">
        </div>
        <div class="sub-content">
            <h2 class="title">${a[1]}</h2>
            <p class="desc">${a[2]}</p>
        </div>`;

    if (i % 2 === 0) {
        document.write(
            `<div class="card-content">
                ${html}
            </div>`)
    } else {
        document.write(
            `<div class="card-content row-reverse">
                ${html}
            </div>`)
    }
}
document.write(`</div>`)