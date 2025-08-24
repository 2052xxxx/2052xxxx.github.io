let mouse_click_detector = false; //clicking the mouse WITHOUT moveover
let window_click_detector = false;

let position_x = 0;
let position_y = 0;
let click_position_x = 0;
let click_position_y = 0;

let title_bar = document.getElementById('title-bar');
let cube = title_bar.parentElement;


console.log(title_bar)

title_bar.addEventListener('mousedown', () => {
    mouse_click_detector = true
})

window.addEventListener('mouseup', () => {
    // mouseup = thả chuột ra
    mouse_click_detector = false;
    window_click_detector = false;
})

window.addEventListener('mousedown', (event) => {

    let element = event.target;
    // mousedown = nhấn chuột xuống
    if (mouse_click_detector === true) {
        window_click_detector = true;
        click_position_x = event.offsetX;
        click_position_y = event.offsetY;
        if (element === title_bar) {
            console.log('element == title bar');
            // click_position_x += element.offsetLeft;
            // click_position_y += element.offsetTop;
            // element = element.parentNode;
            console.log("offset left, top: ", element.offsetLeft, ", ", element.offsetTop);
        }
    }
})

window.addEventListener('mousemove', (event) => {
    if (mouse_click_detector === true) {

        current_position_x = event.clientX;
        current_position_y = event.clientY;
        cube.style.left = current_position_x - click_position_x - 5 + 'px'; // trừ thêm 5px của border
        cube.style.top = current_position_y - click_position_y - 5 + 'px'; // trừ thêm 5px của border
    }
})

myButton.addEventListener('click', (event) => {
  console.log('offsetX:', event.offsetX, 'offsetY:', event.offsetY);
  console.log('clientX:', event.clientX, 'clientY:', event.clientY);
});