# Rocket.Chat.Bot.Openai
This Chat Bot for Rocket Chat makes OpenAI API requests to the OpenAI Davinci text model. This model is designed to provide a conversational experience for users, allowing them to ask questions and receive answers in natural language. The bot uses the OpenAI Davinci model, a deep learning-based natural language processing system, to understand and respond to user queries in a natural way. The bot is easy to use and integrate into existing Rocket Chat environments, and can be used to provide a conversational experience for users.

This documentation was written using ChatGPT, which is available at chat.openai.com.

https://user-images.githubusercontent.com/33971651/206847590-2c6aaea7-e6a0-4625-91c3-be49e3ac2c4a.mp4

## Control - Bot commands
The bot is designed to listen for messages that begin with "@BOTNAME". When the bot detects that it is called out, it will send the entire message to the OpenAI API for processing. The bot will then forward the response back to the room where the original message was sent.

In addition to this function, the bot also supports the following basic commands:
```
@BOTNAME help - provides information on how to use the bot and its available commands
@BOTNAME about - provides information on the bot's purpose and development
@BOTNAME instructions - provides a list of instructions on how to use the bot
```

## Setup
### Docker setup
To start the container, use the following command and include the necessary environment variables:
```
docker run -it \
-e SERVER_HOST=yourserver.com \
-e BOT_USER=bot_account_name \
-e PASS=bot_account_password \
-e BOTNAME=name_bot_response_to \
-e SSL=true \
-e ROOMS=room1,room2,room3 \
-e OPENAI_SECRET_KEY=api_key \
ghcr.io/murf2/rocket.chat.bot.openai:latest
```
Alternatively, you can use the provided Dockerfile to create a image. To do this, run the following command:
```
docker build . -t yourtag
```

### Manual install
To use this bot, you need to have the latest version of Node.js (v18.12.1) installed. You can check your current version with the following command:
```
node -v
```
1. Clone the repository:
```
git clone https://github.com/MuRF2/rocket.chat.bot.openai
```
2. Install the required dependencies:
```
npm install @rocket.chat/sdk@0.2.9-2 && npm install got@11.8.6 && npm install dotenv@16.0.3
```
3. Create a .env file that contains your server login information and OpenAI API key. The file should have the following format:
```
SERVER_HOST='yourserver.com'
BOT_USER='bot_account_name'
PASS='bot_account_password'
BOTNAME='name_bot_response_to'
SSL='true'
ROOMS='room1,room2,room3'
OPENAI_SECRET_KEY='api_key'
```
4. Start the bot:
```
node easybot.js
```
