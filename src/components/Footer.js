import React from "react";

const Footer = ({ version, open }) => {
    return (
        <footer className="footer" style={{ color: open ? "black" : "white" }}>
            <p>
                Model is still in progress expect it be accurate only{" "}
                <b>~80%</b> of times
            </p>
            <p style={{ marginTop: "10px" }}>Made with ❤️ by</p>
            <p>
                <b>Frontend- </b>Slogllykop, <b>Backend- </b>Gen1us
            </p>
            <p>
                @version-<b>{version}</b>
            </p>
        </footer>
    );
};

export default Footer;
