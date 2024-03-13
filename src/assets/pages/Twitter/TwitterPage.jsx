import React from "react";
import { Header, Footer } from "../../components/BasicPageComponents";
import Box from "../../components/Box";
import { useTheme } from "../../hooks/useTheme";
import Reset from "../../components/Reset";

const TwitterPage = () => {
    const [isColor, setIsColor] = React.useState(false);
    const [url, setUrl] = React.useState("");

    const currentColor = useTheme(isColor);
    console.log("Theme:", currentColor);

    const handdleReset = () => {
        isColor(false);
        setUrl("");
    };

    return (
        <>
            <Header isColor={isColor} />

            {}
            <Box
                type="url"
                title="Enter the URL"
                link={url}
                setLink={setUrl}
                inputPlaceholder="https://www.twitter.com/"
                btnText="Proceed"
                handleButtonClick={() => {
                    setIsColor(true);
                }}
            />

            <Footer isColor={isColor} />
        </>
    );
};

export default TwitterPage;
