import { CreateTransferModel } from '@/domain/models/create-transfer-model'
import { CreateTransfer } from '@/domain/usecases/create-transfer'
import { makeAddTransferValidation } from '@/main/factories/controllers/transfer-validation-factory'
import { CreateTransferController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { subDays ,format } from 'date-fns'

const createTransferMock = (error?: boolean): CreateTransfer => {
  class CreateTransferStub implements CreateTransfer {
    async create (object: CreateTransferModel): Promise<string> {
      return Promise.resolve('f571461e-edcb-4f11-8041-b78421c3f0b9')
    }
  }
  class CreateTransferStubWithError implements CreateTransfer {
    async create (object: CreateTransferModel): Promise<string> {
      throw Error('error')
    }
  }
  if (error) return new CreateTransferStubWithError()
  else return new CreateTransferStub()
}

const makeSut = (error?): CreateTransferController => {
  const validations = makeAddTransferValidation()
  console.log('VALIDATIONS',validations)
  const sut = new CreateTransferController(makeAddTransferValidation(),createTransferMock(error))
  return sut
}

describe('Create Transfer controller tests', () => {
  test('should return 200 if params are correct', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '2',
      destinationAccountId: '1',
      amount: 1000

    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ message: 'Transfer with ID f571461e-edcb-4f11-8041-b78421c3f0b9 successfuly created' }))
  })
  test('should return 400 if origin originAccountId is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: null,
      destinationAccountId: '1',
      amount: 1000

    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('originAccountId')))
  })
  test('should return 400 if origin destinationAccountId is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '321',
      destinationAccountId: null,
      amount: 1000

    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('destinationAccountId')))
  })
  test('should return 400 if origin amount is not provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '1',
      destinationAccountId: '123',
      amount: null

    } as any
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('amount')))
  })

  test('should return 400 if  amount is not number with 2 decimal places', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '1',
      destinationAccountId: '123',
      amount: 'a'

    } as any
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('amount', ' Param should be type number2decimal')))
  })
  test('should return 400 if originAccountId is not string', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: 1,
      destinationAccountId: '123',
      amount: 1121

    } as any
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('originAccountId', ' Param should be type string')))
  })
  test('should return 400 if destinationAccountId is not string', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '1',
      destinationAccountId: 1,
      amount: 1121

    } as any
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('destinationAccountId', ' Param should be type string')))
  })
  test('should return 400 if date is invalid', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '1',
      destinationAccountId: '2',
      amount: 1121,
      dueDate: 'dasdsa'

    } as any
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('Invalid date', ' Date should be in format dd/MM/yyyy HH:mm')))
  })
  test('should return 400 if date is outdated', async () => {
    const sut = makeSut()
    const httpRequest = {
      originAccountId: '1',
      destinationAccountId: '2',
      amount: 1121,
      dueDate: format(subDays(new Date(),5),'dd/MM/yyyy HH:MM')

    } as any
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('Due Date', 'is outdated')))
  })
  test('should return 500 if error is thrown on usecase', async () => {
    const sut = makeSut(true)
    const httpRequest = {
      originAccountId: '2',
      destinationAccountId: '1',
      amount: 1000

    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error('error')))
  })
})
