import { Validator } from '@/validation/interfaces/validator'
import Joi from 'joi'

export class JoiAdapter implements Validator {
  validate (key: any, type: any): Joi.ValidationResult<any> {
    switch (type) {
      case ('string'):
        console.log('CASE string')
        return Joi.string().validate(key)
      case ('number2decimal'):
        console.log('CASE number2decimal')
        return Joi.number().precision(2).validate(key)
    }
  }
}
