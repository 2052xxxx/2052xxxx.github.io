import { WindowManager } from './class/WindowManager.js';

$(document).ready(function () {
    let isDragging = false;
    let dragData = {
        target: null,
        offsetX: 0,
        offsetY: 0
    };

    // const firstWindow = new WindowManager(
    //     $('#firstWindow-btn'),
    //     $("#firstWindow"),
    //     "/windows/browser_window_1.html"
    // );
    // const secondWindow = new WindowManager(
    //     $('#secondWindow-btn'),
    //     $("#secondWindow"),
    //     "/windows/browser_window_2.html"
    // );

    // const thirdWindow = new WindowManager(
    //     $('#thirdWindow-btn'),
    //     $("#thirdWindow"),
    //     "/windows/browser_window_3.html"
    // );

    // firstWindow.init();
    // secondWindow.init();
    // thirdWindow.init();

    const aboutWindow = new WindowManager(
        $('#about-btn'),
        $("#aboutWindow"),
        "/windows/about.html"
    );    

    const certificateWindow = new WindowManager(
        $('#certificate-btn'),
        $("#certificateWindow"),
        "/windows/about.html"
    );    

    const projectsWindow = new WindowManager(
        $('#projects-btn'),
        $("#projectsWindow"),
        "/windows/about.html"
    );    

    const myResumeWindow = new WindowManager(
        $('#myResume-btn'),
        $("#myResumeWindow"),
        "/windows/about.html"
    );    

    const contactWindow = new WindowManager(
        $('#contact-btn'),
        $("#contactWindow"),
        "/windows/about.html"
    );    
    // Initialize window buttons
    aboutWindow.init();
    certificateWindow.init();
    projectsWindow.init();
    myResumeWindow.init();
    contactWindow.init();

    // Window drag handling
    $(document).on('mousedown touchstart', '.title-bar', function (event) {
        const $targetWindow = $(this).closest('div[id$="Window"]');
        WindowManager.updateZIndex();
        isDragging = true;

        const clientX = event.clientX || event.originalEvent.touches[0].clientX;
        const clientY = event.clientY || event.originalEvent.touches[0].clientY;

        dragData = {
            target: $targetWindow,
            offsetX: clientX - $targetWindow.offset().left,
            offsetY: clientY - $targetWindow.offset().top
        };

        $targetWindow.css({
            'z-index': WindowManager.zIndex,
            'transition': 'none'
        });

        event.preventDefault();
    });

    // Global mouse events for dragging
    $(document)
        .on('mousemove touchmove', function (event) {
            if (!isDragging || !dragData.target) return;

            const clientX = event.clientX || event.originalEvent.touches[0].clientX;
            const clientY = event.clientY || event.originalEvent.touches[0].clientY;

            const newX = clientX - dragData.offsetX;
            const newY = clientY - dragData.offsetY;

            // Constrain to viewport
            const constrainedX = Math.max(0, Math.min($(window).width() - dragData.target.outerWidth(), newX));
            const constrainedY = Math.max(0, Math.min($(window).height() - dragData.target.outerHeight(), newY));

            dragData.target.css({
                left: constrainedX + 'px',
                top: constrainedY + 'px'
            });

            event.preventDefault();
        })
        .on('mouseup touchend', function () {
            isDragging = false;
            if (dragData.target) {
                dragData.target.css('transition', '');
                dragData.target = null;
            }
        });

    // Close button handling
    $(document).on('click', '.close-button', function (event) {
        const $parentWindow = $(this).closest('div[id$="Window"]');
        const windowInstance = WindowManager.my_windows.find(win =>
            $parentWindow.is(win.container)
        );

        if (windowInstance) {
            windowInstance.click_close_button();
        }
    });
});
