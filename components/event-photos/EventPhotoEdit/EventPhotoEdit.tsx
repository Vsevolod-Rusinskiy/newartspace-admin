import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from 'react-admin'
import '../../../styles/customStyles.css'
import { TextInputComponent } from '../../inputs'

export const EventPhotoEdit = () => (
  <Edit mutationMode='pessimistic'>
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
  </Edit>
)
