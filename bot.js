var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var gif = require('giphy-api')(auth.gifftoken);
console.log('got past the requires');
//configure logger settings
/*
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize:true
});

logger.level = 'debug';
*/
var bot = new Discord.Client({
    token: auth.disctoken,
    autorun: true
});

bot.on('ready', function(evt){
/*
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + '-(' + bot.id + ')');
*/
    console.log('connected');
    console.log('logged in as: ' + bot.username);
});

bot.on('message', function(user, userId, channelID, message, event){
    //listen to user messages
    //get triggered on !
    if(message[0] == '!'){
	var args = message.substring(1);
	var cmd = message.substring(1, message.indexOf(' '));
	
	switch(cmd){
	case 'giff':
	    var search = message.substring(message.indexOf(' ') + 1);
	    
	    gif.random(search, function(err, res){
		if(err){
		    logger.log('error: ' + err);
		}
		else
		{
		    console.log(res.data);
		    bot.sendMessage({
			to:channelID,
			message: res.data.image_url
		    });
		    //return res.data.url;
		}
	    });
	   
	}
    }
});


       
