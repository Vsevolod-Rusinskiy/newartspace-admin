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

  // Извлекаем существующие атрибуты
  const existingAttributes = {
    materials:
      record?.attributes
        ?.filter((attr) => attr.type === 'materialsList')
        .map((attr) => attr.value) || [],
    themes:
      record?.attributes
        ?.filter((attr) => attr.type === 'themesList')
        .map((attr) => attr.value) || [],
    techniques:
      record?.attributes
        ?.filter((attr) => attr.type === 'techniquesList')
        .map((attr) => attr.value) || [],
  }

  // Логируем значения по умолчанию
  console.log('Тематика:', existingAttributes.themes)
  console.log('Материалы:', existingAttributes.materials)
  console.log('Техника:', existingAttributes.techniques)
  // Преобразуйте значения в идентификаторы, если это необходимо
  const selectedThemes = themesList
    .filter((theme) => existingAttributes.themes.includes(theme.value)) // Измените на theme.value
    .map((theme) => theme.id)

  const selectedMaterials = materialsList
    .filter((material) => existingAttributes.materials.includes(material.value)) // Измените на material.value
    .map((material) => material.id)

  const selectedTechniques = techniquesList
    .filter((technique) =>
      existingAttributes.techniques.includes(technique.value)
    ) // Измените на technique.value
    .map((technique) => technique.id)

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
          // defaultValue={existingAttributes.themes}
          defaultValue={selectedThemes}
        />
        <SelectArrayInput
          source='materials'
          choices={materialsList.map((material) => ({
            id: material.id,
            name: material.value,
          }))}
          label='Материалы'
          // defaultValue={existingAttributes.materials}
          defaultValue={selectedMaterials}
        />
        <SelectArrayInput
          source='techniques'
          choices={techniquesList.map((technique) => ({
            id: technique.id,
            name: technique.value,
          }))}
          label='Техника'
          // defaultValue={existingAttributes.techniques}
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
