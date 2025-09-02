import WindowManager from './class/WindowManager';
export let zIndex = -1;

$(document).ready(function () {
    // Use const/let instead of implicit globals
    const windowStates = {
        firstWindow: {
            open: false
        },
        secondWindow: {
            open: false
        }
    };

    let isDragging = false;
    let dragData = {
        target: null,
        offsetX: 0,
        offsetY: 0
    };

    function click_open_btn(button, open_turn, html, container) {
        button.on('click', event => {
            if (event.type === "click")
                // open_turn.open = !open_turn.open;
                open_turn.open = true;

            if (!container.data('loaded')) {
                container.load(html, display_window(container, open_turn));
                container.data('loaded', true); // Mark as loaded
            } else {
                display_window(container, open_turn);
            }
        });
    }

    function display_window(container, open_turn) {
        container.toggle(open_turn.open);

        if (open_turn.open === true) {
            zIndex += 1;
        }
        container.css({
            'z-index': zIndex,
        })

    }

    const $firstWindow = $("#firstWindow");
    const $secondWindow = $("#secondWindow");

    // Initialize window buttons
    click_open_btn($('#firstWindow-btn'), windowStates.firstWindow, "browser_window_1.html", $firstWindow);
    click_open_btn($('#secondWindow-btn'), windowStates.secondWindow, "browser_window_2.html", $secondWindow);

    // Window drag handling
    $(document).on('mousedown', '.title-bar', function (event) {
        const $targetWindow = $(this).closest('div[id$="Window"]');
        zIndex += 1;
        isDragging = true;

        dragData = {
            target: $targetWindow,
            offsetX: event.clientX - $targetWindow.offset().left,
            offsetY: event.clientY - $targetWindow.offset().top
        };

        $targetWindow.css('z-index', zIndex);
        event.preventDefault();
    });

    // Global mouse events for dragging
    $(document)
        .on('mousemove', function (event) {
            if (!isDragging || !dragData.target) return;

            const newX = event.clientX - dragData.offsetX;
            const newY = event.clientY - dragData.offsetY;

            // Constrain to viewport
            const constrainedX = Math.max(0, Math.min($(window).width() - dragData.target.outerWidth(), newX));
            const constrainedY = Math.max(0, Math.min($(window).height() - dragData.target.outerHeight(), newY));

            dragData.target.css({
                left: constrainedX + 'px',
                top: constrainedY + 'px'
            });
        })
        .on('mouseup', function () {
            isDragging = false;
            dragData.target = null;
        });

    // Close button handling
    $(document).on('click', '.close-button', function (event) {
        const $parentWindow = $(this).closest('div[id$="Window"]');

        if ($parentWindow.is($firstWindow)) {
            windowStates.firstWindow.open = false;
            display_window($firstWindow, windowStates.firstWindow);
        } else if ($parentWindow.is($secondWindow)) {
            windowStates.secondWindow.open = false;
            display_window($secondWindow, windowStates.secondWindow);
        }
    });
});
