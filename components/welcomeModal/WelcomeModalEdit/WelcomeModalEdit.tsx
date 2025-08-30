import { Edit, SimpleForm, required, RadioButtonGroupInput } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

const requiredValidation = required('Это обязательное поле')

export const WelcomeModalEdit = () => (
  <Edit mutationMode='pessimistic'>
    <SimpleForm>
      <RadioButtonGroupInput
        source='isActive'
        choices={[
          { id: 'true', name: 'Да' },
          { id: 'false', name: 'Нет' },
        ]}
        label='🔔 Активное объявление'
      />
      <RichTextInput
        source='content'
        label='Текст объявления'
        validate={requiredValidation}
      />
    </SimpleForm>
  </Edit>
)
