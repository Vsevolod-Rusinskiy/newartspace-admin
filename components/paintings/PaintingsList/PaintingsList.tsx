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
        <TextField source='artStyle' label='Стиль искусства' />
        <NumberField source='priority' label='Приоритет' />
        <ImageField source='imgUrl' label='Картина' sortable={false} />
        <NumberField
          source='price'
          label='Цена'
          sortable
          style={{ color: 'red' }}
        />
        <NumberField source='id' sortable />
        <TextField source='title' label='Название картины' />
        <TextField source='artist.artistName' label='Автор картины' />
      </Datagrid>
    </List>
  )
}
