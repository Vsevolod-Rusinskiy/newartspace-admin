import { FieldProps, Validator } from 'react-admin'

export interface TextInputPropTypes extends FieldProps {
  source: string
  label?: string
  validate?: Validator | Validator[]
}
