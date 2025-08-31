import {
  Create,
  SimpleForm,
  required,
  RadioButtonGroupInput,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

const requiredValidation = required('Это обязательное поле')

export const WelcomeModalCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <RadioButtonGroupInput
        source='isActive'
        choices={[
          { id: 'true', name: 'Да' },
          { id: 'false', name: 'Нет' },
        ]}
        label='🔔 Активное объявление'
        defaultValue='false'
      />
      <RichTextInput
        source='content'
        label='Текст объявления'
        validate={requiredValidation}
      />
    </SimpleForm>
  </Create>
)
