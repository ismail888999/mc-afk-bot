const mineflayer = require('mineflayer')

const PASSWORD = '12345678' // 🔑 CHANGE THIS

function startBot() {
  const bot = mineflayer.createBot({
    host: '2xrduel.aternos.me',
    port: 25565,
    username: '2XR_KILLER'
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined server')

    // Wait for server message then login/register
    setTimeout(() => {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
      bot.chat(`/login ${PASSWORD}`)
    }, 3000)

    // Anti-AFK movement
    setInterval(() => {
      const actions = ['forward', 'back', 'left', 'right']
      const action = actions[Math.floor(Math.random() * actions.length)]

      bot.setControlState(action, true)
      setTimeout(() => bot.setControlState(action, false), 2000)

      // jump
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)

    }, 20000)
  })

  // Smarter login detection
  bot.on('messagestr', (msg) => {
    if (msg.includes('/register')) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
    }
    if (msg.includes('/login')) {
      bot.chat(`/login ${PASSWORD}`)
    }
  })

  bot.on('end', () => {
    console.log('🔁 Reconnecting in 5s...')
    setTimeout(startBot, 5000)
  })

  bot.on('error', err => console.log('❌ Error:', err))
}

startBot()