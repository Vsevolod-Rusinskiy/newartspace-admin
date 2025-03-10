import React from 'react'
import { TextInput } from 'react-admin'
import { TextInputPropTypes } from '../../types/propTypes/'

const TextInputComponent: React.FC<TextInputPropTypes> = React.memo(
  ({ source, label, validate }) => {
    return (
      <TextInput
        source={source}
        label={label}
        validate={validate}
        defaultValue={null}
      />
    )
  }
)
TextInputComponent.displayName = 'TextInputComponent'

export default TextInputComponent
