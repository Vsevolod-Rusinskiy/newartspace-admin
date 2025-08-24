import { Edit, SimpleForm, required } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

const requiredValidation = required('Это обязательное поле')

export const WelcomeModalEdit = () => (
  <Edit mutationMode='pessimistic'>
    <SimpleForm>
      <RichTextInput
        source='content'
        label='Текст объявления'
        validate={requiredValidation}
      />
    </SimpleForm>
  </Edit>
)
