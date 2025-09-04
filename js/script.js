import {WindowManager} from './class/WindowManager.js';

$(document).ready(function () {
    let isDragging = false;
    let dragData = {
        target: null,
        offsetX: 0,
        offsetY: 0
    };
    
    const firstWindow = new WindowManager(
        $('#firstWindow-btn'),
        $("#firstWindow"),
        "browser_window_1.html"
    );
    const secondWindow = new WindowManager(
        $('#secondWindow-btn'),
        $("#secondWindow"),
        "browser_window_2.html"
    );

    // Initialize window buttons
    firstWindow.init();
    secondWindow.init();

    // Window drag handling
    $(document).on('mousedown', '.title-bar', function (event) {
        const $targetWindow = $(this).closest('div[id$="Window"]');
        WindowManager.updateZIndex();
        isDragging = true;

        dragData = {
            target: $targetWindow,
            offsetX: event.clientX - $targetWindow.offset().left,
            offsetY: event.clientY - $targetWindow.offset().top
        };

        $targetWindow.css('z-index', WindowManager.zIndex);
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

        if ($parentWindow.is(firstWindow.container)) {
            console.log("yes 1")
            firstWindow.openState = false;
            firstWindow.display_window();

        } else if ($parentWindow.is(secondWindow.container)) {
            console.log("yes 2")
            secondWindow.openState = false;
            secondWindow.display_window();
        }
    });
});
