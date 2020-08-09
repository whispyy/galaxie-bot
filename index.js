require('dotenv').load();

const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');

const client = new Discord.Client();
const token = process.env.DISCORD_GALAXIE_BOT_SECRET;

client.login(token);

client.on('ready', () => {
  console.log(`Connected as: ${client.user.username}`);
});

client.on('message', msg => {
  if (msg.content[0] == '!') {
    const args = msg.content.substring(1).split(' ');
    const cmd = args[0];
    console.log('activate:', msg.content);

    switch (cmd) {
      case 'ping':
        msg.channel.send('pong');
        break;
      case 'galaxie':
      case 'play':
      case 'cocotier':
        playStream(msg, args[1]);
        break;
      case 'playYT':
      case 'playYoutube':
      case 'playVideo':
        playYoutube(msg, args[1]);
        break;
      case 'stop':
      case 'pause':
        stop();
        break;
    }
  }
});

/******************
* Command handler *
******************/
let connection;

async function playStream(message, stream = 'https://listen.radioking.com/radio/15684/stream/29075') {
  if (message.member.voice.channel) {
    connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(stream);

    dispatcher.on('finish', () => connection.disconnect());
  } else {
    message.channel.send('You must connect to a voice channel first');
  }
}

async function playYoutube(message, stream = 'https://www.youtube.com/watch?v=U06jlgpMtQs') {
  if (message.member.voice.channel) {
    connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(await ytdl(stream), { type: 'opus' });

    dispatcher.on('finish', () => connection.disconnect());
  } else {
    message.channel.send('You must connect to a voice channel first');
  }
}

function stop() {
  if (connection) {
    connection.disconnect();
  }
}
