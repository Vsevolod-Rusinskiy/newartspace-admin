import React from 'react'
import { SelectInput } from 'react-admin'
import { SelectInputPropTypes } from '../../types/propTypes'

const SelectInputComponent: React.FC<SelectInputPropTypes> = React.memo(
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
SelectInputComponent.displayName = 'SelectInputComponent'

export default SelectInputComponent
