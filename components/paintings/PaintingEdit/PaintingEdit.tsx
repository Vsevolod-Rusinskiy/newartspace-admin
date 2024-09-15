import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Edit,
  SimpleForm,
  NumberInput,
  ImageField,
  ImageInput,
  required,
} from 'react-admin'
import { SelectInputComponent, TextInputComponent } from '../../inputs'
import { sortedSelectList } from '../../../constants'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'
import { validateFileSize } from '../../../src/utils/common'

const {
  artTypesList,
  colorsList,
  formatsList,
  materialsList,
  stylesList,
  themesList,
} = sortedSelectList

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

const requiredValidation = required('Это обязательное поле')
export const PaintingEdit = () => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    axios
      .get(`${apiUrl}/artists?limit=1000`)
      .then((response) => {
        setAuthors(response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении списка авторов:', error)
      })
  }, [])
  return (
    <Edit>
      <SimpleForm>
        <ImageField source='imgUrl' label='Картина' />

        <ImageInput
          source='pictures'
          label='Загрузить новую картину'
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
        <NumberInput source='width' label='Ширина' />
        <NumberInput source='height' label='Высота' />
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
    </Edit>
  )
}
