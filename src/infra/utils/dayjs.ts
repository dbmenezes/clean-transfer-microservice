import dayjs from 'dayjs'
export class DateHelper {
  constructor () {
    dayjs.locale('pt-br')
  }

  now (): string {
    return dayjs(new Date()).format()
  }

  isBefore (date1,date2): boolean {
    return dayjs(date1).isBefore(dayjs(date2))
  }
}
