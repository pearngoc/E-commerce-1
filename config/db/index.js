const mongoose = require('mongoose')
require('dotenv').config()
async function connect() {
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION_STRING,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log('Connect to MongoDB')
      }
    )
  } catch (err) {
    console.log('Connect failure!!!')
  }
}

module.exports = { connect }
