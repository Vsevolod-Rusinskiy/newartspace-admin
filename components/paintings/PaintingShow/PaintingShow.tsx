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

  const isReproducibleValue = record?.isReproducible ? 'Да' : 'Нет'
  const isAdultValue = record?.isAdult ? 'Да' : 'Нет'

  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='УДАЛИТЬ' />
        </TopToolbar>
        <ImageField source='imgUrl' label='🖼️ Картина' />
        <NumberField source='id' />
        <TextField source='artist.artistName' label='👨‍🎨 Автор картины' />
        <TextField source='artStyle' label='🎭 Стиль искусства' />
        <div className='reproducible-container'>
          <span className='reproducible-label'>
            🔄 Возможность репродукции:
          </span>
          <span className='reproducible-value'>{isReproducibleValue}</span>
        </div>
        <div className='reproducible-container'>
          <span className='reproducible-label'>🔞 +18:</span>
          <span className='reproducible-value'>{isAdultValue}</span>
        </div>
        <NumberField source='price' label='💰 Цена' />
        <TextField source='priceType' label='💳 Тип цены' />
        <NumberField source='discount' label='🏷️ Скидка в процентах' />
        <TextField source='title' label='📝 Название картины' />
        <TextField source='artType' label='🎨 Вид искусства' />
        <TextField source='style' label='✨ Стиль' />
        <TextField source='theme' label='🎯 Основная тематика' />
        <TextField source='themes' label='📋 Дополнительные тематики' />
        <div>
          <AttributeField attributes={record?.attributes} type='themesList' />
        </div>
        <TextField source='material' label='🛠️ Основной материал' />
        <TextField source='materials' label='🧰 Дополнительные материалы' />
        <div>
          <AttributeField
            attributes={record?.attributes}
            type='materialsList'
          />
        </div>
        <TextField source='technique' label='🔧 Основная техника' />
        <TextField source='techniques' label='⚙️ Дополнительные техники' />
        <div>
          <AttributeField
            attributes={record?.attributes}
            type='techniquesList'
          />
        </div>
        <TextField source='color' label='🎨 Цвет' />
        <TextField source='colors' label='🌈 Дополнительные цвета' />
        <div>
          <AttributeField attributes={record?.attributes} type='colorsList' />
        </div>
        <NumberField source='width' label='↔️ Ширина' />
        <NumberField source='height' label='↕️ Высота' />
        <TextField source='yearOfCreation' label='📅 Год создания' />
        <TextField source='format' label='📐 Формат' />
        <RichTextField
          source='description'
          label='📝 Описание картины'
          className='custom-richtext-text'
        />
      </SimpleShowLayout>
    </Show>
  )
}
