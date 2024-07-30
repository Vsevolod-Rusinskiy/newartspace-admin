import { FieldProps, Validator } from 'react-admin'

interface ChoiceType {
  id: string
  value: string | number
}

export interface SelectInputPropTypes extends FieldProps {
  source: string
  choices: ChoiceType[]
  label?: string
  validate?: Validator | Validator[]
}
