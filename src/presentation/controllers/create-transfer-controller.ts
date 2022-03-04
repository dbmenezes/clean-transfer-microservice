import { CreateTransferModel } from '@/domain/models/create-transfer-model'
import { CreateTransfer } from '@/domain/usecases/create-transfer'
import { badRequest, ok, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../interfaces'

export class CreateTransferController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createTransfer: CreateTransfer
  ) {

  }

  async handle (request: CreateTransferModel): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const result = await this.createTransfer.create(request)
      return ok(`Transfer with ID ${result} successfuly created`)
    } catch (err) {
      return serverError(err)
    }
  }
}
