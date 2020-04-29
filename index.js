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
const request = require("request");
const Discord = require('discord.js');
 const bot = new Discord.Client();

// Sets up the bot for the apps
const token = process.env.BOT_VAR;
const prefix = "B!"

bot.on('ready', () =>{
    console.log("This bot is online");
});

// Version can be updated when neccessary
const version = "1.0.2";

bot.on('message', msg=>{

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
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
            else if(args[1]=== "author")
            {
               msg.channel.send("This is my first attempt at a discord bot that i began creating out of frustration with the lack of bots who teach a word a day. \n" +
               "This current version does not feature the 'learn a word a day' function, but that is the end goal alongside some more indepth javascript \n" +
               "experience and learning. For those of you who are testing this bot i hope you enjoy, and stay tuned for updates!") 
            }
            else{
                msg.channel.send("Enter a second argument: author or version.");
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

        //Sends a GIF from jojo's bizarre adventure
        case "jojo":
            gifs = [
            "https://thumbs.gfycat.com/NiftySnarlingBluetickcoonhound-size_restricted.gif",
            "https://media2.giphy.com/media/Nn17cPRa7dZ28/giphy.gif",
            "https://i.kym-cdn.com/photos/images/original/001/204/072/6d2.gif",
            "https://media1.giphy.com/media/bC0caT4xYU8qQ/source.gif",
            "https://media1.tenor.com/images/71242474d0c209cfe775269ee2b9449b/tenor.gif?itemid=15487465",
            "https://media.giphy.com/media/IzfJSTepKi5vW/giphy.gif"
            ];
            msg.channel.send(gifs[getRandomInt(5)]);
            break;
        
        // Send a opm gif
        case "opm":
            gifs = [
            "https://media3.giphy.com/media/4j1nGRNRIa3e0/source.gif",
            "https://i.gifer.com/JRW1.gif",
            "https://i.gifer.com/C5bV.gif",
            "https://media.giphy.com/media/x4x95uLyeimMU/giphy.gif",
            "https://i.gifer.com/FODF.gif",
            "https://33.media.tumblr.com/07abdaa5439a9b4fb5532cd203238274/tumblr_nxiji1jyr21uzkymgo1_500.gif"
            ];
            msg.channel.send(gifs[getRandomInt(5)]);
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
            msg.channel.send('All commands start with B! \n help, hello, simp, ping, info, clear, jojo');
            break;

    }
})

bot.login(token);