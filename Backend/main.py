import pickle
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

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

class Url(BaseModel):
    URL:str

@app.put("/analysis/")
def predict_analysis(tweet:Tweet):
    myTweet = {tweet.text}
    Tweet_vector =  myVectorizer.transform(myTweet)
    prediction = model.predict(Tweet_vector)
    return('looks positive to me! 😃' if prediction else 'looks negative to me!😕')

@app.put("/twitter/")
def tweet_analysis(url:Url):
    myURL = {url.URL}
    myTweet = getTweetText(next(iter(myURL)))
    Tweet_vector =  myVectorizer.transform({myTweet})
    prediction = model.predict(Tweet_vector)
    return('looks positive to me! 😃' if prediction else 'looks negative to me!😕')
 

app.mount("/", StaticFiles(directory="staticfiles",html=True), name="static")
@app.get("/")
def read_root():
    return {"Hello":"World"}

def getTweetText(target_url:str):
    # print("URL IS THIS :"+target_url)
    # print("URL IS THIS :",str(type(target_url)))
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    driver=webdriver.Chrome( options=chrome_options)
    driver.get(target_url)
    time.sleep(5)
    resp = driver.page_source
    soup=BeautifulSoup(resp,'html.parser')
    TweetText = soup.find("div",{"class":"css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-1inkyih r-16dba41 r-bnwqim r-135wba7"}).text
    driver.close()
    return TweetText