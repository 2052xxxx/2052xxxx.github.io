let mouse_click_detector = false; //clicking the mouse WITHOUT moveover
let window_click_detector = false;

let position_x = 0;
let position_y = 0;
let click_position_x = 0;
let click_position_y = 0;

let brick = document.getElementById('square_cursor');

brick.addEventListener('mousedown', () => {
    mouse_click_detector = true
})

window.addEventListener('mouseup', () => {
    // mouseup = thả chuột ra
    mouse_click_detector = false;
    window_click_detector = false;
})

window.addEventListener('mousedown', (event) => {
    // mousedown = nhấn chuột xuống
    if (mouse_click_detector === true) {
        window_click_detector = true;
        click_position_x = event.offsetX;
        click_position_y = event.offsetY;
    }
})

window.addEventListener('mousemove', (event) => {
    if (mouse_click_detector === true) {
        current_position_x = event.clientX;
        current_position_y = event.clientY;
        brick.style.left = current_position_x - click_position_x + 'px';
        brick.style.top = current_position_y - click_position_y + 'px';
    }
})