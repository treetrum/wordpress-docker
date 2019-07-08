import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const WhatWeBelieveCarouselItem = ({ item }) => {
    const animation = {
        timeout: 500,
        classNames: `slide-in-${item.direction > 0 ? "left" : "right"}`,
        mountOnEnter: true,
        unmountOnExit: true,
    };
    return (
        <TransitionGroup component={null}>
            <CSSTransition key={item.title} {...animation}>
                <div
                    className="what-we-believe-carousel-item"
                    style={{ height: item.height }}
                >
                    <img
                        className="what-we-believe-carousel-item__icon"
                        src={item.icon}
                        alt=""
                    />
                    <h2 className="heading-2 what-we-believe-carousel-item__title">
                        {item.title}
                    </h2>
                    <div className="what-we-believe-carousel-item__copy">
                        <p className="lead">{item.long_description}</p>
                    </div>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

WhatWeBelieveCarouselItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default WhatWeBelieveCarouselItem;
