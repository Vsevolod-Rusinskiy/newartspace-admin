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
    priceTypesList: [],
  })
  const [loading, setLoading] = useState(true)

  // console.log(selectLists, 'selectLists')
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
    priceTypesList,
  } = selectLists

  // Извлекаем существующие атрибуты
  const existingAttributes = {
    materials: extractAttributes(record, 'materialsList') || [],
    themes: extractAttributes(record, 'themesList') || [],
    techniques: extractAttributes(record, 'techniquesList') || [],
    colors: extractAttributes(record, 'colorsList') || [],
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
  const selectedColors = getSelectedIds(colorsList, existingAttributes.colors)

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
        <RadioButtonGroupInput
          source='isReproducible'
          choices={[
            { id: 'true', name: 'Да' },
            { id: 'false', name: 'Нет' },
          ]}
          label='Возможность репродукции'
          defaultValue='false'
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
        <SelectInputComponent
          source='theme'
          choices={themesList}
          label='Основная тематика'
        />
        <SelectArrayInput
          source='themes'
          choices={themesList.map((theme) => ({
            id: theme.id,
            name: theme.value,
          }))}
          label='Дополнительные тематики'
          style={{ minWidth: '300px' }}
          defaultValue={selectedThemes}
        />
        <SelectInputComponent
          source='material'
          choices={materialsList}
          label='Основной материал'
        />
        <SelectArrayInput
          source='materials'
          choices={materialsList.map((material) => ({
            id: material.id,
            name: material.value,
          }))}
          label='Дополнительные материалы'
          style={{ minWidth: '300px' }}
          defaultValue={selectedMaterials}
        />
        <SelectInputComponent
          source='technique'
          choices={techniquesList}
          label='Основная техника'
        />
        <SelectArrayInput
          source='techniques'
          choices={techniquesList.map((technique) => ({
            id: technique.id,
            name: technique.value,
          }))}
          label='Дополнительные техники'
          defaultValue={selectedTechniques}
          style={{ minWidth: '300px' }}
        />
        <SelectInputComponent
          source='color'
          choices={colorsList}
          label='Цвет'
        />
        <SelectArrayInput
          source='colors'
          choices={colorsList.map((color) => ({
            id: color.id,
            name: color.value,
          }))}
          label='Дополнительные цвета'
          style={{ minWidth: '300px' }}
          defaultValue={selectedColors}
        />
        <TextInputComponent source='width' label='Ширина' />
        <TextInputComponent source='height' label='Высота' />
        <TextInputComponent source='yearOfCreation' label='Год создания' />
        <SelectInputComponent
          source='format'
          choices={formatsList}
          label='Формат'
        />

        <TextInputComponent
          source='price'
          label='Цена'
          validate={requiredValidation}
        />
        <SelectInputComponent
          source='priceType'
          choices={priceTypesList}
          label='Тип цены'
        />
        <TextInputComponent source='discount' label='Скидка в процентах' />
        <RichTextInput
          source='description'
          label='Описание картины'
          className='custom-richtext-input'
        />
      </SimpleForm>
    </Edit>
  )
}
