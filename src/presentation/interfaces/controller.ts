import { HttpResponse } from '@/presentation/interfaces'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
