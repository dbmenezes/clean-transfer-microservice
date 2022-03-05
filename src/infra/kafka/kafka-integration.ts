import config from '@/main/config/config'
import { CompressionTypes, Consumer, Kafka , Producer } from 'kafkajs'

export interface IKafkaConsumer {
  groupId: string
  topic: string
}

export const KafkaIntegration = {
  producer: null as Producer,
  consumer: null,
  kafka: null,

  async connect (): Promise<void> {
    const clientId = config.kafka.clientId
    const brokers = config.kafka.brokers
    this.kafka = new Kafka({
      clientId,
      brokers ,
      retry: {
        initialRetryTime: Number(process.env.KAFKA_INITIAL_RETRY_TIME || '300'),
        retries: Number(process.env.KAFKA_RETRIES || '10')
      }
    })
    this.producer = this.kafka.producer()
    this.producer.connect()
  },

  async send ({ topic,message }): Promise<void> {
    const producerConfig = {
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: JSON.stringify(message) }]

    }
    this.producer.send(producerConfig)
  },

  async createConsumer (params: IKafkaConsumer): Promise<Consumer> {
    const { groupId, topic } = params
    const consumer = this.kafka.consumer({ groupId })

    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })

    return consumer
  }

}
