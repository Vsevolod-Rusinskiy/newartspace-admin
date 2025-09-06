import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  ShowButton,
  DeleteButton,
} from 'react-admin'

export const EventPhotoList = () => (
  <List>
    <Datagrid>
      <ImageField source='imgUrl' label='Изображение' />
      <TextField source='title' label='Заголовок' />
      <TextField source='priority' label='Приоритет' />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
)
