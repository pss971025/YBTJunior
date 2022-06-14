const Discord = require('discord.js');

const client = new Discord.Client({partials: ['MESSAGE", "CHANNEL", "REACTION']});

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'role'){
        client.commands.get('reactionrole').execute(message,args,Discord,client);
    }
});


client.once('ready', ()=>{
    console.log('IM ONLINE');
});


client.login(process.env.TOKEN);