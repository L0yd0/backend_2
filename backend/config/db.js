const mongose = require('mongoose')

const connectDB = async() =>{
    try {
        const conn = await mongose.connect(process.env.MONGO_URI)
        console.log(`MongoDb conectado: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB