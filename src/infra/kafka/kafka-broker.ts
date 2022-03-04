import { Broker } from '@/application/interfaces/broker'
import { KafkaHelper } from './kafka-helper'

export class KafkaBroker implements Broker {
  async send ({ topic, message }): Promise<any> {
    await KafkaHelper.send({ topic, message })
  }

  async consume (topic: any, callback: any): Promise<void> {
    await KafkaHelper.consume(topic,callback)
  }
}
