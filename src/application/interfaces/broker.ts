
export interface Broker {
  send: ({ topic,message }) => Promise<void>
}
