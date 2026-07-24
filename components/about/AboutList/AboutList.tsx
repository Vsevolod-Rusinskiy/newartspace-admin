import { Datagrid, List, NumberField, ImageField, TextField } from 'react-admin'

export const AboutList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='show'>
        <NumberField source='id' label='id' />
        <ImageField source='imgUrl' label='🖼️ Фото' sortable={false} />
        <TextField source='mainText' label='📝 Основной текст' />
      </Datagrid>
    </List>
  )
}
