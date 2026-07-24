import { Create, SimpleForm, ImageInput, ImageField } from 'react-admin'
import { validateFileSize } from '../../../src/utils/common'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'

export const AboutCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <ImageInput
        source='pictures'
        label='Загрузить фото для страницы «О нас»'
        validate={validateFileSize}
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <RichTextInput
        source='mainText'
        label='Основной текст'
        className='custom-richtext-input'
        defaultValue=''
      />
      <RichTextInput
        source='additionalText1'
        label='Дополнительный текст 1'
        className='custom-richtext-input'
        defaultValue=''
      />
      <RichTextInput
        source='additionalText2'
        label='Дополнительный текст 2'
        className='custom-richtext-input'
        defaultValue=''
      />
    </SimpleForm>
  </Create>
)
