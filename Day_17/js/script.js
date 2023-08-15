var adc = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum have `;
var content = adc;
var content2 = adc;
var position, result;
var position2 = 0;

function about() {
    position = content.indexOf(" ");
    // console.log(position);
    
    result = content2.slice(0, position2) + `<span style= "color: red;">${content.slice(0, position)}</span>` + content.slice(position)
    // console.log(result);
    content = content.slice(position + 1); //position + 1: Loại bỏ khoảng trắng
    // console.log(content);

    position2 += position + 1;

    if (position === -1) {
        result = content2.slice(0, position2) + `<span style= "color: red;">${content.slice(0, content.length)}</span>`;
        
        position2 = 0;
        content = adc;
    }

    document.getElementById("Creeping").innerHTML = result;
}

setInterval(about, 500);
