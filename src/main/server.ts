import 'module-alias/register'
import { KafkaHelper } from '@/infra/kafka'
import mongoose from 'mongoose'
import config from './config/config'
import loggin from './helpers/loggin'

const main = (): void => {
  KafkaHelper.connect()
    .then(res => {
      loggin.info('Server', 'Kafka connected')
    }).catch(err => {
      process.on('exit', () => console.log('EXITED WITH ERROR ', err))
    })
  mongoose.connect(config.mongo.url,config.mongo.options)
    .then(async res => {
      loggin.info('Server','CONNECTED TO MONGODB')
      const { setupApp } = await import('./config/app')
      const app = await setupApp()
      app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
    })
    .catch(err => {
      process.on('exit', () => console.log('EXITED WITH ERROR ', err))
    })
}

main()
