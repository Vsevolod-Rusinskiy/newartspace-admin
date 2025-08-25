import { List, Datagrid, RichTextField } from 'react-admin'

export const WelcomeModalList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <RichTextField source='content' label='Текст объявления' />
      </Datagrid>
    </List>
  )
}
