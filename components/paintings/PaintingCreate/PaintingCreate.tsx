import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Create,
  NumberInput,
  SimpleForm,
  required,
  ImageInput,
  ImageField,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import { SelectInputComponent, TextInputComponent } from '../../inputs'
import { sortedSelectList } from '../../../constants'
import { validateFileSize } from '../../../src/utils/common'
import '../../../styles/customStyles.css'

const {
  artTypesList,
  colorsList,
  formatsList,
  materialsList,
  stylesList,
  themesList,
} = sortedSelectList
const requiredValidation = required('Это обязательное поле')

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

export const PaintingCreate = () => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    axios
      .get(`${apiUrl}/artists`)
      .then((response) => {
        setAuthors(response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении списка авторов:', error)
      })
  }, [])

  return (
    <Create mutationMode='pessimistic'>
      <SimpleForm>
        <ImageInput
          source='pictures'
          label='Изображение картины'
          validate={validateFileSize}
        >
          <ImageField source='src' title='title' />
        </ImageInput>
        <TextInputComponent source='priority' label='Приоритет' />
        <SelectInputComponent
          source='artistId'
          choices={authors.map((author) => ({
            id: author.id,
            value: author.artistName,
          }))}
          optionValue='id'
          label='Автор картины'
        />
        <TextInputComponent
          source='title'
          label='Название картины'
          validate={requiredValidation}
        />
        <SelectInputComponent
          source='artType'
          choices={artTypesList}
          label='Вид искусства'
        />
        <SelectInputComponent
          source='theme'
          choices={themesList}
          label='Тематика'
        />
        <SelectInputComponent
          source='style'
          choices={stylesList}
          label='Стиль'
        />
        <SelectInputComponent
          source='materials'
          choices={materialsList}
          label='Материалы'
        />
        <NumberInput source='height' label='Высота' />
        <NumberInput source='width' label='Ширина' />
        <NumberInput source='yearOfCreation' label='Год создания' />
        <SelectInputComponent
          source='format'
          choices={formatsList}
          label='Формат'
        />
        <SelectInputComponent
          source='color'
          choices={colorsList}
          label='Цвет'
        />
        <NumberInput
          source='price'
          label='Цена'
          validate={requiredValidation}
        />
        <RichTextInput
          source='description'
          label='Описание картины'
          className='custom-richtext-input'
        />
      </SimpleForm>
    </Create>
  )
}
