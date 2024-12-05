import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ImageField,
  required,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

const requiredValidation = required('Это обязательное поле')

export const EventCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <TextInput
        source='title'
        label='Заголовок'
        validate={requiredValidation}
      />
      <DateInput source='date' label='Дата' />
      <RichTextInput source='content' label='Текст' />
      <ImageInput
        source='media'
        label='Фото или Видео'
        accept='image/*,video/*'
      >
        <ImageField source='src' title='title' />
      </ImageInput>
    </SimpleForm>
  </Create>
)
