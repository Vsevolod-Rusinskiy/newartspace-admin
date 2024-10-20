import { useState, useEffect } from 'react'
import axios from 'axios'
import { Edit, SimpleForm, ImageField, ImageInput, required } from 'react-admin'
import { SelectInputComponent, TextInputComponent } from '../../inputs'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'
import { validateFileSize } from '../../../src/utils/common'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

const requiredValidation = required('Это обязательное поле')
export const PaintingEdit = () => {
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
        <TextInputComponent source='width' label='Ширина' />
        <TextInputComponent source='height' label='Высота' />
        <TextInputComponent source='yearOfCreation' label='Год создания' />
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
        <TextInputComponent
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
