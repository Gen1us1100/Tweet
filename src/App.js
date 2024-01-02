import Box from "./components/Box";
import FinalTweet from "./components/FinalTweet";
import Modal from "./components/Modal";
import Tweet from "./components/Tweet";
import React, { useState } from "react";

function App() {
    const [open, setOpen] = useState(true);
    const [tweeted, setTweeted] = useState(false);
    const [username, setUsername] = useState("");
    const [tweetComment, setTweetComment] = useState("");

    // change the setter function according to you
    const [boxText, setBoxText] = useState("Text that can change dynamically");

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        if (e.target.name === "username") setUsername(e.target.value);
        else setTweetComment(e.target.value);
    };

    const handleTweet = () => {
        setTweeted(true);
    };

    return (
        <div className="App" style={{ background: open ? "#fff" : "#1da1f2" }}>
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
                </>
            )}
        </div>
    );
}

export default App;
