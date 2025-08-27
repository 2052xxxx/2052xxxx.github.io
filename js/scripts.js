let open_turn_1st = false;
let open_turn_2st = false;

function open_close_window(event){
    // if (event.type === "click"){
    //     console.log('Button was clicked!');
    //     open_turn_1st = !open_turn_1st;
    //     console.log('Is it open turn: ', open_turn_1st);
    // }
    if (event.type === "click") open_turn_1st = !open_turn_1st;

    $("#firstWindow").load("browser_window_1.html", function() {
        $(this).toggle(open_turn_1st);
    });
}

function click_open_btn() {
    $('#firstWindow-btn').on('click', open_close_window);
}

$(document).ready(function () {
    $mouse_click_detector = false;
    $window_click_detector = false;
    
    $position_x = 0;
    $position_y = 0;
    $click_position_x = 0;
    $click_position_y = 0;
    
    $brick = $("#firstWindow");

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
                    // const constrainedY = Math.max(0, newY);
                    const constrainedY = Math.max(0, Math.min($(window).height() - $brick.outerHeight(), newY));

                    $brick.css({
                        left: constrainedX + 'px',
                        top: constrainedY + 'px'
                    });
                }
            })
    });

    $(document).on('click', '.close-button', function(event){
        open_turn_1st = !open_turn_1st;
        $("#firstWindow").hide();
    });
});    

// ==========================================================================
/*
    the problems that i've countered today:
yeah JQuery is da bestttttt fk you javascript.
*/
// ==========================================================================

