import {
  CloneButton,
  Datagrid,
  List,
  NumberField,
  TextField,
  SearchInput,
  BooleanField,
} from 'react-admin'
import { ImageField } from 'react-admin'

const PaintingFilters = [
  <SearchInput key='id' source='id' placeholder='🔍 Поиск по ID' alwaysOn />,
  <SearchInput
    key='title'
    source='title'
    placeholder='🔍 Поиск по названию'
    alwaysOn
  />,
  <SearchInput
    key='artist'
    source='artist.artistName'
    placeholder='👨‍🎨 Поиск по автору'
    alwaysOn
  />,
]

export const PaintingList = (props) => {
  return (
    <List {...props} filters={PaintingFilters}>
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
        <TextField
          source='artist.artistName'
          label='Автор картины'
          sortable={false}
        />
        <BooleanField
          source='isAdult'
          label='🔞 +18'
          valueLabelTrue='Да'
          valueLabelFalse='Нет'
        />
      </Datagrid>
    </List>
  )
}
