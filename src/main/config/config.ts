import dotenv from 'dotenv'

dotenv.config()

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
}

// const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser'
// const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'supersecretpassword1'
const MONGO_HOST = process.env.MONGO_URL || 'ds343895.mlab.com:43895/mongobongo'

const MONGO = {
  host: MONGO_HOST,
  options: MONGO_OPTIONS,
  url: process.env.MONGODB_URI
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 1337

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
}
const KAFKA = {
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
  clientId: process.env.KAFKA_CLIENTID || 'transfers'
}
const config = {
  mongo: MONGO,
  server: SERVER,
  kafka: KAFKA
}

export default config
