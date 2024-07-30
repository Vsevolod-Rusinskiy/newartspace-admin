import React from 'react'
import { SelectInput } from 'react-admin'
import { GenericSelectProps } from '../../types/propTypes/GenericSelectPropTypes'

const GenericSelect: React.FC<GenericSelectProps> = React.memo(
  ({ source, choices, label, validate }) => {
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
        optionValue='name'
      />
    )
  }
)
GenericSelect.displayName = 'GenericSelect'

export default GenericSelect
