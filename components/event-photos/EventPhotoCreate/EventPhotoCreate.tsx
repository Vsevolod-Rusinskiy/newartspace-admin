import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
} from 'react-admin'
import '../../../styles/customStyles.css'
import { TextInputComponent } from '../../inputs'

const requiredValidation = required('Это обязательное поле')

export const EventPhotoCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <ImageInput
        source='pictures'
        label='Фото или Видео'
        accept='image/*,video/*'
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <TextInput source='title' label='Заголовок' />
      <TextInputComponent source='priority' label='Приоритет' />
    </SimpleForm>
  </Create>
)
