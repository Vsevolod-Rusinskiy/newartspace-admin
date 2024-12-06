import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ImageField,
  required,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'
import { TextInputComponent } from '../../inputs'

const requiredValidation = required('Это обязательное поле')

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <ImageInput
        source='media'
        label='Фото или Видео'
        accept='image/*,video/*'
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <TextInput
        source='title'
        label='Заголовок'
        validate={requiredValidation}
      />
      <TextInputComponent source='priority' label='Приоритет' />
      <DateInput source='date' label='Дата' />
      <RichTextInput source='content' label='Текст' />
    </SimpleForm>
  </Edit>
)
