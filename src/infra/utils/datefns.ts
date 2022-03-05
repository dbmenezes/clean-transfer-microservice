import { format,parse,isBefore,isMatch } from 'date-fns'
export class DateHelper {
  now (): string {
    return format(new Date(), 'dd/MM/yyyy HH:MM')
  }

  isBefore (targetDate): boolean {
    const parsedDate = parse(targetDate, 'dd/MM/yyyy HH:mm', new Date())
    const result = isBefore(parsedDate, new Date())
    return result
  }

  isValidDate (targetDate): boolean {
    return isMatch(targetDate,'dd/MM/yyyy HH:mm')
  }
}
