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
import { validateFileSize } from '../../../src/utils/common'
import '../../../styles/customStyles.css'

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
  } = selectLists

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
          validate={requiredValidation}
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
        <SelectInputComponent
          source='techniques'
          choices={techniquesList}
          label='Техника'
        />
        <NumberInput source='width' label='Ширина' step={1} />
        <NumberInput source='height' label='Высота' step={1} />
        <NumberInput source='yearOfCreation' label='Год создания' step={1} />
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
          step={1}
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
