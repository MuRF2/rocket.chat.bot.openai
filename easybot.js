import { driver } from '@rocket.chat/sdk';
import got from 'got';
import { respmap } from './reply.js';
import dotenv from 'dotenv';
dotenv.config();

// Environment Setup
const HOST = process.env.SERVER_HOST;
const USER = process.env.BOT_USER;
const PASS = process.env.PASS;
const BOTNAME = process.env.BOTNAME;
const SSL = process.env.SSL;
const ROOMS = process.env.ROOMS.split(',');
var myUserId;
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY;

// Bot configuration
const runbot = async () => {
    const conn = await driver.connect({ host: HOST, useSsl: SSL })
    myUserId = await driver.login({ username: USER, password: PASS });
    const roomsJoined = await driver.joinRooms( ROOMS );
    console.log('joined rooms');
    const subscribed = await driver.subscribeToMessages();
    console.log('subscribed');
    const msgloop = await driver.reactToMessages( processMessages );
    console.log('connected and waiting for messages');
    const sent = await driver.sendToRoom( BOTNAME + ' is listening ...', ROOMS[0]);
    console.log('Greeting message sent');
}

//OpenAI API call
async function callOpenAI(input) {
        const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
        const prompt = `${input}`;
        const params = {
            "prompt": prompt,
            "max_tokens": 4000,
            "temperature": 0.7,
            "top_p" : 0,
            "frequency_penalty": 0
        };
        const headers = {
            'Authorization': 'Bearer ' + OPENAI_SECRET_KEY ,
        };
        let output;
        try {
            const response = await got.post(url, {json: params, headers: headers}).json();
            output = `${prompt}${response.choices[0].text}`;
            //console.log(output);
        } catch (err) {
            output = err;
            console.log(err);
        }
        return output;
}

// Process messages
const processMessages = async(err, message, messageOptions) => {
    if (!err) {
        if (message.u._id === myUserId) {
            console.log('Bots own message ignored');
            return;
        }
        const roomname = await driver.getRoomName(message.rid);
        console.log('got message ' + message.msg);
        var response;
        if (message.msg.startsWith('@' + BOTNAME) && message.msg.substring(BOTNAME.length + 2).length !== 0) {
            console.log('substring:' + message.msg.substring(BOTNAME.length + 2));
            if (message.msg.substring(BOTNAME.length + 2) in respmap) {
                console.log('send help text:');
                const response = respmap[message.msg.substring(BOTNAME.length + 2)];
                console.log(response);
                const sentmsg = await driver.sendToRoom(response, roomname);
            } else {
                console.log('OpenAI call processing...');
                response = await callOpenAI(message.msg.substring(BOTNAME.length + 2));
                console.log(response);
                const sentmsg = await driver.sendToRoom(response, roomname);
            }
        } else {
            console.log('ignoring...');
        }
    }
}

runbot()