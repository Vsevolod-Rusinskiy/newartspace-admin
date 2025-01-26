import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Create,
  SimpleForm,
  required,
  ImageInput,
  ImageField,
  RadioButtonGroupInput,
  SelectArrayInput,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import { SelectInputComponent, TextInputComponent } from '../../inputs'
import { validateFileSize } from '../../../src/utils/common'
import '../../../styles/customStyles.css'
import { IsReprodusibleSpan } from '../../../src/utils/isReprodusibleSpan'

const requiredValidation = required('Это обязательное поле')

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

export const PaintingCreate = () => {
  const [authors, setAuthors] = useState([])
  const [selectLists, setSelectLists] = useState({
    artTypesList: [],
    colorsList: [],
    formatsList: [],
    materialsList: [],
    stylesList: [],
    themesList: [],
    techniquesList: [],
    priceTypesList: [],
  })

  useEffect(() => {
    axios
      .get(`${apiUrl}/artists?limit=1000`)
      .then((response) => {
        setAuthors(response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении списка авторов:', error)
      })

    axios
      .get(`${apiUrl}/attributes`)
      .then((response) => {
        setSelectLists(response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении атрибутов:', error)
      })
  }, [])

  const {
    artTypesList,
    colorsList,
    formatsList,
    materialsList,
    stylesList,
    themesList,
    techniquesList,
    priceTypesList,
  } = selectLists

  return (
    <Create mutationMode='pessimistic'>
      <SimpleForm>
        <ImageInput
          source='pictures'
          label='🖼️ Изображение картины'
          validate={validateFileSize}
        >
          <ImageField source='src' title='title' />
        </ImageInput>
        <RadioButtonGroupInput
          source='artStyle'
          choices={[
            { id: 'Традиции', name: 'Традиции' },
            { id: 'Современность', name: 'Современность' },
          ]}
          label='🎭 Стиль искусства'
          defaultValue='Традиции'
        />
        <RadioButtonGroupInput
          source='isReproducible'
          choices={[
            { id: 'true', name: 'Да' },
            { id: 'false', name: 'Нет' },
          ]}
          label='🔄 Возможность репродукции'
          defaultValue='false'
        />
        <IsReprodusibleSpan />
        <SelectInputComponent
          source='priceType'
          choices={priceTypesList}
          label='💳 Тип цены'
        />
        <TextInputComponent
          source='price'
          label='💰 Цена'
          validate={requiredValidation}
        />
        <TextInputComponent source='discount' label='🏷️ Скидка в процентах' />
        <TextInputComponent source='priority' label='⭐ Приоритет' />
        <SelectInputComponent
          source='artistId'
          choices={authors.map((author) => ({
            id: author.id,
            value: author.artistName,
          }))}
          optionValue='id'
          label='👨‍🎨 Автор картины'
          validate={requiredValidation}
        />
        <TextInputComponent
          source='title'
          label='📝 Название картины'
          validate={requiredValidation}
        />
        <SelectInputComponent
          source='artType'
          choices={artTypesList}
          label='🎨 Вид искусства'
        />
        <SelectInputComponent
          source='style'
          choices={stylesList}
          label='✨ Стиль'
        />
        <SelectInputComponent
          source='theme'
          choices={themesList}
          label='🎯 Основная тематика'
        />
        <SelectArrayInput
          source='themes'
          choices={themesList.map((theme) => ({
            id: theme.id,
            name: theme.value,
          }))}
          label='📋 Дополнительные тематики'
          style={{ minWidth: '300px' }}
          defaultValue={[]}
        />
        <SelectInputComponent
          source='material'
          choices={materialsList}
          label='🛠️ Основной материал'
        />
        <SelectArrayInput
          source='materials'
          choices={materialsList.map((material) => ({
            id: material.id,
            name: material.value,
          }))}
          label='🧰 Дополнительные материалы'
          style={{ minWidth: '300px' }}
          defaultValue={[]}
        />
        <SelectInputComponent
          source='technique'
          choices={techniquesList}
          label='🔧 Основная техника'
        />
        <SelectArrayInput
          source='techniques'
          choices={techniquesList.map((technique) => ({
            id: technique.id,
            name: technique.value,
          }))}
          label='⚙️ Дополнительные техники'
          style={{ minWidth: '300px' }}
          defaultValue={[]}
        />
        <SelectInputComponent
          source='color'
          choices={colorsList}
          label='🎨 Цвет'
        />
        <SelectArrayInput
          source='colors'
          choices={colorsList.map((color) => ({
            id: color.id,
            name: color.value,
          }))}
          label='🌈 Дополнительные цвета'
          style={{ minWidth: '300px' }}
          defaultValue={[]}
        />
        <TextInputComponent source='width' label='↔️ Ширина' />
        <TextInputComponent source='height' label='↕️ Высота' />
        <TextInputComponent source='yearOfCreation' label='📅 Год создания' />
        <SelectInputComponent
          source='format'
          choices={formatsList}
          label='📐 Формат'
        />
        <RichTextInput
          source='description'
          label='📝 Описание картины'
          className='custom-richtext-input'
        />
      </SimpleForm>
    </Create>
  )
}
