import React from 'react'
import { TextInput } from 'react-admin'
import { TextInputPropTypes } from '../../types/propTypes/'

const TextInputComponent: React.FC<TextInputPropTypes> = React.memo(
  ({ source, label, validate }) => {
    const trimSpaces = (value: string): string => value?.trim()
    return (
      <TextInput
        source={source}
        label={label}
        validate={validate}
        parse={trimSpaces}
      />
    )
  }
)
TextInputComponent.displayName = 'TextInputComponent'

export default TextInputComponent
