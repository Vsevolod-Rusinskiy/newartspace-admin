import { Edit, SimpleForm, ImageField, ImageInput } from 'react-admin'
import '../../../styles/customStyles.css'
import { validateFileSize } from '../../../src/utils/common'
import { RichTextInput } from 'ra-input-rich-text'

export const AboutEdit = () => (
  <Edit>
    <SimpleForm>
      <ImageField source='imgUrl' label='Текущее фото' />
      <ImageInput
        source='pictures'
        label='Загрузить новое фото'
        validate={validateFileSize}
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <RichTextInput
        source='mainText'
        label='Основной текст'
        className='custom-richtext-input'
      />
      <RichTextInput
        source='additionalText1'
        label='Дополнительный текст 1'
        className='custom-richtext-input'
      />
      <RichTextInput
        source='additionalText2'
        label='Дополнительный текст 2'
        className='custom-richtext-input'
      />
    </SimpleForm>
  </Edit>
)
