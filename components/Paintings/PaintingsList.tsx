import {
  CloneButton,
  Datagrid,
  List,
  NumberField,
  TextField,
} from 'react-admin'
import { ImageField } from 'react-admin'
import './index.css'

export const PaintingList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='show'>
        <CloneButton />
        <ImageField source='paintingUrl' label='Картина:' />
        <NumberField source='id' sortable />
        <TextField source='title' label='Название картины' />
        <TextField source='artType' label='Вид искусства' />
      </Datagrid>
    </List>
  )
}
