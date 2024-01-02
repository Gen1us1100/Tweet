import React from "react";
import Tweet from "./Tweet";
import BottomIcons from "./BottomIcons";

const FinalTweet = ({ tweetComment, username }) => {
    return (
        <Tweet className="tweet-container final">
            <h1 className="final-tweet user">@{username}</h1>
            <p className="final-tweet comment">{tweetComment}</p>
            <BottomIcons />
        </Tweet>
    );
};

export default FinalTweet;
