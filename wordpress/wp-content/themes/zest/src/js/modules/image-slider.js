class ImageSlider {
    constructor(el) {
        this.el = el;
        this.slidingEl = this.el.querySelector(".image-slider__scroll");
        this.control = this.el.querySelector(".image-slider__control__thumb");
        this.controlContainer = this.el.querySelector(".image-slider__control");
        this.setThumbWidth();
        this.attachHandlers();
    }

    attachHandlers = () => {
        this.slidingEl.addEventListener("scroll", this.handleSliderScroll);
        this.control.addEventListener("mousedown", this.handleControlMouseDown);
        this.slidingEl.addEventListener(
            "mousedown",
            this.handleSliderMouseDown,
        );
        this.slidingEl.addEventListener("click", this.handleSliderClick);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("resize", this.setThumbWidth);
    };

    setThumbWidth = () => {
        const { clientWidth, scrollWidth } = this.slidingEl;
        this.thumbWidthPercent = clientWidth / scrollWidth;
        this.thumbWidth = (1 - this.thumbWidthPercent) * clientWidth;
        this.control.style.width = `${this.thumbWidthPercent * 100}%`;
        if (this.thumbWidthPercent >= 1) {
            this.controlContainer.style.display = "none";
        } else {
            this.controlContainer.style.display = "";
        }
    };

    handleSliderScroll = () => {
        const { scrollLeft, clientWidth, scrollWidth } = this.slidingEl;
        const scrollPercent = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        this.control.style.left = `${scrollPercent}%`;
        this.control.style.transform = `translateX(${-scrollPercent}%)`;
    };

    handleSliderMouseDown = event => {
        event.preventDefault();
        this.sliderMouseDown = true;
        this.mouseX = event.clientX;
        this.scrollElX = this.slidingEl.scrollLeft;
    };

    handleControlMouseDown = event => {
        this.controlMouseDown = true;
        this.mouseX = event.clientX;
        this.scrollElX = this.slidingEl.scrollLeft;
    };

    handleMouseMove = event => {
        if (this.controlMouseDown) {
            const delta = event.clientX - this.mouseX;
            const dragMultiplier = 1 / this.thumbWidthPercent;
            this.slidingEl.scrollLeft = delta * dragMultiplier + this.scrollElX;
        }
        if (this.sliderMouseDown) {
            const delta = this.mouseX - event.clientX;
            this.slidingEl.scrollLeft = delta + this.scrollElX;
            this.sliderDelta = delta;
        }
    };

    handleMouseUp = () => {
        this.controlMouseDown = false;
        this.sliderMouseDown = false;
    };

    handleSliderClick = event => {
        if (this.sliderDelta > 10) {
            event.preventDefault();
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const els = Array.from(document.querySelectorAll(".image-slider"));
    els.map(el => new ImageSlider(el));
});
