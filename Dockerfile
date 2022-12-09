FROM node:18.12.1

RUN useradd bot && mkdir /home/bot &&chown -R bot:bot /home/bot

USER bot

WORKDIR /home/bot

RUN npm install @rocket.chat/sdk@0.2.9-2 && npm install got@11.8.6 && npm install dotenv@16.0.3

ADD ./ /home/bot

ENV SERVER_HOST=$SERVER_HOST
ENV BOT_USER=$BOT_USER
ENV PASS=$PASS
ENV BOTNAME=$BOTNAME
ENV SSL=$SSL
ENV ROOMS=$ROOMS
ENV OPENAI_SECRET_KEY=$OPENAI_SECRET_KEY

LABEL org.opencontainers.image.source="https://github.com/murf2/rocket.chat.bot.openai"

CMD node easybot.js