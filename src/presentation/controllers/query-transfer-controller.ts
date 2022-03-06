import { QueryTransfer } from '@/domain/usecases/query-transfer'
import { badRequest, notFound, ok, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../interfaces'

export class QueryTransferController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly queryTransfer: QueryTransfer
  ) {

  }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const { internalId } = request
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const result = await this.queryTransfer.query(internalId)
      if (!result) return notFound(new Error('Transfer not found'))
      return ok(result)
    } catch (err) {
      console.log('err',err)
      return serverError(err)
    }
  }
}
