import {
  DeleteButton,
  ImageField,
  NumberField,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'
import '../../../styles/customStyles.css'

export const PaintingShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='УДАЛИТЬ' />
        </TopToolbar>
        <ImageField source='imgUrl' label='Картина' />
        <NumberField source='id' />
        <TextField source='artist.artistName' label='Автор картины' />
        <TextField source='artStyle' label='Стиль искусства' />
        <TextField source='title' label='Название картины' />
        <TextField source='artType' label='Вид искусства' />
        <TextField source='theme' label='Тематика' />
        <TextField source='style' label='Стиль' />
        <TextField source='materials' label='Материалы' />
        <TextField source='techniques' label='Техника' />
        <TextField source='dimensions' label='Размеры' />
        <TextField source='yearOfCreation' label='Год создания' />
        <TextField source='format' label='Формат' />
        <TextField source='color' label='Цвет' />
        <NumberField source='price' label='Цена' />
        <RichTextField
          source='description'
          label='Описание картины'
          className='custom-richtext-text'
        />
      </SimpleShowLayout>
    </Show>
  )
}
