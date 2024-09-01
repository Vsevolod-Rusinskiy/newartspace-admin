import {
  CloneButton,
  Datagrid,
  List,
  NumberField,
  TextField,
} from 'react-admin'
import { ImageField } from 'react-admin'

export const ArtistList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick='show'>
        <CloneButton />
        <NumberField source='priority' label='Приоритет' />
        <ImageField source='imgUrl' label='Изображение художника' />
        <TextField source='artistName' label='Имя художника' />
      </Datagrid>
    </List>
  )
}
