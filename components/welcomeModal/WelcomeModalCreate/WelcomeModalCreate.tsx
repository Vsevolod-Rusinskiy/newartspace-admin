import { Create, SimpleForm, required } from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

const requiredValidation = required('Это обязательное поле')

export const WelcomeModalCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <RichTextInput
        source='content'
        label='Текст объявления'
        validate={requiredValidation}
      />
    </SimpleForm>
  </Create>
)
