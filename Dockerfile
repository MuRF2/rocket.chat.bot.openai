FROM node:18.12.1

RUN useradd hubot && mkdir /home/hubot &&chown -R hubot:hubot /home/hubot

USER hubot

WORKDIR /home/hubot

RUN npm install @rocket.chat/sdk && npm install got

ADD ./ /home/hubot

ENV SERVER_HOST=$SERVER_HOST
ENV BOT_USER=$BOT_USER
ENV PASS=$PASS
ENV BOTNAME=$BOTNAME
ENV SSL=$SSL
ENV ROOMS=$ROOMS
ENV OPENAI_SECRET_KEY=$OPENAI_SECRET_KEY

LABEL org.opencontainers.image.source="https://github.com/murf2/rocket.chat.bot.openai"

CMD node easybot.js