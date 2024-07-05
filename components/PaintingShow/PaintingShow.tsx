import {
  DeleteButton,
  ImageField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'
import './index.css'

export const PaintingShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='УДАЛИТЬ' />
        </TopToolbar>
        <ImageField source='paintingUrl' label='Картина' />
        <NumberField source='id' />
        <TextField source='author' label='Автор картины' />
        <TextField source='title' label='Название картины' />
        <TextField source='artType' label='Вид искусства' />
        <TextField source='theme' label='Тематика' />
        <TextField source='style' label='Стиль' />
        <TextField source='base' label='Основа' />
        <TextField source='materials' label='Материалы' />
        <TextField source='dimensions' label='Размеры' />
        <TextField source='yearOfCreation' label='Год создания' />
        <TextField source='format' label='Формат' />
        <TextField source='color' label='Цвет' />
        <NumberField source='price' label='Цена' />
      </SimpleShowLayout>
    </Show>
  )
}
