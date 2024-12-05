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
      <DateField source='date' label='Дата' />
      <RichTextField source='content' label='Текст' />
      <ImageField source='media' label='Фото или Видео' />
    </SimpleShowLayout>
  </Show>
)
