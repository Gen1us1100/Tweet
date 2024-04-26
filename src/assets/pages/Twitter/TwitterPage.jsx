import React from "react";
import { Header, Footer } from "../../components/BasicPageComponents";
import Box from "../../components/Box";
import { useTheme } from "../../hooks/useTheme";
import Reset from "../../components/Reset";
import Tweet from "../../components/Tweet";
import SentimentHolder from "../../components/SentimentHolder";
import axios from "axios";

const TwitterPage = () => {
    const [isColor, setIsColor] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const [hasSubmitted, setHasSubmited] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [boxText, setBoxText] = React.useState("Couldn't get a response 😥");
    const [isSentiment, setIsSentiment] = React.useState(false);

    const currentColor = useTheme(isColor);

    const handdleReset = () => {
        setIsColor(false);
        setUrl("");
        setHasSubmited(false);
        setUsername("");
        setComment("");
        setBoxText("Couldn't get a response 😥");
    };

    const handleSubmit = async () => {
        const endpoint = "http://localhost:8000/twitter/";
        try {
            const response = await axios.put(endpoint, {
                URL: url,
            });
            setBoxText(response.data.response);
            setUsername(response.data.username);
            setComment(response.data.tweet_text);
        } catch (error) {
            setBoxText("Couldn't get a response 😥");
            console.log(error);
            setIsSentiment(true);
        } finally {
            setIsColor(true);
            setHasSubmited(true);
        }
    };

    return (
        <>
            <Header isColor={isColor} />

            {!hasSubmitted && (
                <Box
                    type="url"
                    title="Enter the URL"
                    link={url}
                    setLink={setUrl}
                    inputPlaceholder="https://www.twitter.com/"
                    btnText="Proceed"
                    handleButtonClick={handleSubmit}
                />
            )}

            {hasSubmitted && !isSentiment && (
                <Tweet username={username} comment={comment} />
            )}

            {hasSubmitted && (
                <>
                    <SentimentHolder boxText={boxText} />
                    <Reset handleReset={handdleReset} />
                </>
            )}

            <Footer isColor={isColor} />
        </>
    );
};

export default TwitterPage;
