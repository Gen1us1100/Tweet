import React from "react";

export const useTheme = (isColor) => {
    const currentColor = isColor ? "#1da1f2" : "#fff";
    const root = document.querySelector("#root");

    React.useLayoutEffect(() => {
        root.style.backgroundColor = currentColor;
    }, [currentColor]);

    return currentColor;
};
