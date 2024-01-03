import pickle
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()
class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response


app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# model = pickle.load(open('app/tweetModel.sav', 'rb'))
# myVectorizer = joblib.load('app/myVectorizer.pkl')

model = pickle.load(open('tweetModel.sav', 'rb'))
myVectorizer = joblib.load('myVectorizer.pkl')

class Tweet(BaseModel):
    text: str

@app.put("/analysis/")
def predict_analysis(tweet:Tweet):
    myTweet = {tweet.text}
    Tweet_vector =  myVectorizer.transform(myTweet)
    prediction = model.predict(Tweet_vector)
    return('looks positive to me! 😃' if prediction else 'looks negative to me!😕') 

app.mount("/", StaticFiles(directory="staticfiles",html=True), name="static")
@app.get("/")
def read_root():
    return {"Hello":"World"}