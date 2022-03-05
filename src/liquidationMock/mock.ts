import { Kafka } from 'kafkajs'

export const MockLiquidationService = {
  async connect (): Promise<void> {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['kafka:9092']
    })

    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'LIQUIDATE_CREATED', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('MOCK',{
          value: message.value.toString()
        })
      }
    })
  }
}
