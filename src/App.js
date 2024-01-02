import Box from "./components/Box";
import FinalTweet from "./components/FinalTweet";
import Modal from "./components/Modal";
import Tweet from "./components/Tweet";
import React, { useState } from "react";
import axios from 'axios';

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

    const handleTweet = async () =>  {
         await axios.put('https://tweet-sentiment-analyser.onrender.com/analysis/',{
            "text":`${tweetComment}`
        }).then(function (response) {
            setBoxText(response.data);
          })
        setTweeted(true);
    };

    return (
        <><h1 style={{background: open ? "#fff" : "#1da1f2",textAlign:"center"}}>Tweet Sentiment Analyser</h1>
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
        <footer style={{background: open ? "#fff" : "#1da1f2", textAlign:"center"}}>Model is still in progress expect it be accurate only ~80% of times<br/>Made with ❤️ by<br/>Frontend-Slogllykop,Backend-Gen1us<br/>version 0.1.0</footer>
        </>
    );
}

export default App;
