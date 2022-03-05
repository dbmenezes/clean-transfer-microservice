export class InvalidParamError extends Error {
  constructor (paramName: string,fix?: string) {
    super(`Invalid param: ${paramName}` + fix)
    this.name = 'InvalidParamError'
  }
}
