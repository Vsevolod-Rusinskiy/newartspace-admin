import { Edit, SimpleForm, required, ImageField, ImageInput } from 'react-admin'
import { TextInputComponent } from '../../inputs'
import '../../../styles/customStyles.css'
import { validateFileSize } from '../../../src/utils/common'
import { RichTextInput } from 'ra-input-rich-text'

const requiredValidation = required('Это обязательное поле')

export const ArtistEdit = () => (
  <Edit>
    <SimpleForm>
      <ImageField source='imgUrl' label='Изображение художника' />
      <ImageInput
        source='pictures'
        label='Загрузить новое изображение'
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
  </Edit>
)
