import React from "react";
import ReactDOM from "react-dom";

import Carousel from "../components/Carousel";
import WhatWeBelieveCarouselItem from "../components/WhatWeBelieveCarouselItem";
import CustomCarouselControl from "../components/CustomCarouselControl";

const el = document.querySelector("#what-we-believe-carousel");
if (el) {
    const pillars = JSON.parse(el.dataset.pillars);
    el.removeAttribute("data-pillars");
    ReactDOM.render(
        <Carousel
            items={pillars}
            keyExtractor={i => i.title}
            render={item => <WhatWeBelieveCarouselItem item={item} />}
            renderControl={CustomCarouselControl}
            dots={false}
        />,
        el,
    );
}
