//1_Tạo classes tên là f8
class F8 {

    static component(nameEl, Obj) {

        // Lấy ra value của Obj có key là data
        Object.keys(Obj.data()).forEach((key) => {
            window[key] = Obj.data()[key]
        })

        //_Sử dụng tamplate để bóc tách giữ liệu
        const templateEl = document.createElement("template")
        templateEl.innerHTML = Obj.template
        const templateNode = templateEl.content.cloneNode(true)
        // console.log(templateNode.children);

        const results = Obj.template.match(/{{.+?}}/g); //['{{ title }}', '{{ count }}']
        const arrElNode = Array.from(templateNode.children)//mảng các element
        
        //_tìm kiếm và thay thế 
        arrElNode.forEach((El) => {

            results.forEach((result) => {
                const variableResults = result.match(/{{(.+?)}}/)
                const variable = variableResults[1].trim() //['title', 'count']

                if (El.innerText.includes(result)) {                
                    El.innerText = El.innerText.replace(result, window[variable])
                }
            });

            let arrEl = [];
            Array.from(templateEl.content.children).forEach((elment) => {
                results.forEach((result) => {
                    if (elment.innerText.includes(result)) {
                        arrEl.push(elment)
                    }
                })
            });
            console.log(arrEl);

            let text = El.outerHTML;
            const event = text.slice(text.indexOf(":") + 1, text.indexOf("=")).trim()
    
            El.addEventListener(event, () => {
                //Lấy giá trị của thuộc tính.
               const valueAtribute = El.getAttribute(`v-on:${event}`)
                let variable;

                //sự kiện tăng giảm count.
               if (valueAtribute.includes("++")) {
                variable = valueAtribute.replaceAll("+", " ").trim()
                window[variable]++;
               }

               if (valueAtribute.includes("--")) {
                variable = valueAtribute.replaceAll("-", " ").trim()
                window[variable]--;
               };

               //sự kiện thay đổi title.
               if (valueAtribute.includes("=")) {
                    variable = valueAtribute.slice(0, valueAtribute.indexOf("="))
                    
                    let content = valueAtribute.slice(valueAtribute.indexOf("=") + 1)
                    window[variable] = content.replaceAll("'", "").trim()
               }

               //Cập nhật giá trị 
               arrEl.forEach((value) => {
                    let a = `{{ ${variable} }}`
                    if (value.innerText.includes(a)) {
                        document.querySelector(value.tagName).innerText = value.innerText.replace(a,  window[variable]);       value.innerHTML;
                    }
               });

            });
        })
        //Tạo ra một element có tên là counter-app
        customElements.define(
            nameEl, 
            class extends HTMLElement {

                //chèn nội dung vào thẻ để in ra màn hình
                connectedCallback() {
                    this.append(templateNode)
                }
            }
        );
    }
};