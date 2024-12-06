import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  ImageField,
} from 'react-admin'

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source='title' label='Заголовок' />
      <TextField source='priority' label='Приоритет' />
      <DateField source='date' label='Дата' />
      <RichTextField source='content' label='Текст' />
      <ImageField source='imgUrl' label='Фото или Видео' />
    </SimpleShowLayout>
  </Show>
)
