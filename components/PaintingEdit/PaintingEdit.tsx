import {
  Edit,
  SimpleForm,
  NumberInput,
  ImageField,
  ImageInput,
  required,
} from 'react-admin'
import { SelectInputComponent, TextInputComponent } from '../inputs'
import { sortedSelectList } from '../../constants'

const {
  artTypesList,
  authorsList,
  colorsList,
  formatsList,
  materialsList,
  stylesList,
  themesList,
} = sortedSelectList

const requiredValidation = required('Это обязательное поле')
const PaintingEdit = () => (
  <Edit>
    <SimpleForm>
      <ImageField source='paintingUrl' label='Картина' />

      <ImageInput source='pictures' label='Загрузить новую картину'>
        <ImageField source='src' title='title' />
      </ImageInput>

      <SelectInputComponent
        source='author'
        choices={authorsList}
        label='Автор картины'
      />

      <TextInputComponent
        source='title'
        label='Название картины'
        validate={requiredValidation}
      />
      <SelectInputComponent
        source='artType'
        choices={artTypesList}
        label='Вид искусства'
      />
      <SelectInputComponent
        source='theme'
        choices={themesList}
        label='Тематика'
      />
      <SelectInputComponent source='style' choices={stylesList} label='Стиль' />
      <SelectInputComponent
        source='materials'
        choices={materialsList}
        label='Материалы'
      />
      <NumberInput source='height' label='Высота' />
      <NumberInput source='width' label='Ширина' />
      <NumberInput source='yearOfCreation' label='Год создания' />
      <SelectInputComponent
        source='format'
        choices={formatsList}
        label='Формат'
      />
      <SelectInputComponent source='color' choices={colorsList} label='Цвет' />
      <NumberInput source='price' label='Цена' validate={requiredValidation} />
    </SimpleForm>
  </Edit>
)

export default PaintingEdit
