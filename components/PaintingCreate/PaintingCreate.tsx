import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
} from 'react-admin'

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
  </Create>
)
