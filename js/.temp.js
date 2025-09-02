$firstWindow_open = false;
$secondWindow_open = false;
$z_index = -1;

function click_open_btn(button, open_turn, html, container) {
    button.on('click', event => {
        if (event.type === "click") 
            open_turn = !open_turn;

        container.load(html, function() {
            $(this).toggle(open_turn);
            
            if (open_turn === true){    
                $z_index += 1;
            }
            container.css({
                'z-index': $z_index,
            })
        });
    });
}
// =================================================================
function click_open_btn() {
    $('#firstWindow-btn').on('click', event => {
        if (event.type === "click") 
            $firstWindow_open = !$firstWindow_open;

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
// =================================================================
