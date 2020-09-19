const discord = require('discord.js');
const client = new discord.Client({partials: ['MESSAGE', 'REACTION', 'CHANNEL']});
const {token, prefix} = require('./config.json');
const fs = require('fs');

client.msgs = require('./msgs.json')

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
	} else if (command === 'message') {
	    let _msgs = client.msgs[message.author.id].message;
	    let embed = new discord.MessageEmbed();
	    embed.setTitle(`${message.author.username}'s message`);
	    embed.setDescription(`${_msgs}`);
	    embed.setColor('FFFF00');
	    message.channel.send(embed);
	} else if (command === 'add') {
	    if (args[0] == 'message') {
	        editmessage = message.content.slice(13);
	        client.msgs [message.author.id] = {
	        message: editmessage
	    }
	    fs.writeFile("./msgs.json", JSON.stringify(client.msgs, null, 4), err => {
	        if (err) throw err;
	        let embed = new discord.MessageEmbed();
	        embed.setTitle(`${message.author.username} added a new formula`);
	        embed.setDescription(`**Added**: ${editmessage}`);
	        embed.setColor('FFFF00');
	        message.channel.send(embed);
	    });
	    }
	} else if (command == 'help') {
	    let embed = new discord.MessageEmbed();
	    embed.setColor('FFFF00');
	    embed.setTitle('Calculator Commands');
	    embed.setDescription('?help - shows this message\n\n?calc - the calculator command\n\n?add message - adds 1 message to your messages\n\n?message - shows the message you wrote');
	    message.channel.send(embed);
	}
});
client.login(process.env.token);
