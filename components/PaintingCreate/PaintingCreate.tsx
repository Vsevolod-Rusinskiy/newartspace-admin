import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
} from 'react-admin'
import GenericSelect from '../selects/GenericSelect'
import artTypesList from '../../data/artTypesList.json'
import themesList from '../../data/themesList.json'
import stylesList from '../../data/stylesList.json'
import materialsList from '../../data/materialsList.json'
import formatList from '../../data/formatList.json'
import colorList from '../../data/colorList.json'

const requiredValidation = required('Это обязательное поле')
export const PaintingCreate = () => (
  <Create mutationMode='pessimistic'>
    <SimpleForm>
      <ImageInput source='pictures' label='Related pictures'>
        <ImageField source='src' title='title' />
      </ImageInput>
      <TextInput source='author' label='Автор картины' />
      <TextInput
        source='title'
        label='Название картины'
        validate={requiredValidation}
      />
      <GenericSelect
        source='artType'
        choices={artTypesList}
        label='Вид искусства'
      />
      <GenericSelect source='theme' choices={themesList} label='Тематика' />
      <GenericSelect source='style' choices={stylesList} label='Стиль' />
      <TextInput source='base' label='Основа' />
      <GenericSelect
        source='materials'
        choices={materialsList}
        label='Материалы'
      />
      <NumberInput source='height' label='Высота' />
      <NumberInput source='width' label='Ширина' />
      <NumberInput source='yearOfCreation' label='Год создания' />
      <GenericSelect source='format' choices={formatList} label='Формат' />
      <GenericSelect source='color' choices={colorList} label='Цвет' />
      <NumberInput source='price' label='Цена' validate={requiredValidation} />
    </SimpleForm>
  </Create>
)
