let open_turn = false;
let title_bar;
let my_window;

function open_close_window(event){
    $("#includedContent").load("browser_window.html", window_element_identify);

    if (event.type === "click"){
        console.log('Button was clicked!');
        open_turn = !open_turn;
        console.log('Is it open turn: ', open_turn);
    }

    if (open_turn == false){
        $("#includedContent").load("browser_window.html", function() {
            $(this).hide(); // Ẩn phần tử #includedContent và mọi thứ bên trong nó
        });
    } else{
        $("#includedContent").load("browser_window.html", function() {
            $(this).show(); // Ẩn phần tử #includedContent và mọi thứ bên trong nó
        });
    }
}

function window_element_identify() {
    title_bar = document.getElementsByClassName('title-bar');
    my_window = title_bar[0].parentNode;
    // Hoặc dùng jQuery:
    // var title_bar = $('#elementIdInsideLoadedHTML')[0];
    
    if (title_bar) {
        console.log("Phần tử đã được tìm thấy:", title_bar);
        console.log("Phần tử mẹ:", my_window);

        // Thao tác với title_bar ở đây
        // title_bar.style.display = 'block';
    } else {
        console.error("Không tìm thấy phần tử!");
    }
}

function click_open_btn() {
    $('#myButton').on('click', open_close_window);
}

$(document).ready(function () {
    click_open_btn();
});

// ==========================================================================
/*
    the problems that i've countered today:

i want to move the window by grabing just only the title bar and not in any position of the window.
but by clicking at one point of the "window" - #includedContent, the event only record at its click's element offset, and then 
move the window by the #includedContent offset defined by the click's element offset that is NOT from the #includedContent. Which 
resulted in a really poor glitch animation that maybe causing seizures. idk.

not only that, i can't handle the output of getElementById of an not-existing-yet element which is *seems like* very crucial 
in the project.

meh.
*/
// ==========================================================================

let mouse_click_detector = false; //clicking the mouse WITHOUT moveover
let window_click_detector = false;

let position_x = 0;
let position_y = 0;
let click_position_x = 0;
let click_position_y = 0;

let brick = document.getElementById('includedContent');

if (brick) {
    console.log("The element found!");
} else {
    console.log("The element is not found!");
}

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
        // console.log("click x, y: ", click_position_x, ", ", click_position_y)
    }
})

window.addEventListener('mousemove', (event) => {
    if (mouse_click_detector === true) {
        current_position_x = event.clientX;
        current_position_y = event.clientY;
        // console.log("current x, y: ", current_position_x, ", ", current_position_y)
        brick.style.left = current_position_x - click_position_x + 'px';
        brick.style.top = current_position_y - click_position_y + 'px';
    }
})