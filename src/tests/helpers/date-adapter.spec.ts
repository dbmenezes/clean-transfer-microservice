import { DateHelper } from '@/infra/utils/datefns'
import { addDays, subDays,format } from 'date-fns'

describe('Date adapter', () => {
  test('Should return now date' , () => {
    const sut = new DateHelper()
    const date = sut.now()

    expect(date).toBeTruthy()
  })
  test('Should return false when date is after today' , () => {
    const sut = new DateHelper()
    const date = format(addDays(new Date(),5),'dd/MM/yyyy HH:mm')
    const result = sut.isBefore(date)

    expect(result).toBeFalsy()
  })
  test('Should return true when date is before today' , () => {
    const sut = new DateHelper()
    const date = format(subDays(new Date(),5),'dd/MM/yyyy HH:mm')
    const result = sut.isBefore(date)

    expect(result).toBeTruthy()
  })
  test('Should return true when date is format dd/MM/yyyy HH:mm ' , () => {
    const sut = new DateHelper()
    const date = '20/03/2020 15:33'
    const result = sut.isValidDate(date)

    expect(result).toBeTruthy()
  })
  test('Should return false when date is not in format dd/MM/yyyy HH:mm ' , () => {
    const sut = new DateHelper()
    const date = '20/03/2020'
    const result = sut.isValidDate(date)

    expect(result).toBeFalsy()
  })
})
