import { HttpResponse } from '@/presentation/interfaces'

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
