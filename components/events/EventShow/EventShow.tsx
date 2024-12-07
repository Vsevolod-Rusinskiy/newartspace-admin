import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
} from 'react-admin'
import EventMedia from '../EventMedia'
export const EventShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source='title' label='Заголовок' />
        <TextField source='priority' label='Приоритет' />
        <DateField source='date' label='Дата' />
        <RichTextField source='content' label='Текст' />
        <EventMedia />
      </SimpleShowLayout>
    </Show>
  )
}
