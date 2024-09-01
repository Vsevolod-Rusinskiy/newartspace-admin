import { Edit, SimpleForm, required, ImageField, ImageInput } from 'react-admin'
import { TextInputComponent } from '../../inputs'
import '../../../styles/customStyles.css'
import { validateFileSize } from '../../../src/utils/common'

const requiredValidation = required('Это обязательное поле')

export const ArtistEdit = () => (
  <Edit>
    <SimpleForm>
      <ImageInput
        source='artistUrl'
        label='Загрузить новое изображение'
        validate={validateFileSize}
      >
        <ImageField source='src' title='title' />
      </ImageInput>
      <TextInputComponent
        source='artistName'
        label='Имя художника'
        validate={requiredValidation}
      />
      <TextInputComponent
        source='artistDescription'
        label='Описание художника'
      />
      <ImageField source='artistUrl' label='Изображение художника' />

      <TextInputComponent source='priority' label='Приоритет' />
    </SimpleForm>
  </Edit>
)
