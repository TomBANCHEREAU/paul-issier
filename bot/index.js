if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const Client = new (require('discord.js').Client)()
const eventToPromise = require('event-to-promise')

async function start() {
  if (!process.env.TOKEN) {
    throw 'The discord bot token need to be provided in order to start the application'
  }
  const db = await require('./db').start()
  await require('./spy').start({Client,db})
  // await modules.start({ Client })

  Client.login(process.env.TOKEN)
  await eventToPromise(Client, 'ready')
  console.log(`Logged in as ${Client.user.tag}!`)
}

async function stop() {
  Client.destroy();
}



start().then(() => { }).catch(error => {
  console.error('Failure', error)
})
process.on('SIGTERM', async () => {
  await stop()
  process.exit()
})