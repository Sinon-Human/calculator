const discord = require('discord.js');
const client = new discord.Client({partials: ['MESSAGE', 'REACTION', 'CHANNEL']});
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.once('ready', async() => {
    console.log(`The bot is now logged in :P`);
});

client.on('ready', () => {
    client.user.setActivity('The Math Teacher | ?help', { type: 'WATCHING'})
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	
	if (command === 'calc') {
	    if (args[1] == '+') {
	        let question = args.join(' ')
	        let firstNumber = Number(args[0]);
	        let secondNumber = Number(args[2]);
	        let embed = new discord.MessageEmbed();
	        embed.setColor('FFFF00');
	        embed.setTitle('Calculating');
	        embed.setDescription(`**Question**:\n \`\`${question}\`\`\n**Answer**\n \`\`${firstNumber + secondNumber}\`\``);
	        message.channel.send(embed);
	    } else if (args[1] == '-') {
	        let question = args.join(' ')
	        let firstNumber = Number(args[0]);
	        let secondNumber = Number(args[2]);
	        let embed = new discord.MessageEmbed();
	        embed.setColor('FFFF00');
	        embed.setTitle('Calculating');
	        embed.setDescription(`**Question**:\n \`\`${question}\`\`\n**Answer**\n \`\`${firstNumber - secondNumber}\`\``);
	        message.channel.send(embed);
	    } else if (args[1] == '÷') {
	        let question = args.join(' ')
	        let firstNumber = Number(args[0]);
	        let secondNumber = Number(args[2]);
	        let embed = new discord.MessageEmbed();
	        embed.setColor('FFFF00');
	        embed.setTitle('Calculating');
	        embed.setDescription(`**Question**:\n \`\`${question}\`\`\n**Answer**\n \`\`${firstNumber / secondNumber}\`\``);
	        message.channel.send(embed);
	    } else if (args[1] == '×') {
	        let question = args.join(' ')
	        let firstNumber = Number(args[0]);
	        let secondNumber = Number(args[2]);
	        let embed = new discord.MessageEmbed();
	        embed.setColor('FFFF00');
	        embed.setTitle('Calculating');
	        embed.setDescription(`**Question**:\n \`\`${question}\`\`\n**Answer**\n \`\`${firstNumber * secondNumber}\`\``);
	        message.channel.send(embed);
	    } else {
	        let embed = new discord.MessageEmbed();
	        embed.setTitle('Calculator!');
	        embed.setDescription('The command can run if you type a math equation\nExample: 1 + 1');
	        embed.setColor('FFFF00');
	        let msg = await message.channel.send(embed).then(msg => {
	            msg.delete({ timeout: 12000})
	        })
	        .catch(console.error);
	    } 
	} else if (command == 'help') {
	    let embed = new discord.MessageEmbed();
	    embed.setColor('FFFF00');
	    embed.setTitle('Calculator Commands');
	    embed.setDescription('?help - shows this message\n\n?calc - the claculator command!');
	    message.channel.send(embed);
	}
});
client.login(process.env.token);
