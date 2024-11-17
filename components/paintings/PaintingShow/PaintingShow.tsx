import React from 'react'
import {
  DeleteButton,
  ImageField,
  NumberField,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useShowController,
} from 'react-admin'
import '../../../styles/customStyles.css'

const AttributeField = ({ attributes, type }) => {
  if (!attributes) return null
  const filteredValues = attributes
    .filter((attr) => attr.type === type)
    .map((attr) => attr.value)
    .join(', ')
  return <span style={{ fontSize: '14px' }}>{filteredValues}</span>
}

export const PaintingShow = () => {
  const { record } = useShowController()

  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='УДАЛИТЬ' />
        </TopToolbar>
        <ImageField source='imgUrl' label='Картина' />
        <NumberField source='id' />
        <TextField source='artist.artistName' label='Автор картины' />
        <TextField source='artStyle' label='Стиль искусства' />
        <TextField source='title' label='Название картины' />
        <TextField source='artType' label='Вид искусства' />
        <TextField source='style' label='Стиль' />
        <TextField source='themes' label='Тематика' />
        <div>
          <AttributeField attributes={record?.attributes} type='themesList' />
        </div>
        <TextField source='materials' label='Материалы' />
        <div>
          <AttributeField
            attributes={record?.attributes}
            type='materialsList'
          />
        </div>
        <TextField source='techniques' label='Техника' />
        <div>
          <AttributeField
            attributes={record?.attributes}
            type='techniquesList'
          />
        </div>
        <NumberField source='width' label='Ширина' />
        <NumberField source='height' label='Высота' />
        <TextField source='yearOfCreation' label='Год создания' />
        <TextField source='format' label='Формат' />
        <TextField source='color' label='Цвет' />
        <NumberField source='price' label='Цена' />
        <RichTextField
          source='description'
          label='Описание картины'
          className='custom-richtext-text'
        />
      </SimpleShowLayout>
    </Show>
  )
}
