import _ from "lodash";

class ViewportHeightTouchFix {
    constructor() {
        this.handleResize();
        this.attachHandlers();
    }

    attachHandlers = () => {
        window.addEventListener("resize", this.handleResize);
    };

    handleResize = () => {
        document.body.style.setProperty(
            "--vh",
            `${window.innerHeight / 100}px`,
        );
        if (!document.body.classList.contains("vh-set")) {
            setTimeout(() => {
                document.body.classList.add("vh-set");
            }, 100);
        }
    };

    debouncedHandleResize = _.debounce(this.handleResize, 250);
}

document.addEventListener("DOMContentLoaded", () => {
    new ViewportHeightTouchFix();
});
