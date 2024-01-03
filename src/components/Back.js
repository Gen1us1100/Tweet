import React from "react";

const Back = ({ handleClick }) => {
    return (
        <button className="back" onClick={handleClick}>
            Check Another?
        </button>
    );
};

export default Back;
