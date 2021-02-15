const Discord = require('discord.js')



const mudaeId = '432610292342587392'
const rouletteId = '767864544717963294'
const penalityId = '803702152231911491'
const layorId = '295632286555045888'

const whiteList = [
  '$fc',
  '$m','$ma','$mg',
  '$h','$hg','$ha',
  '$w','$wa','$wg',
  '$m$m','$ma$ma','$mg$mg',
  '$h$h','$hg$hg','$ha$ha',
  '$w$w','$wa$wa','$wg$wg',
  '$marry','$marrya','$marryg',
  '$husbando','$husbandog','$husbandoa',
  '$waifu','$waifua','$waifug',
  '$rt','$rtu',
  '$rolls','$daily','$dk','$dailykakera','$dailyk','$ga','$ta','$ya','$ua','$ja','$na','$ba','$va','$hq','$hz','$hs','$g','$t','$y','$u','$j','$n','$b','$hy','$ht','$hh','$hr','$hf','$hv','$hb','$q','$s','$x','$wz','$ws','$wq','$qa','$sa','$xa','$wf','$wr','$wt','$wy','$wh','$wn','$wb','$wv','$qg','$sg','$xg','$o','$l','$:','$!','$ù','$^','$mz','$ms','$mq','$oa','$pa','$^a','$ùa','$!a','$:a','$;a','$la','$oa','$pa','$mf','$mr','$mt','$my','$mh','$mb','$mv'
]


const onMessage = (db)=> (async (msg)=>{
  if(msg.guild && !msg.author.bot && msg.channel.id===rouletteId && /^\$/.exec(msg.content) && !whiteList.some(command=>command===msg.content)){
    const channel = msg.guild.channels.resolve(penalityId)
    const user = msg.author
    channel.send('Amende ! <@'+user.id+'> pour un "**'+msg.content+'**" dans la roulette *petit trouducu* \nA régler à <@'+layorId+'> dans les plus brefs délais')

    const penality = db.get('penality') || {}
    penality[msg.author.id] =(penality[msg.author.id]||0)+ 500 
    db.set('penality',penality)
    
  }
  
  if(msg.guild && msg.author.id===mudaeId && msg.mentions.members.array().length===2 && msg.content.split(' ')[0] !== '<@'+layorId+'>' && msg.mentions.members.array().find(member=>member.id === layorId)){
    const thune = parseInt(msg.content.split('**')[1])
    const user = msg.mentions.members.array().find(member=>member.id !== layorId).user

    const penality = db.get('penality') || {}
    penality[user.id] = (penality[user.id] || 0) - thune
    db.set('penality',penality)
  }

  if(msg.content==='!showPenality'){
    const penality = db.get('penality') || {}
    const field = (await Promise.all(
        Object.keys(penality)
        .filter(userId=>penality[userId])
        .map(userId=>msg.guild.members.fetch(userId))))
      .map((user) => (user.displayName) + ' : ' + penality[user.id])
      .join('\n')
    const embed = new Discord.MessageEmbed()
      .setColor(0xFFAA00)
      .addField("Amendes :",field.length ? field : "Aucune amende")
    msg.channel.send(embed)
  }

})



module.exports.start = async ({Client,db})=>{
  Client.on('message',onMessage(db))
}



