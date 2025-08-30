import { List, Datagrid, RichTextField, BooleanField } from 'react-admin'

export const WelcomeModalList = () => {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <BooleanField
          source='isActive'
          label='🔔 Активное'
          valueLabelTrue='Да'
          valueLabelFalse='Нет'
        />
        <RichTextField source='content' label='Текст объявления' />
      </Datagrid>
    </List>
  )
}
