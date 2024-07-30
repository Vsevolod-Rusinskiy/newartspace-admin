import React from 'react'
import { SelectInput } from 'react-admin'
import { GenericSelectProps } from '../../types/propTypes/GenericSelectPropTypes'

// memo - pure component
const GenericSelect: React.FC<GenericSelectProps> = ({
  source,
  choices,
  label,
  validate,
}) => {
  console.log(choices, 222)
  const processedChoice = choices.map((choice) => ({
    id: choice.id,
    name: choice.value,
  }))
  return (
    <SelectInput
      source={source}
      choices={processedChoice}
      label={label}
      validate={validate}
    />
  )
}

export default GenericSelect
