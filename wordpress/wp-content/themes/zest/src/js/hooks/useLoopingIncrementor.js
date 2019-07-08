import { useState } from "react";

const useLoopingIncrementor = max => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    /** Updates index in the positive direction */
    const increment = () => {
        setDirection(1);
        setCurrentIndex(i => {
            if (i + 1 < max) {
                return i + 1;
            }
            return 0;
        });
    };

    /** Updates index in the negative direction */
    const decrement = () => {
        setDirection(-1);
        setCurrentIndex(i => {
            if (i - 1 >= 0) {
                return i - 1;
            }
            return max - 1;
        });
    };

    const goTo = index => {
        setCurrentIndex(i => {
            setDirection(index < i ? -1 : 1);
            return index;
        });
    };

    return { currentIndex, increment, decrement, goTo, direction };
};

export default useLoopingIncrementor;
