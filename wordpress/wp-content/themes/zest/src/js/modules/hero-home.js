class HeroHome {
    static selectors = {
        image: ".hero-home__image",
        imageMobile: ".hero-home__image-mobile",
        title: ".hero-home__title",
    };

    constructor(el) {
        this.animationDuration = 1000;
        this.slideTimeout = 5000;
        this.el = el;
        this.slideIndex = 0;
        this.items = JSON.parse(el.dataset.slides);
        this.image = el.querySelector(HeroHome.selectors.image);
        this.mobileImage = el.querySelector(HeroHome.selectors.imageMobile);
        this.title = el.querySelector(HeroHome.selectors.title);
        this.preloadImages();
        this.attachHandlers();

        // Idle watcher
        // Whenver we wake up - call cleanup then reattach handlers
        let intTime = Date.now();
        const getTime = () => {
            const intNow = Date.now();
            if (intNow - intTime > 1000) {
                this.cleanup();
                this.attachHandlers();
            }
            intTime = intNow;
            setTimeout(getTime, 500);
        };
        getTime();
    }

    preloadImages = () => {
        this.items.forEach(item => {
            const image = new Image();
            image.src = item.desktop_image;
        });
    };

    attachHandlers = () => {
        this.interval = setInterval(() => {
            this.slideIndex = (this.slideIndex + 1) % this.items.length;
            this.render();
        }, this.slideTimeout);
    };

    cleanup = () => {
        clearInterval(this.interval);

        const images = this.el.querySelectorAll(`${HeroHome.selectors.image}`);
        const mobileImages = this.el.querySelectorAll(
            `${HeroHome.selectors.imageMobile}`,
        );
        const titles = this.el.querySelectorAll(`${HeroHome.selectors.title}`);

        this.removeAllButLast(images);
        this.removeAllButLast(mobileImages);
        this.removeAllButLast(titles);

        this.image = this.el.querySelector(HeroHome.selectors.image);
        this.mobileImage = this.el.querySelector(
            HeroHome.selectors.imageMobile,
        );
        this.title = this.el.querySelector(HeroHome.selectors.title);
    };

    removeAllButLast = domNodeList => {
        if (domNodeList.length < 2) return;
        domNodeList.forEach((item, index) => {
            if (index === domNodeList.length - 1) return;
            item.remove();
        });
    };

    transition = (oldEl, newEl) => {
        return new Promise(resolve => {
            newEl.classList.add("fade-enter");
            oldEl.classList.add("fade-exit");

            oldEl.insertAdjacentElement("afterend", newEl);

            requestAnimationFrame(() => {
                newEl.classList.add("fade-enter-active");
                oldEl.classList.add("fade-exit-active");
            });

            setTimeout(() => {
                oldEl.remove();
                newEl.classList.remove("fade-enter");
                newEl.classList.remove("fade-enter-active");
                resolve();
            }, this.animationDuration);
        });
    };

    render = () => {
        const newTitle = this.title.cloneNode(true);
        newTitle.innerHTML = this.items[this.slideIndex].title;
        this.transition(this.title, newTitle).then(() => {
            this.title = newTitle;
        });

        const newImage = this.image.cloneNode(true);
        newImage.style.backgroundImage = `url(${this.items[this.slideIndex].desktop_image})`;
        this.transition(this.image, newImage).then(() => {
            this.image = newImage;
        });

        const newMobileImage = this.mobileImage.cloneNode(true);
        newMobileImage.style.backgroundImage = `url(${this.items[this.slideIndex].mobile_image})`;
        this.transition(this.mobileImage, newMobileImage).then(() => {
            this.mobileImage = newMobileImage;
        });
    };
}

const els = document.querySelectorAll(".hero-home");
els.forEach(el => {
    new HeroHome(el);
});
