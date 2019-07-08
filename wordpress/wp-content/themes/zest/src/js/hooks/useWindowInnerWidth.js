import { useState, useEffect } from "react";

const useWindowInnerWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const runner = () => {
            setWindowWidth(window.innerWidth);
        };
        runner();
        window.addEventListener("resize", runner);
        return () => {
            window.removeEventListener("resize", runner);
        };
    }, []);
    return windowWidth;
};

export default useWindowInnerWidth;
