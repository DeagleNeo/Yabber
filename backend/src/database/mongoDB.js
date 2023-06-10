const mongoose = require('mongoose')
require('dotenv').config()
let connectionStatus='not connected'

const connectToMongoDB = () => {
  const url = process.env.MONGODB_CONNECTION_URL
  if (!url) {
    console.error('mongoDB connection url not defined')
    process.exit(1)
  }

  const db = mongoose.connection
  db.on('connected', () => {
    connectionStatus="MongoDB connected"
    console.log(`mongoDB connected, ${url}`)
  })

  db.on('error', (error) => {
    console.error(error.message)
    process.exit(2)
  })

  db.on('disconnected', () => {
    console.log('mongoDB connection lost')
  })

  return mongoose.connect(url)
}

function dbStatus(){
  return connectionStatus
}

module.exports = {connectToMongoDB, dbStatus}