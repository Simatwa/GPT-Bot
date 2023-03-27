# GPT-3 Chatbot with Flask API

This is a simple implementation of a GPT-3.5 Turbo chatbot using Flask API.
and used for whatsapp & telegram bot

## Usage

1. Clone the repository
2. Install the required dependencies with `pip install -r requirements.txt`
3. Create a `apikey.json` file in the root directory with your OpenAI API keys (see `apikey-example.json` for the format)
4. Run the app with `python app.py`
5. Send a POST request to `http://localhost:2824/chat` with a JSON body containing the user input (see `example.json` for the format)

## License

This project is licensed under the GPL-v3 License. See `LICENSE` for more information.
