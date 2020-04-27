require('dotenv').config();
const Discord = require('discord.js');
 const bot = new Discord.Client();

const token = process.env.BOT_VAR;
const prefix = "B!"

bot.on('ready', () =>{
    console.log("This bot is online");
})

bot.on('message', msg=>{

    let args = msg.content.substring(prefix.length).split(" ");

    switch(args[0])
    {
        case "info":
            if(args[1] === "version")
            {
                msg.channel.send("Version 1.0.1");
            }
            else{
                msg.channel.send("Invalid argument");
            }
            break;
        case "ping":
            msg.channel.send("Pong!");
            break;
        case "simp":
            {
            msg.channel.send('https://www.youtube.com/watch?v=7435xZZOzsY');
            break;
            }

        case "hello":
            msg.channel.send('Hey Guys!');
            break;
        case "help":
            msg.channel.send('All commands start with B! \n help, hello, simp, ping, info');
            break;
    }
})

bot.login(token);