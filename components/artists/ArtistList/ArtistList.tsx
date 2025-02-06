import {
  CloneButton,
  Datagrid,
  List,
  NumberField,
  TextField,
  SearchInput,
} from 'react-admin'
import { ImageField } from 'react-admin'

const ArtistFilters = [
  <SearchInput
    key='name'
    source='artistName'
    placeholder='👨‍🎨 Поиск по имени художника'
    alwaysOn
  />,
]

export const ArtistList = (props) => {
  return (
    <List {...props} filters={ArtistFilters}>
      <Datagrid rowClick='show'>
        <CloneButton />
        <NumberField source='priority' label='⭐ Приоритет' />
        <NumberField source='id' label='id' />
        <ImageField
          source='imgUrl'
          label='🖼️ Изображение художника'
          sortable={false}
        />
        <TextField source='artistName' label='👨‍🎨 Имя художника' />
      </Datagrid>
    </List>
  )
}
