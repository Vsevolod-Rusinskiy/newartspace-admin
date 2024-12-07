import { List, Datagrid, TextField, DateField } from 'react-admin'
import EventMedia from '../EventMedia'

export const EventsList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <TextField source='title' label='Заголовок' />
        <DateField source='date' label='Дата' />
        <EventMedia />
      </Datagrid>
    </List>
  )
}
