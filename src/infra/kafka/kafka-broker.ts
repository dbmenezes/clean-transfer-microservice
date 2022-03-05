import { Broker } from '@/application/interfaces/broker'
import { KafkaIntegration } from './kafka-integration'

export class KafkaBroker implements Broker {
  async send ({ topic, message }): Promise<void> {
    await KafkaIntegration.send({ topic, message })
  }
}
