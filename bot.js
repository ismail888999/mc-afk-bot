const mineflayer = require('mineflayer')

const HOST = '2xrduel.aternos.me'
const PORT = 25565
const USERNAME = '2XR_KILLER'
const PASSWORD = '12345678'

let reconnectDelay = 5000

function startBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  })

  bot.on('login', () => {
    console.log('🔵 Logging in...')
  })

  bot.on('spawn', () => {
    console.log('✅ Bot spawned')

    reconnectDelay = 5000 // reset delay after success

    // Safe login/register timing
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
      bot.chat(`/login ${PASSWORD}`)
    }, 5000)

    // Safe anti-AFK (low frequency)
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 300)
    }, 30000)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason?.toString())
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })

  bot.on('end', () => {
    console.log(`🔁 Disconnected → retry in ${reconnectDelay / 1000}s`)

    setTimeout(() => {
      reconnectDelay = Math.min(reconnectDelay * 1.5, 60000)
      startBot()
    }, reconnectDelay)
  })
}

startBot()