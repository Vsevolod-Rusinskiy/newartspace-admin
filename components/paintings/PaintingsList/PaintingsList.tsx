import {
  CloneButton,
  Datagrid,
  List,
  NumberField,
  TextField,
} from 'react-admin'
import { ImageField } from 'react-admin'

export const PaintingList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='show'>
        <CloneButton />
        <NumberField source='priority' label='Приоритет' />
        <ImageField source='imgUrl' label='Картина' />
        <NumberField source='id' sortable />
        <TextField source='title' label='Название картины' />
        <TextField source='artist.artistName' label='Автор картины' />
      </Datagrid>
    </List>
  )
}
