import React from "react";
import pkg from "../../../package.json";
import "../sass/pageComponents.scss";

export const Header = ({ isColor }) => {
    return (
        <h1 className="pageHeader" style={{ color: isColor ? "#fff" : "#000" }}>
            Tweet Sentiment Analyser
        </h1>
    );
};
export const Footer = ({ isColor }) => {
    return (
        <footer
            className="pageFooter"
            style={{ color: isColor ? "#fff" : "#000" }}
        >
            <p>
                Model is still in progress expect it be accurate only{" "}
                <b>~80%</b> of times
            </p>
            <p style={{ marginTop: "10px" }}>Made with ❤️ by</p>
            <p>
                <b>Frontend- </b>Slogllykop, <b>Backend- </b>Gen1us
            </p>
            <p>
                @version-<b>{pkg.version}</b>
            </p>
        </footer>
    );
};
