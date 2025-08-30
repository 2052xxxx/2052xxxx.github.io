$firstWindow_open = false;
$secondWindow_open = false;
$z_index = -1;

function click_open_btn() {
    $('#firstWindow-btn').on('click', event => {
        if (event.type === "click") $firstWindow_open = !$firstWindow_open;

        $("#firstWindow").load("browser_window_1.html", function() {
            $(this).toggle($firstWindow_open);

            if ($firstWindow_open === true){
                $z_index += 1;
            }
            $("#firstWindow").css({
                'z-index': $z_index,
            })
        });
    });

    $('#secondWindow-btn').on('click', event => {
        if (event.type === "click") $secondWindow_open = !$secondWindow_open;

        $("#secondWindow").load("browser_window_2.html", function() {
            $(this).toggle($secondWindow_open);
            if ($secondWindow_open === true){    
                $z_index += 1;
            }
            $("#secondWindow").css({
                'z-index': $z_index,
            })
        });
    });
    
}

$(document).ready(function () {
    $mouse_click_detector = false;
    $window_click_detector = false;
    $firstClickDetected = false;
    
    $position_x = 0;
    $position_y = 0;
    $click_position_x = 0;
    $click_position_y = 0;

    
    click_open_btn();
    
    $firstWindow = $("#firstWindow");
    $secondWindow = $("#secondWindow");

    $(document).on('mousedown', '.title-bar', function(event) {
        $parentWindow = this.closest('div[id$="Window"]');
        $targetWindow = $("#" + $parentWindow.id);
        $z_index += 1;

        // console.log("You clicked on the title bar of: ", $parentWindow);
        // console.log("$firstWindow[0]: ", $firstWindow[0]);
        
        // if($parentWindow === $firstWindow[0]){ 
        //     console.log("yes 1")
        // } else if($parentWindow === $secondWindow[0]){
        //     console.log("yes 2")
        // }

        $mouse_click_detector = true;

        $(window)
            .on("mouseup", () => {
                $mouse_click_detector = false;
                $window_click_detector = false;
                // $targetWindow.toggleClass("z-index10");
                $targetWindow.css({
                    'z-index': $z_index,
                });

            })
            .on("mousedown", event => {
                // mousedown = nhấn chuột xuống
                if ($mouse_click_detector === true) {
                    $window_click_detector = true;
                    var rect = $(this).get(0).getBoundingClientRect();;
                    $click_position_x = event.clientX - rect.left;
                    $click_position_y = event.clientY - rect.top;
                    // $targetWindow.addClass("z-index10");
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
                    const constrainedX = Math.max(0, Math.min($(window).width() - $targetWindow.outerWidth(), newX));
                    // const constrainedY = Math.max(0, newY);
                    const constrainedY = Math.max(0, Math.min($(window).height() - $targetWindow.outerHeight(), newY));
                    $targetWindow.css({
                        left: constrainedX + 'px',
                        top: constrainedY + 'px',
                        'z-index': $z_index,
                    });
                }
            })
    });

    $(document).on('click', '.close-button', function(event){
        $parentWindow = this.closest('div[id$="Window"]');

        if($parentWindow === $firstWindow[0]){ 
            console.log("yes 1")
            $firstWindow_open = !$firstWindow_open;
            $("#firstWindow").hide();
        } else if($parentWindow === $secondWindow[0]){
            console.log("yes 2")
            $secondWindow_open = !$secondWindow_open;
            $("#secondWindow").hide();
        }
    });
});    

// ==========================================================================
/*
    the problems that i've countered today:
yeah JQuery is da bestttttt fk you javascript.
*/
// ==========================================================================

