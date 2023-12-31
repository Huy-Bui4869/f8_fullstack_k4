F8.component("counter-app", {
    data: () => {
        return {
            count: 0,
            title: "Counter App",
        };
    },

    template: `
        <h1>{{ title }}</h1>
        <h2>Đã đếm: {{ count }} lần</h2>
        <button v-on:click="count--">-</button>
        <button v-on:click="count++">+</button>
        <button v-on:click="title='xin chao f8'">Change Title</button>
    `,
});


// F8.component("header-component", {
//     template: `<h1>HEADER</h1>`
// });