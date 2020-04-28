var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();
const Discord = require('discord.js');
 const bot = new Discord.Client();

const token = process.env.BOT_VAR;
const prefix = "B!"

bot.on('ready', () =>{
    console.log("This bot is online");
});

const version = "1.0.1";

bot.on('message', msg=>{

    let args = msg.content.slice(prefix.length).split(" ");
    let present = new Date();
    let time = present.getMilliseconds();
    const Http = new XMLHttpRequest();
    const url='https://jsonplaceholder.typicode.com/posts';
    Http.open("GET", url);
    Http.send();
        
    switch(args[0])
    {
        // This is the current version number
        case "info":
            if(args[1] === "version")
            {
                msg.channel.send("Version " + version);
            }
            else{
                msg.channel.send("Invalid argument");
            }
            break;
        case "ping":
        function pinger(){
            let reply=0;
            Http.addEventListener('readystatechange', (event) =>{
                if (Http.readyState == 4 && Http.status == 200){
                let pong = new Date();
                const response = pong.getMilliseconds();
                const result = (response - time);
                reply = msg.channel.send("It took " + result + "ms to Pong!");
                }
            });
            return reply;
        }
        pinger();
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