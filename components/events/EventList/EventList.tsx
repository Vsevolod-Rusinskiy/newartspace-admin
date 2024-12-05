import { List, Datagrid, TextField, DateField, ImageField } from 'react-admin'

export const EventsList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='edit'>
        <TextField source='title' label='Заголовок' />
        <DateField source='date' label='Дата' />
        <ImageField source='media' label='Фото или Видео' />
      </Datagrid>
    </List>
  )
}
