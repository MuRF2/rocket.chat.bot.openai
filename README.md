# Rocket.Chat.Bot.Openai
This chat bot for Rocket Chat uses the OpenAI Davinci text model. It is designed to provide a conversational experience for users, allowing them to ask questions and receive answers in natural language. The bot is powered by the OpenAI Davinci model, which is a deep learning-based natural language processing system. The model is trained on a large corpus of text, allowing it to understand and respond to user queries in a natural way. The bot is designed to be easy to use and integrate into existing Rocket Chat environments. It can be used to provide a conversational experience for users, allowing them to ask questions and receive answers in natural language.

This documentation was written using ChatGPT, which is available at chat.openai.com.

## Control - Bot commands
The bot is designed to listen for messages that begin with the "!" symbol. When it detects one, it will send the entire message to the OpenAI API for processing. The bot will then forward the response back to the room where the original message was sent.

In addition to this basic function, the bot also supports the following commands:
```
!help - provides information on how to use the bot and its available commands
!about - provides information on the bot's purpose and development
!instructions - provides a list of instructions on how to use the bot

```

## Setup
### Docker setup
To start the container, use the following command:
```
docker run -it \
-e SERVER_HOST=yourserver.com \
-e BOT_USER=bot_account_name \
-e PASS=bot_account_password \
-e BOTNAME=name  bot response to \
-e SSL=true \
-e ROOMS=room \
-e OPENAI_SECRET_KEY=api_key \
ghcr.io/murf2/rocket.chat.bot.openai:latest
```
Alternatively, you can use the provided Dockerfile to create a image. To do this, run the following command:
```
docker build . -t yourtag
```
To start the container, use the following command and include the necessary environment variables:
```
docker run -it \
-e SERVER_HOST=yourserver.com \
-e BOT_USER=bot_account_name \
-e PASS=bot_account_password \
-e BOTNAME=name  bot response to \
-e SSL=true \
-e ROOMS=room \
-e OPENAI_SECRET_KEY=api_key \
you/yourtag:1
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
npm install @rocket.chat/sdk && npm install got
```
3. Create a .env file that contains your server login information and OpenAI API key. The file should have the following format:
```
SERVER_HOST='yourserver.com'
BOT_USER='bot_account_name'
PASS='bot_account_password'
BOTNAME='name  bot response to'
SSL='true'
ROOMS='room'
OPENAI_SECRET_KEY='api_key'
```
4. Start the bot:
```
node easybot.js
```