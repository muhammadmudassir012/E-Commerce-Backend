require('dotenv').config()
const moongose = require('mongoose')

const URI = process.env.MONGO_URI
const RetryLimit = process.env.DB_RETRY_LIMIT
const RetryTime = process.env.DB_RETRY_TIME
let connectionRetries = 0;

const connectDb = async () => {
    try {
        await moongose.connect(URI)
        console.log("DB connected successfully");
    } catch (error) {
        if(connectionRetries < RetryLimit){
            connectionRetries++
            console.log(`Reconneting to DB ${connectionRetries}/${RetryLimit}`);
            await new Promise(resolve => setTimeout(resolve, RetryTime))
            connectDb()
        }
        else{
            process.exit()
        }
    }
}

module.exports = connectDb