import { FieldProps, Validator } from 'react-admin'

interface ChoiceType {
  id: string
  name: string
}

export interface GenericSelectProps extends FieldProps {
  source: string
  choices: ChoiceType[]
  label?: string
  validate?: Validator | Validator[]
}
