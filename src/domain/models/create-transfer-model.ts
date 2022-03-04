export type CreateTransferModel = {
  originAccountId: string
  destinationAccountId: string
  dueDate?: Date
  amount: string
}
