require('dotenv').config();
const Discord = require('discord.js');
 const bot = new Discord.Client();

const token = process.env.BOT_VAR;
const prefix = "B!"

bot.on('ready', () =>{
    console.log("This bot is online");
})

bot.on('message', msg=>{

    let args = msg.content.slice(prefix.length).split(" ");
    
    switch(args[0])
    {
        case "dropout":
            msg.channel.send("People who aren't in the call are getting kicked off the course!!!");
            break;
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
        case "clear":
            if(!args[1]) return msg.reply("Error, please enter define a second arg");
            else
            {
                msg.channel.bulkDelete(args[1]);
                break;
            }
        case "help":
        msg.channel.send('All commands start with B! \n help, hello, simp, ping, info, clear');
        break;
            
    }
})

bot.login(token);