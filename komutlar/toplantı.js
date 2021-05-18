const discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.get(ayarlar.modrol) && !message.member.hasPermission('ADMINISTRATOR')) return  
let yetkili = message.guild.roles.cache.get(ayarlar.toplantıyetkili)
let mazeretli = ayarlar.mazaretli

if (args[0]==="başlat"){
if(!message.member.hasPermission('ADMINISTRATOR')) return  message.react(ayarlar.red)
message.delete()
message.channel.send("<@&" + ayarlar.toplantıyetkili + ">  Toplantı Birazdan Başlayacak, Eğer Katılmayacaksanız Katılmama Sebebi Girmeniz Gerekir `.toplantı sebep` Yazarak Sebebinizi Belirtebilirsiniz")
message.guild.members.cache.forEach(a => {
    if(a.roles.cache.has("811684534872834050")) {
     a.roles.add("813785571964616744")//burada herkese katılmadı ekliyoruz toplantının ortasında yapacağımız +toplantı yoklama ile toplantıdakilere zaten katıldı rolünü vereceğiz
    }
    });
}


if (args[0]==="sebep"){
let sebep3 = args.slice(1).join(" ");
let yazar = message.author
let katılmadı = ayarlar.katılmadı
if (!sebep3) return message.channel.send("Lütfen Sebep Belirtin");
let sebeps = db.fetch(`sebep1-${yazar.id}`)
if (sebeps > 4) return message.channel.send("5 Uyarın Oldu Dostum")
message.channel.send(`**${yazar}  ${sebep3}** Sebebiyle Toplantıya Katılmadın. ${sebeps} Uyarın Oldu! Eğer Başka Daha Katılmazsan Yetkin Gidebilir.`)
db.add(`sebep1-${yazar.id}`, 1);
message.guild.member(yazar).roles.add(mazeretli)
message.guild.member(yazar).roles.remove(katılmadı)
}

   if (args[0]==="yoklama") {
let toplantıses = ayarlar.toplantıodasi
let toplantıkatıldı = ayarlar.katıldı 
let toplantıkatılmadı = ayarlar.katılmadı 

message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === toplantıses).forEach(m => m.roles.add(toplantıkatıldı) && m.roles.remove(toplantıkatılmadı))
message.channel.send(`${message.guild.roles.cache.get(toplantıkatıldı).members.size} Kadar Kullanıcı Toplantıya Katıldı.\n${message.guild.roles.cache.get(toplantıkatılmadı).members.size} Kadar Kullanıcı Toplantıya Katılmadı\n${message.guild.roles.cache.get(mazeretli).members.size} Kadar Kişi Mazeret Bildirdi`) 
}

if (args[0]==="bitir") {
	
	let toplantıses = ayarlar.toplantıodasi
	let toplantıkatıldı = ayarlar.katıldı 
	let toplantıkatılmadı = ayarlar.katılmadı 
	
    message.guild.members.cache.filter(x => (x.voice.channel) && (x.voice.channel.id === toplantıses)).map(x => x.voice.setChannel(null))
message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === toplantıses).forEach(m => m.roles.romove(toplantıkatıldı) && m.roles.remove(toplantıkatılmadı))
message.channel.send(`${message.guild.roles.cache.get(toplantıkatıldı).members.size} Kadar Kullanıcı Toplantıya Katıldı.\n${message.guild.roles.cache.get(toplantıkatılmadı).members.size} Kadar Kullanıcı Toplantıya Katılmadı\n${message.guild.roles.cache.get(mazeretli).members.size} Kadar Kişi Mazeret Bildirdi`) 





}




};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplantı'],
  };
  
  exports.help = {
    name: 'toplantı',
    usage: 'toplantı',
  }; 