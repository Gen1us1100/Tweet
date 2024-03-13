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
            <button
                className="boxBtn"
                onClick={() => {
                    if (!inputValue) setWarnMessage(true);
                    else handleButtonClick();
                }}
            >
                {btnText}
            </button>
            {children}
        </div>
    );
};

export default Box;
