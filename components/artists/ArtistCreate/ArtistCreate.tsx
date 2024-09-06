import {
  Create,
  SimpleForm,
  required,
  ImageInput,
  ImageField,
} from 'react-admin'
import { TextInputComponent } from '../../inputs'
import { validateFileSize } from '../../../src/utils/common'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

const requiredValidation = required('Это обязательное поле')

export const ArtistCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <ImageInput
        source='pictures'
        label='Изображение художника'
        validate={validateFileSize}
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <TextInputComponent source='priority' label='Приоритет' />
      <TextInputComponent
        source='artistName'
        label='Имя художника'
        validate={requiredValidation}
      />
      <RichTextInput
        source='artistDescription'
        label='Описание художника'
        className='custom-richtext-input'
      />
    </SimpleForm>
  </Create>
)
