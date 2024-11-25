import {
  DeleteButton,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'
import '../../../styles/customStyles.css'

export const ArtistShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='Удалить' />
        </TopToolbar>
        <ImageField source='imgUrl' label='Изображение художника' />
        <TextField source='artistName' label='Имя художника' />
        <TextField source='priority' label='Приоритет' />
        <TextField source='artistDescription' label='Описание художника' />
      </SimpleShowLayout>
    </Show>
  )
}
