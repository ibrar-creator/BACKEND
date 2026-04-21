import dotenv from 'dotenv'
import app from './src/app.js'
import  connectDB  from './src/config/db.js'
connectDB()
dotenv.config()

const PORT = process.env.PORT || 5000

async function startServer() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Server startup error:', error)
  process.exit(1)
})
