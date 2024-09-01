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
        <ImageField source='artistUrl' label='Изображение художника' />
        <TextField source='artistName' label='Имя художника' />
        <TextField source='artistDescription' label='Описание художника' />
        <NumberField source='priority' label='Приоритет' />
      </Datagrid>
    </List>
  )
}
