import config from '@/main/config/config'
import loggin from '@/main/helpers/loggin'
import { Kafka ,logLevel } from 'kafkajs'

export const KafkaHelper = {
  producer: null,
  consumer: null,
  kafka: null,

  async connect (): Promise<void> {
    const clientId = config.kafka.clientId
    const brokers = config.kafka.brokers
    this.kafka = new Kafka({ clientId,brokers ,logLevel: logLevel.DEBUG })
    this.producer = this.kafka.producer()
    this.producer.connect()
  },

  async send ({ topic,message }): Promise<void> {
    const stringMsg = JSON.stringify(message)
    console.log('string', stringMsg)
    try {
      await this.producer.send({
        topic,
        messages: [{ value: stringMsg }]
      })
    } catch (err) {
      loggin.error('Server','error with kafka ', err)
    }
  },

  async consume (topic, callback): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: process.env.clientId })
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
      eachMessage: async ({ message }) => {
        callback(message)
      }
    })
  }

}
