const Discord = require('discord.js');
const { TOKEN, PREFIX, VERSION } = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');
const message = require('./Events/message.js');
const { MessageEmbed } = require("discord.js");
const { disconnect, send } = require("process");
const { CallTracker } = require('assert');
const { dir } = require('console');
const moment = require("moment");




// start
client.login(TOKEN);
// console.log(start)
client.on("ready", () => {
  console.log(`____________________________________________`);
  console.log(`       ${client.user.tag}`);
  console.log(`--> Statut : connecté`);
  console.log(`--> Préfix actuel : ${PREFIX}`);
  console.log(`--> Version actuelle : ${VERSION}`);
  console.log(`____________________________________________`);
});

// Message d'arrivé 
client.on("guildMemberAdd", async (member) => {
  member.roles.add('role_ID');

  const channelId = "775416030855561278"
  const channel = client.channels.cache.get(channelId);
  if(!channel) return;
  const embed = new Discord.MessageEmbed()
    .setDescription(`<:IconJoin:791267725325369364> ${member.user.username} a rejoint le serveur !`)
    .setColor("#2F3136")
  })

// Message de départ
client.on('guildMemberRemove', async (member) => {
  const channelId = "775416030855561278"
  const channel = client.channels.cache.get(channelId);
  if(!channel) return;
  const embed = new Discord.MessageEmbed()
    .setDescription(`<:IconLeave:791267744897040405> ${member.user.username} à quitté le serveur !`)
    .setColor("#2F3136")
  channel.send(embed)
})



// loader
// commandes
client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} commande(s) en chargement(s)`);

  let commandes = f.filter(f => f.split(".").pop() === "js");
  if(commandes.length <= 0) {
    return console.log("Aucune commande trouvé dans le dossier");
  }

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} chargée !`);
    client.commands.set(commande.help.name, commande);
  });
});
// events
fs.readdir("./Events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} event(s) en chargement(s)`);

  f.forEach((f) => {
      const events = require(`./Events/${f}`);
      console.log(`${f} chargée !`);
      const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
  });
});
