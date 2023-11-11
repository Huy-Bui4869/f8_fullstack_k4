/* eslint-disable no-undef */
export function accessToast(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "green",
      borderRadius: "10px",
      color: "#fff",
    },
  }).showToast();
}

export function failedToast(msg) {
  Toastify({
    text: msg,
    duration: 3000,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "orangered",
      borderRadius: "10px",
      color: "#fff",
    },
  }).showToast();
}

// toast.info("Lorem ipsum dolor"); // same as toast(message, {type: "info"});
// toast.error("Lorem ipsum dolor")
// toast.success("Lorem ipsum dolor")
// toast.warn("Lorem ipsum dolor")
// toast.error("Without icon", {
//   icon: false
// });
// toast.success("You can provide any string", {
//   icon: "🚀"
// });
