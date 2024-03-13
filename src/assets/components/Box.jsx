import React from "react";
import "../sass/box.scss";

const Box = ({
    title,
    username,
    setUsername,
    link,
    setLink,
    inputPlaceholder,
    btnText,
    children,
    handleButtonClick,
    type,
}) => {
    const [inputValue, setInputValue] = React.useState(
        type === "username" ? username : link
    );
    const [warnMessage, setWarnMessage] = React.useState(false);
    const [urlMessage, setUrlMessage] = React.useState(false);

    return (
        <div className="box">
            <h2 className="boxHeader">{title}</h2>
            <input
                type="text"
                placeholder={inputPlaceholder}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    type === "username"
                        ? setUsername(e.target.value)
                        : setLink(e.target.value);

                    setUrlMessage(false);
                    setWarnMessage(false);
                }}
                name="boxInput"
                value={inputValue}
                className="boxInput"
            />
            {warnMessage && (
                <span className="warn-message">
                    Input field cannot be empty
                </span>
            )}
            {urlMessage && (
                <span className="warn-message">Enter a valid URL</span>
            )}
            <button
                className="boxBtn"
                onClick={() => {
                    if (!inputValue) {
                        setWarnMessage(true);
                        return;
                    } else if (type === "username") {
                        handleButtonClick();
                        return;
                    }
                    if (
                        type === "url" &&
                        !link.includes("https://twitter.com/")
                    ) {
                        setUrlMessage(true);
                    } else handleButtonClick();
                }}
            >
                {btnText}
            </button>
            {children}
        </div>
    );
};

export default Box;
