import React from "react";
import "../sass/reset.scss";
import { Link } from "react-router-dom";

const Reset = ({ handleReset }) => {
    return (
        <Link to="/">
            <button onClick={handleReset} className="resetBtn">
                Reset
            </button>
        </Link>
    );
};

export default Reset;
