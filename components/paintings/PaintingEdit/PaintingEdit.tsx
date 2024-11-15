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
import { validateFileSize } from '../../../src/utils/common'

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

  // Вспомогательная функция для извлечения атрибутов
  const extractAttributes = (type: string) => {
    return (
      record?.attributes
        ?.filter((attr) => attr.type === type)
        .map((attr) => attr.value) || []
    )
  }

  // Извлекаем существующие атрибуты
  const existingAttributes = {
    materials: extractAttributes('materialsList'),
    themes: extractAttributes('themesList'),
    techniques: extractAttributes('techniquesList'),
  }

  // Логируем значения по умолчанию
  console.log('Тематика:', existingAttributes.themes)
  console.log('Материалы:', existingAttributes.materials)
  console.log('Техника:', existingAttributes.techniques)

  // Вспомогательная функция для получения идентификаторов
  const getSelectedIds = (
    list: Array<{ id: number; value: string }>,
    existingValues: string[]
  ) => {
    return list
      .filter((item) => existingValues.includes(item.value))
      .map((item) => item.id)
  }

  // Получаем идентификаторы
  const selectedThemes = getSelectedIds(themesList, existingAttributes.themes)
  const selectedMaterials = getSelectedIds(
    materialsList,
    existingAttributes.materials
  )
  const selectedTechniques = getSelectedIds(
    techniquesList,
    existingAttributes.techniques
  )

  console.log('selectedThemes', selectedThemes)
  console.log('selectedMaterials', selectedMaterials)
  console.log('selectedTechniques', selectedTechniques)

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
