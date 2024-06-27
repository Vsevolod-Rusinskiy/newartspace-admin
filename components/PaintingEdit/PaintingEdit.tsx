import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  ImageField,
  ImageInput,
  required,
} from 'react-admin'

const requiredValidation = required('Это обязательное поле')
const PaintingEdit = () => (
  <Edit>
    <SimpleForm>
      <ImageField source='paintingUrl' label='Картина' />

      <ImageInput source='pictures' label='Загрузить новую картину'>
        <ImageField source='src' title='title' />
      </ImageInput>

      <TextInput source='author' label='Автор картины' />
      <TextInput
        source='name'
        label='Название картины'
        validate={requiredValidation}
      />
      <TextInput source='artType' label='Вид искусства' />
      <TextInput source='theme' label='Тематика' />
      <TextInput source='style' label='Стиль' />
      <TextInput source='base' label='Основа' />
      <TextInput source='materials' label='Материалы' />
      <NumberInput source='height' label='Высота' />
      <NumberInput source='width' label='Ширина' />
      <NumberInput source='yearOfCreation' label='Год создания' />
      <TextInput source='format' label='Формат' />
      <TextInput source='color' label='Цвет' />
      <NumberInput source='price' label='Цена' validate={requiredValidation} />
    </SimpleForm>
  </Edit>
)

export default PaintingEdit
