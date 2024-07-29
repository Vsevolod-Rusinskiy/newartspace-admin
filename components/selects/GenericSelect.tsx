import React from 'react'
import { SelectInput } from 'react-admin'
import { GenericSelectProps } from '../../types/propTypes/GenericSelectPropTypes'

const GenericSelect: React.FC<GenericSelectProps> = ({
  source,
  choices,
  label,
  validate,
}) => (
  <SelectInput
    source={source}
    choices={choices.map((choice) => ({ id: choice, name: choice }))}
    label={label}
    validate={validate}
  />
)

export default GenericSelect
