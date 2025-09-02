import { zIndex } from "../scripts.js";

export class WindowManager {
    constructor(button, container, html) {
        this.button = button;
        this.container = container;
        this.html = html;
        this.openState = false;
    }

    // static updateZIndex() {
    //     zIndex += 1; // Class method updates global
    // }

    // static getZIndex() {
    //     return zIndex; // Class method reads global
    // }

    click_open_button() {
        this.button.on('click', event => {
            if (event.type === "click")
                // open_turn.open = !open_turn.open;
                this.openState = true;

            if (!this.container.data('loaded')) {
                this.container.load(this.html, this.display_window());
                this.container.data('loaded', true); // Mark as loaded
            } else {
                this.display_window();
            }
        });
    }

    display_window() {
        this.container.toggle(this.openState);

        // if (this.openState === true) {
        //     WindowManager.updateZIndex();
        // }
        // this.container.css({
        //     'z-index': WindowManager.getZIndex(),
        // })
    }
}