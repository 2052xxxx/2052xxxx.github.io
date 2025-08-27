let open_turn = false;

function open_close_window(event){
    $("#includedContent").load("browser_window.html");

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

function click_open_btn() {
    $('#myButton').on('click', open_close_window);
}

$(document).ready(function () {
    $mouse_click_detector = false;
    $window_click_detector = false;
    
    $position_x = 0;
    $position_y = 0;
    $click_position_x = 0;
    $click_position_y = 0;
    
    $brick = $("#includedContent");

    click_open_btn();

    $(document).on('mousedown', '.title-bar', function(event) {

        $mouse_click_detector = true;

        // console.log('offsetX:', event.offsetX, 'offsetY:', event.offsetY);

        $(window)
            .on("mouseup", () => {
                $mouse_click_detector = false;
                $window_click_detector = false;
            })
            .on("mousedown", event => {
                // mousedown = nhấn chuột xuống
                if ($mouse_click_detector === true) {
                    $window_click_detector = true;
                    $click_position_x = event.offsetX;
                    $click_position_y = event.offsetY;
                }
            })
            .on("mousemove", event => {
                if ($mouse_click_detector === true) {
                    $current_position_x = event.clientX;
                    $current_position_y = event.clientY;
                    
                    // This ensures the entire element stays within view
                    const newX = $current_position_x - $click_position_x;
                    const newY = $current_position_y - $click_position_y;

                    // Constrain to keep element fully visible
                    const constrainedX = Math.max(0, Math.min($(window).width() - $brick.outerWidth(), newX));
                    const constrainedY = Math.max(0, newY);
                    // const constrainedY = Math.max(0, Math.min($(window).height() - $brick.outerHeight(), newY));

                    $brick.css({
                        left: constrainedX + 'px',
                        top: constrainedY + 'px'
                    });
                }
            })
    });
});    

// ==========================================================================
/*
    the problems that i've countered today:
yeah JQuery is da bestttttt fk you javascript.
*/
// ==========================================================================

