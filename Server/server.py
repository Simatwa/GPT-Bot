# ----------------------------------------------------------------------------
# Name         : GPT-API | Used for tele and wa bot
# Desc         : Simple Python Flask api for ai completion
# Author       : Wildy Sheverando [Wildy8283]
# Date         : 26-03-2023
# License      : GNU General Public License V3
# License Link : https://raw.githubusercontent.com/wildy8283/lcn/main/gplv3
# ----------------------------------------------------------------------------

# >> Import library
import os
import json
import openai
import sys
from random import *
from flask import *

# Get the path of the API config file
exe_dir = sys._MEIPASS if hasattr(sys, '_MEIPASS') else os.path.dirname(os.path.abspath(__file__))
api_key_path = os.path.join(exe_dir, 'apikey.json')

# Load the API keys from the config file
with open(api_key_path) as config:
    api_keys = json.load(config)

# Function to get a random OpenAI API key
def get_random_api_key():
    random_api = randint(1, int(api_keys['totalapi']))
    return api_keys[f'api{random_api}']

# >> Function used to generate ai request
def chatai(req):
    messages = [
        { "role": "system", "content": "Halo, nama saya GPT-Bot, apa yang bisa saya bantu ?" },
    ]
    openai.api_key = get_random_api_key()
    messages.append({"role": "user", "content": req})
    results = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )
    return results.choices[0]['message']['content']

# Create a Flask app
app = Flask(__name__)

# Define an API endpoint to handle chat requests
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    request_input = data['input']
    response = chatai(request_input)
    return { 'response': response }

# Run the app on port 2824
if __name__ == '__main__':
    app.run(port=2824)
