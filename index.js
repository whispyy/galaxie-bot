require('dotenv').load();

const Discord = require('discord.js');

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
    const arg = msg.content.substr(msg.content.indexOf(' ') + 1);
    console.log('activate:', msg.content);

    switch (cmd) {
      case 'ping':
        msg.channel.send('pong');
        break;
      case 'galaxie':
      case 'play':
      case 'cocotier':
        play(msg, arg);
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

async function play(message, stream = 'https://listen.radioking.com/radio/15684/stream/29075') {
  if (message.member.voice.channel) {
    connection = await message.member.voice.channel.join();
    connection.play(stream);
  } else {
    message.channel.send('You must connect to a voice channel first');
  }
}


function stop() {
  if (connection) {
    connection.disconnect();
  }
}
