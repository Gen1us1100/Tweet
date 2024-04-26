import React from "react";
import { Header, Footer } from "../../components/BasicPageComponents";
import Box from "../../components/Box";
import { Link } from "react-router-dom";
import TweetContainer from "./TweetContainer";
import { useTheme } from "../../hooks/useTheme";
import Tweet from "../../components/Tweet";
import SentimentHolder from "../../components/SentimentHolder";
import axios from "axios";
import Reset from "../../components/Reset";

const Home = () => {
    const [username, setUsername] = React.useState("");
    const [isWritingTweet, setIsWritingTweet] = React.useState(false);
    const [isColor, setIsColor] = React.useState(false);
    const [tweet, setTweet] = React.useState(false);
    const [tweetComment, setTweetComment] = React.useState("");
    const [boxText, setBoxText] = React.useState("Couldn't get a response 😥");

    const currentColor = useTheme(isColor);

    const handleTweet = async () => {
        const endpoint =
            "https://tweet-sentiment-analyser.onrender.com/analysis/";

        try {
            const response = await axios.put(endpoint, {
                text: tweetComment,
            });
            setBoxText(response.data);
        } catch (error) {
            setBoxText("Couldn't get a response 😥");
            console.log(error);
        } finally {
            setTweet(true);
            setIsWritingTweet(false);
        }
    };

    const handleReset = () => {
        setUsername("");
        setIsWritingTweet(false);
        setIsColor(false);
        setTweet(false);
        setTweetComment("");
        setBoxText("Couldn't get a response 😥");
    };

    return (
        <>
            <Header isColor={isColor} />

            {!isWritingTweet && !tweet && (
                <Box
                    type="username"
                    title="Enter your username"
                    username={username}
                    setUsername={setUsername}
                    inputPlaceholder="@username"
                    btnText="Proceed"
                    handleButtonClick={() => {
                        setIsWritingTweet(true);
                        setIsColor(true);
                    }}
                >
                    <Link to="/tweet" className="boxLink">
                        Check for real tweet?
                    </Link>
                </Box>
            )}

            {isWritingTweet && (
                <TweetContainer
                    setTweetComment={setTweetComment}
                    tweetComment={tweetComment}
                    handleTweet={() => handleTweet()}
                />
            )}

            {tweet && !isWritingTweet && (
                <>
                    <Tweet username={username} comment={tweetComment} />
                    <SentimentHolder boxText={boxText} />
                    <Reset handleReset={handleReset} />
                </>
            )}

            <Footer isColor={isColor} />
        </>
    );
};

export default Home;
