import Box from "./components/Box";
import FinalTweet from "./components/FinalTweet";
import Modal from "./components/Modal";
import Tweet from "./components/Tweet";
import Footer from "./components/Footer";
import React, { useState } from "react";
import axios from "axios";
import Back from "./components/Back";

function App() {
    const [open, setOpen] = useState(true);
    const [tweeted, setTweeted] = useState(false);
    const [username, setUsername] = useState("");
    const [tweetComment, setTweetComment] = useState("");
    const [boxText, setBoxText] = useState("Couldn't get a response 😥");

    const version = "0.1.1";

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        if (e.target.name === "username") setUsername(e.target.value);
        else setTweetComment(e.target.value);
    };

    const handleTweet = async () => {
        await axios
            .put("https://tweet-sentiment-analyser.onrender.com/analysis/", {
                text: `${tweetComment}`,
            })
            .then(function (response) {
                setBoxText(response.data);
            });
        setTweeted(true);
    };

    const goBack = () => {
        setTweeted(false);
        setTweetComment("");
        setOpen(true);
        setUsername("");
        setBoxText("Couldn't get a response 😥");
    };

    return (
        <div className="App" style={{ background: open ? "#fff" : "#1da1f2" }}>
            <h1 style={{ color: open ? "black" : "white" }}>
                Tweet Sentiment Analyser
            </h1>
            <Modal isOpen={open}>
                <h1>Enter your username</h1>
                <input
                    type="text"
                    placeholder="@username"
                    onChange={handleChange}
                    name="username"
                    value={username}
                />
                <button onClick={handleClose}>Proceed</button>
            </Modal>

            {!open && !tweeted && (
                <Tweet className="tweet-container">
                    <textarea
                        value={tweetComment}
                        placeholder="What's on your mind?"
                        onChange={handleChange}
                        name="comments"
                        className="tweet-textarea"
                    ></textarea>
                    ,
                    <button onClick={handleTweet} className="tweet-btn">
                        Tweet
                    </button>
                </Tweet>
            )}

            {!open && tweeted && (
                <>
                    <FinalTweet
                        username={username}
                        tweetComment={tweetComment}
                    />
                    <Box content={boxText} />
                    <Back handleClick={goBack} />
                </>
            )}

            <Footer version={version} open={open} />
        </div>
    );
}

export default App;
