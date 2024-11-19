import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Edit,
  SimpleForm,
  ImageField,
  ImageInput,
  required,
  RadioButtonGroupInput,
  SelectArrayInput,
  useShowController,
} from 'react-admin'
import { SelectInputComponent, TextInputComponent } from '../../inputs'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'
import {
  validateFileSize,
  extractAttributes,
  getSelectedIds,
} from '../../../src/utils/common'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

const requiredValidation = required('Это обязательное поле')

export const PaintingEdit = () => {
  const { record } = useShowController()
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsResponse = await axios.get(`${apiUrl}/artists?limit=1000`)
        setAuthors(authorsResponse.data.data)

        const attributesResponse = await axios.get(`${apiUrl}/attributes`)
        setSelectLists(attributesResponse.data.data)
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Загрузка...</div>
  }

  const {
    artTypesList,
    colorsList,
    formatsList,
    materialsList,
    stylesList,
    themesList,
    techniquesList,
  } = selectLists

  // Извлекаем существующие атрибуты
  const existingAttributes = {
    materials: extractAttributes(record, 'materialsList') || [],
    themes: extractAttributes(record, 'themesList') || [],
    techniques: extractAttributes(record, 'techniquesList') || [],
  }

  const selectedThemes = getSelectedIds(themesList, existingAttributes.themes)
  const selectedMaterials = getSelectedIds(
    materialsList,
    existingAttributes.materials
  )
  const selectedTechniques = getSelectedIds(
    techniquesList,
    existingAttributes.techniques
  )

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
        <RadioButtonGroupInput
          source='artStyle'
          choices={[
            { id: 'Классика', name: 'Классика' },
            { id: 'Современность', name: 'Современность' },
          ]}
          label='Стиль искусства'
        />
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
          source='style'
          choices={stylesList}
          label='Стиль'
        />
        <SelectArrayInput
          source='themes'
          choices={themesList.map((theme) => ({
            id: theme.id,
            name: theme.value,
          }))}
          label='Тематика'
          defaultValue={selectedThemes}
        />
        <SelectArrayInput
          source='materials'
          choices={materialsList.map((material) => ({
            id: material.id,
            name: material.value,
          }))}
          label='Материалы'
          defaultValue={selectedMaterials}
        />
        <SelectArrayInput
          source='techniques'
          choices={techniquesList.map((technique) => ({
            id: technique.id,
            name: technique.value,
          }))}
          label='Техника'
          defaultValue={selectedTechniques}
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
