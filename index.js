 /*
    Author: Robbie Campbell
    Date: 28/04/2020
    Description:
    This is my first attempt at a discord bot that i began creating out of frustration with the lack of bots who teach a word a day.
    This current version does not feature the "learn a word a day" function, but that is the end goal alongside some more indepth javascript
    experience and learning. For those of you who are testing this bot i hope you enjoy, and stay tuned for updates!
 */
 
 // Basic info for bot set up
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();
const Discord = require('discord.js');
 const bot = new Discord.Client();

// Sets up the bot for the apps
const token = process.env.BOT_VAR;
const prefix = "B!"

bot.on('ready', () =>{
    console.log("This bot is online");
});

// Version can be updated when neccessary
const version = "1.0.1";

bot.on('message', msg=>{

    // Refers to the user requesting the response.
    let selfUser = msg.member.user.username;

    // Determines how many arguments have been taken in
    let args = msg.content.slice(prefix.length).split(" ");

    // Works as a reference to establish ping later
    let present = new Date();
    let time = present.getMilliseconds();
    
    // Allows for a ping to be send and be fed back to the bot.
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
            // Tests the ping of the user asking for it
            function pinger(){
                let reply=0;
                Http.addEventListener('readystatechange', (event) =>{
                    if (Http.readyState == 4 && Http.status == 200){
                    let pong = new Date();
                    const response = pong.getMilliseconds();
                    const result = (response - time) - 80;
                    reply = msg.reply("It took " + result + "ms to Pong!");
                    }
                });
                return reply;
            }
            pinger();
            break;

        // Links to a silly youtube video
        case "simp":
            if(args[1])
            {
                let name = new String(args[1]);
                msg.channel.send(name.valueOf() + ", You are a " + 'https://www.youtube.com/watch?v=7435xZZOzsY');
            }
            else
            {
                msg.channel.send("Please enter the simps username.")
            }
            break;
        
        // Responds a hello to the person who said it
        case "hello":
            msg.channel.send('Hey ' + selfUser + ", What's up!");
            break;

        // Deletes a user specified number of messages
        case "clear":
            if(!args[1]) return msg.reply("Error, please enter define a second arg");
            else
            {
                msg.channel.bulkDelete(args[1]);
                break;
            }
        
        // Tells the user all of the commands
        case "help":
            msg.channel.send('All commands start with B! \n help, hello, simp, ping, info, clear');
            break;

    }
})

bot.login(token);