import pickle
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from starlette.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = pickle.load(open('tweetModel.sav', 'rb'))
myVectorizer = joblib.load('myVectorizer.pkl')

class Tweet(BaseModel):
    text: str
    


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.put("/analysis/")
def predict_analysis(tweet:Tweet):
    myTweet = {tweet.text}
    Tweet_vector =  myVectorizer.transform(myTweet)
    prediction = model.predict(Tweet_vector)
    return('looks positive to me! 😃' if prediction else 'looks negative to me!😕') 