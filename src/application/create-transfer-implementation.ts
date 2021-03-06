import { CreateTransferModel } from '@/domain/models/create-transfer-model'
import { TransferStatus } from '@/domain/models/transfer-status'
import { BrokerTopics } from '@/domain/topics/broker-topics'
import { CreateTransfer } from '@/domain/usecases/create-transfer'
import { Date } from '@/validation/interfaces/date'
import { Broker } from './interfaces/broker'
import { TransferRepository } from './interfaces/transfer-repository'

export class CreateTransferImplementation implements CreateTransfer {
  constructor (
    private readonly repository: TransferRepository,
    private readonly broker: Broker,
    private readonly date: Date
  ) {}

  async create (payload: CreateTransferModel): Promise<string> {
    const dueDate = payload.dueDate ? payload.dueDate : this.date.now()
    const id = await this.repository.add({ ...payload,status: TransferStatus.CREATED,dueDate })
    await this.broker.send({
      topic: BrokerTopics.LIQUIDATE_CREATED,
      message: {
        id,
        amount: payload.amount,
        dueDate
      }

    })
    return id
  }
}
