import { Transfer } from '@/domain/models/transfer'
import { TransferStatus } from '@/domain/models/transfer-status'
import { QueryTransfer } from '@/domain/usecases/query-transfer'
import { makeQueryTransferValidation } from '@/main/factories/controllers/query-transfer-validation-factory'
import { QueryTransferController } from '@/presentation/controllers/query-transfer-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers'

const mockTransfer = {
  originAccountId: '2131',
  destinationAccountId: '23131',
  amount: 1000,
  internalId: '2131',
  externalId: '32131',
  dueDate: '142131',
  status: TransferStatus.APPROVED
}
const queryTransferMock = (empty?: boolean,error?: boolean): QueryTransfer => {
  class CreateQueryTransferStub implements QueryTransfer {
    async query (id: string): Promise<Transfer> {
      return Promise.resolve(mockTransfer)
    }
  }
  class CreateQueryTransferStubEmpty implements QueryTransfer {
    async query (object: string): Promise<Transfer> {
      return null
    }
  }
  class CreateQueryTransferStubError implements QueryTransfer {
    async query (object: string): Promise<Transfer> {
      throw Error('error')
    }
  }
  if (error) return new CreateQueryTransferStubError()
  if (empty) return new CreateQueryTransferStubEmpty()
  else return new CreateQueryTransferStub()
}

const makeSut = (empty?,error?): QueryTransferController => {
  const sut = new QueryTransferController(makeQueryTransferValidation()
    ,queryTransferMock(empty,error))
  return sut
}

describe('Query transfer controller tests' , () => {
  test('should return 200 if query returns object', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      internalId: '1'
    })
    expect(httpResponse).toEqual(ok(mockTransfer))
  })
  test('should return 404 if query returns empty object', async () => {
    const sut = makeSut(true)
    const httpResponse = await sut.handle({
      internalId: '1'
    })
    expect(httpResponse).toEqual(notFound(new Error('Transfer not found')))
  })
  test('should return 500 if error is thrown on usecase', async () => {
    const sut = makeSut(null,true)
    const httpResponse = await sut.handle({
      internalId: '1'
    })
    expect(httpResponse).toEqual(serverError(new Error('error')))
  })

  test('should return 400 if origin originAccountId is not provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      internalId: null
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('internalId')))
  })
})
