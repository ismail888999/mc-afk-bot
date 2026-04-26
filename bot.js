const mineflayer = require('mineflayer')

function connectBot() {
  console.log('🔄 Trying to connect...')

  const bot = mineflayer.createBot({
    host: '2xrduel.aternos.me',
    port: 25565,
    username: '2XR_KILLER',
    version: false
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined')

    setTimeout(() => {
      bot.chat('/login 12345678')
    }, 5000)

    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 300)
    }, 30000)

    setInterval(() => {
      bot.chat('ISMAIL0605 the goat 🐐🔥')
    }, 120000)
  })

  bot.on('messagestr', (msg) => {
    if (msg.includes('/register')) {
      bot.chat('/register 12345678 12345678')
    }

    if (msg.includes('/login')) {
      bot.chat('/login 12345678')
    }
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason?.toString())
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })

  const reconnect = () => {
    console.log('🔁 Server offline or disconnected. Retry in 15s...')
    setTimeout(connectBot, 15000)
  }

  bot.on('end', reconnect)
}

connectBot()
