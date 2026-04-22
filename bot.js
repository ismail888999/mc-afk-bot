const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: '2xrduel.aternos.me',
    port: 25565,
    username: '2XR_KILLER',
    version: false
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined')

    // login/register
    setTimeout(() => {
      bot.chat('/register 12345678 12345678')
      bot.chat('/login 12345678')
    }, 5000)

    // anti-AFK
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 300)
    }, 30000)

    // message every 2 minutes
    setInterval(() => {
      bot.chat('ISMAIL0605 the goat 🐐🔥')
    }, 120000)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason?.toString())
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })

  bot.on('end', () => {
    console.log('🔁 Reconnecting in 10s...')
    setTimeout(() => startBot(), 10000)
  })
}

startBot()
