import {
  DeleteButton,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'
import '../../../styles/customStyles.css'

export const AboutShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='Удалить' />
        </TopToolbar>
        <ImageField source='imgUrl' label='Фото' />
        <TextField source='mainText' label='Основной текст' />
        <TextField source='additionalText1' label='Дополнительный текст 1' />
        <TextField source='additionalText2' label='Дополнительный текст 2' />
      </SimpleShowLayout>
    </Show>
  )
}
