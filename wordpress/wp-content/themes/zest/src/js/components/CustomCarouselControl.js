import React from "react";
import PropTypes from "prop-types";
import useWindowInnerWidth from "../hooks/useWindowInnerWidth";

const CustomCarouselControl = ({ items, activeIndex, goTo }) => {
    console.log({ activeIndex });
    const windowInnerWidth = useWindowInnerWidth();
    return (
        <div className="custom-carousel-control">
            <div
                className="custom-carousel-control__highlight"
                style={{
                    width: `${100 / items.length}%`,
                    transform: `translateX(${activeIndex * 100}%)`,
                }}
            />
            <div className="custom-carousel-control__items">
                {items.map((item, index) => {
                    return (
                        <button
                            onClick={() => {
                                goTo(index);
                            }}
                            key={index}
                            className={`custom-carousel-control__button ${
                                activeIndex === index ? "active" : ""
                            }`}
                            type="button"
                        >
                            {windowInnerWidth > 1024
                                ? item.title
                                : `${index + 1}`}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

CustomCarouselControl.propTypes = {
    items: PropTypes.array.isRequired,
    goTo: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired,
};

CustomCarouselControl.propTypes = {};

export default CustomCarouselControl;
