import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  DateField,
} from 'react-admin'

export const EventPhotoShow = () => (
  <Show>
    <SimpleShowLayout>
      <ImageField source='imgUrl' label='Изображение' />
      <TextField source='title' label='Заголовок' />
      <TextField source='priority' label='Приоритет' />
      <DateField source='createdAt' label='Создано' />
      <DateField source='updatedAt' label='Обновлено' />
    </SimpleShowLayout>
  </Show>
)
