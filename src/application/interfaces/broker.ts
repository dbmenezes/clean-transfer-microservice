export interface Broker {
  send: ({ topic,message }) => Promise<void>
  consume: (topic,callback) => Promise<void>
}
