import React from "react";
import "../sass/sentimentHolder.scss";

const SentimentHolder = ({ boxText }) => {
    return (
        <div className="sentimentHolder">
            <h2>{boxText}</h2>
        </div>
    );
};

export default SentimentHolder;
