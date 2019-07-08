import React, { useState, useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types";

import { useGesture } from "react-with-gesture";
import useLoopingIncrementor from "../hooks/useLoopingIncrementor";
import useWindowInnerWidth from "../hooks/useWindowInnerWidth";
import useInterval from "../hooks/useInterval";

const Carousel = props => {
    const {
        currentIndex,
        increment,
        goTo,
        decrement,
        direction,
    } = useLoopingIncrementor(props.items.length);
    const [shouldHideRenderHelper, setShouldHideRenderHelper] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);
    const windowWidth = useWindowInnerWidth();
    const renderHelpersRef = useRef(null);

    // Auto change slides
    useInterval(increment, props.auto ? props.autoTimeout || 5000 : null);

    // Trigger recalculate of max height whenever the window changes size
    useEffect(() => {
        if (renderHelpersRef.current) {
            setShouldHideRenderHelper(false);
        }
    }, [renderHelpersRef, windowWidth]);

    // Recalculate max height when !shouldHideRenderHelper
    useEffect(() => {
        if (!shouldHideRenderHelper) {
            const els = Array.from(renderHelpersRef.current.children);
            const height = els.reduce(
                (max, el) => (el.clientHeight > max ? el.clientHeight : max),
                0,
            );
            setMaxHeight(height);
            setShouldHideRenderHelper(true);
        }
    }, [shouldHideRenderHelper]);

    const renderHeightHelper = () => {
        return (
            <>
                {/* The following will be hidden for most of the time. It is used to calculate the maximum height of these tiles */}
                <div
                    ref={renderHelpersRef}
                    className="carousel__render-helpers"
                    style={{
                        display: shouldHideRenderHelper ? "none" : null,
                        opacity: 0,
                        position: "absolute",
                    }}
                >
                    {props.items.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {props.render(item)}
                            </Fragment>
                        );
                    })}
                </div>
            </>
        );
    };

    const renderDots = () => {
        return (
            <div className="carousel__dots">
                {props.items.map((_, index) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                        key={index}
                        tabIndex={0}
                        role="button"
                        className={`carousel__dot ${
                            index === currentIndex
                                ? "carousel__dot--active"
                                : ""
                        }`}
                        onClick={() => {
                            goTo(index);
                        }}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                goTo(index);
                            }
                        }}
                    />
                ))}
            </div>
        );
    };

    // Movement handlers
    const swipeThreshold = 100;
    const [bind] = useGesture({
        onMouseDown: ({ event }) => {
            event.preventDefault();
        },
        onMove: ({ delta, cancel }) => {
            const [xTemp] = delta;
            if (xTemp < -swipeThreshold) {
                increment();
                cancel();
            } else if (xTemp > swipeThreshold) {
                decrement();
                cancel();
            }
        },
    });

    const currentRenderItem = props.items[currentIndex];

    return (
        <div className={`carousel ${props.className}`}>
            <div {...bind()}>
                {props.render({
                    ...currentRenderItem,
                    height: maxHeight,
                    direction,
                })}
            </div>
            {renderHeightHelper()}
            {props.dots ? renderDots() : null}
            {props.renderControl
                ? props.renderControl({
                      activeIndex: currentIndex,
                      items: props.items,
                      goTo,
                  })
                : null}
        </div>
    );
};

Carousel.defaultProps = {
    auto: false,
    autoTimeout: 5000,
    className: "",
    renderControl: null,
    dots: true,
};

Carousel.propTypes = {
    keyExtractor: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    render: PropTypes.func.isRequired,
    auto: PropTypes.bool,
    autoTimeout: PropTypes.number,
    className: PropTypes.string,
    renderControl: PropTypes.func,
    dots: PropTypes.bool,
};

export default Carousel;
