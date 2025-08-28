let open_turn_1st = false;
let open_turn_2nd = false;

function click_open_btn() {
    $('#firstWindow-btn').on('click', event => {
        if (event.type === "click") open_turn_1st = !open_turn_1st;

        $("#firstWindow").load("browser_window_1.html", function() {
            $(this).toggle(open_turn_1st);
        });
    });

    $('#secondWindow-btn').on('click', event => {
        if (event.type === "click") open_turn_2nd = !open_turn_2nd;

        $("#secondWindow").load("browser_window_2.html", function() {
            $(this).toggle(open_turn_2nd);
        });
    });
    
}

$(document).ready(function () {
    $mouse_click_detector = false;
    $window_click_detector = false;
    
    $position_x = 0;
    $position_y = 0;
    $click_position_x = 0;
    $click_position_y = 0;
    
    $firstWindow = $("#firstWindow");
    $secondWindow = $("#secondWindow");

    click_open_btn();

    $(document).on('mousedown', '.title-bar', function(event) {
        element = event.target;
        console.log(element);
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
                    const constrainedX = Math.max(0, Math.min($(window).width() - $firstWindow.outerWidth(), newX));
                    // const constrainedY = Math.max(0, newY);
                    const constrainedY = Math.max(0, Math.min($(window).height() - $firstWindow.outerHeight(), newY));

                    $firstWindow.css({
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

