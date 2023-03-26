import os
import json
import openai
import sys
from random import *
from flask import Flask, request

# >> Get api config path
exe_dir = sys._MEIPASS if hasattr(sys, '_MEIPASS') else os.path.dirname(os.path.abspath(__file__))
api_key_path = os.path.join(exe_dir, 'apikey.json')

# >> Open apiconfig as apikeynya
with open(api_key_path) as config:
    apikeynya = json.load(config)

# Function used for get random openai key
def getrandkey():
    random_api = randint(1, int(apikeynya['totalapi']))
    resultapi = apikeynya[f'api{random_api}']
    return resultapi

# >> Function used to generate ai request
def chatai(req):
    messages = [
        { "role": "system", "content": "Halo, nama saya GPT-Bot, apa yang bisa saya bantu ?" },
    ]
    openai.api_key = getrandkey()
    messages.append({"role": "user", "content": req})
    results = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )
    return results.choices[0]['message']['content']

# Create Flask app
app = Flask(__name__)

# Define API endpoint
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    input = data['input']
    response = chatai(input)
    return { 'response': response }

# Run app on port 2824
if __name__ == '__main__':
    app.run(port=2824)
