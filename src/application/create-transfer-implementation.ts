import { CreateTransferModel } from '@/domain/models/create-transfer-model'
import { TransferStatus } from '@/domain/models/transfer-status'
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

  async create (createTransfer: CreateTransferModel): Promise<string> {
    const dueDate = createTransfer.dueDate ? createTransfer.dueDate : this.date.now()

    const id = await this.repository.add({ ...createTransfer,status: TransferStatus.CREATED,dueDate })

    await this.broker.send({
      topic: 'LIQUIDATE_CREATED',
      message: {
        externalId: id,
        amount: createTransfer.amount,
        dueDate
      }

    })
    return id
  }
}
