import React from "react";
import "../../sass/tweetContainer.scss";

const TweetContainer = ({ handleTweet, setTweetComment, tweetComment }) => {
    const [warnMessage, setWarnMessage] = React.useState(false);

    return (
        <div className="tweetContainer">
            <textarea
                name="comment"
                placeholder="What's on your mind?"
                className="tweetContainer--textarea"
                onChange={(e) => {
                    setWarnMessage(false);
                    setTweetComment(e.target.value);
                }}
                value={tweetComment}
            ></textarea>

            {warnMessage && (
                <span className="warn-message">
                    Input field cannot be empty
                </span>
            )}

            <span className="tweetContainer--btn-holder">
                <button
                    className="tweetContainer--btn"
                    onClick={() => {
                        if (!tweetComment) setWarnMessage(true);
                        else handleTweet();
                    }}
                >
                    Tweet
                </button>
            </span>
        </div>
    );
};

export default TweetContainer;
