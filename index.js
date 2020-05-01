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

// Overwrite the flat function not available to discord current version
Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});

// Tells me the bot is running
bot.on('ready', () =>{
    console.log("This bot is online");
});

// Version can be updated when neccessary
const version = "1.0.2";

bot.on('message', msg=>{

    function setDelete(value)
    {
        sure = false;
        deleter = value;
    }
    function getDelete()
    {
        return parseInt(deleter);
    }
    // Creates an embed option, abitlity to change aspects will be added later
    const Embeds = new Discord.MessageEmbed()
	.setColor('#DD4444')
	.setTitle('WordADay bot')
	.setURL('https://www.youtube.com/channel/UCH_bkDYstaTtrHmDN-8Hb3w')
	.setAuthor('Robbie C', 'https://i.pinimg.com/736x/3c/88/c8/3c88c8510028f627cf58792795629ed1.jpg', 'https://www.youtube.com/channel/UCH_bkDYstaTtrHmDN-8Hb3w')
	.setDescription("A basic bot that'll read you a word a day!")
    .setThumbnail('https://i.pinimg.com/736x/3c/88/c8/3c88c8510028f627cf58792795629ed1.jpg')
	.setImage('https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Bilbo_Baggins.jpg/200px-Bilbo_Baggins.jpg')
	.setTimestamp()
    .setFooter('Have fun with it!', 'https://i.pinimg.com/736x/3c/88/c8/3c88c8510028f627cf58792795629ed1.jpg');
    
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
                let description = "This is my first attempt at a discord bot that i began creating out of frustration with the lack of bots who teach a word a day. \n" +
                "This current version does not feature the 'learn a word a day' function, but i hope you can have fun with it anyways!"
               msg.channel.send(Embeds.addField(name= "About this bot", value=description)) 
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
            msg.channel.send(gifs[getRandomInt(6)]);
            break;
        
        // Send a opm gif
        case "opm":
            gifs = [
            "https://media3.giphy.com/media/4j1nGRNRIa3e0/source.gif",
            "https://i.gifer.com/JRW1.gif",
            "https://i.gifer.com/C5bV.gif",
            "https://pa1.narvii.com/6540/1671ee0151848ebce1408c7219305c070e5ee8ac_00.gif",
            "https://i.gifer.com/FODF.gif",
            "https://33.media.tumblr.com/07abdaa5439a9b4fb5532cd203238274/tumblr_nxiji1jyr21uzkymgo1_500.gif"
            ];
            msg.channel.send(gifs[getRandomInt(6)]);
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
                if (args[1] < 20)
                {
                    setDelete(parseInt(args[1]));
                    msg.channel.send("Type B!yes to delete.");
                    break;
                }
                else if(args[1] > 100)
                {
                    msg.reply("Come on guys, really? more than 100?");
                    break;
                }
                else{
                    msg.reply("You're trying to delete too many")
                    break;
                }
            }
        
        // Tells the user all of the commands
        case "help":
            msg.channel.send(Embeds.addFields(
                {name:"Command List", value:'All commands start with B!'},
                {name:"Memes", value:"simp, jojo, opm"},
                {name:"Functionality", value:"info, help, hello, clear, ping, code"}
            ));
            break;
        
        case "code":
            const language = ["Java", "Python", "JS", "C++", "PHP", "HTML/ CSS"]
            msg.channel.send("Today you should write code in: " + language[getRandomInt(6)]);
        case "yes":
            if(sure == false)
            {
                msg.channel.bulkDelete(getDelete() + 3);
                sure == true;
                deleter = 0;
            }
                break;
    }
})

bot.login(token);