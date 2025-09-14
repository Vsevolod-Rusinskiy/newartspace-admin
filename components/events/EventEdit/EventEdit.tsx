import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ImageField,
  required,
  SelectArrayInput,
  useEditController,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'
import { TextInputComponent } from '../../inputs'

const requiredValidation = required('Это обязательное поле')
const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

export const EventEdit = () => {
  const [eventPhotos, setEventPhotos] = useState([])
  const { record } = useEditController()
  // console.log('EventEdit record:', record)

  useEffect(() => {
    axios
      .get(`${apiUrl}/event-photos?limit=1000`)
      .then((response) => {
        setEventPhotos(response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении event-photos:', error)
      })
  }, [])

  return (
    <Edit>
      <SimpleForm>
        <ImageField source='imgUrl' label='Текущее изображение' />
        <ImageInput
          source='pictures'
          label='Фото или Видео'
          accept='image/*,video/*'
        >
          <ImageField source='src' title='title' />
        </ImageInput>
        <SelectArrayInput
          source='eventPhotos'
          label='Дополнительные фото из event-photos'
          choices={eventPhotos}
          optionText={(choice) =>
            choice ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {choice.imgUrl && (
                  <img
                    src={choice.imgUrl}
                    alt='preview'
                    style={{
                      width: 20,
                      height: 20,
                      objectFit: 'cover',
                      marginRight: 8,
                    }}
                  />
                )}
                {choice.title}
              </span>
            ) : null
          }
          optionValue='id'
          style={{ minWidth: '300px' }}
          format={(value) =>
            Array.isArray(value)
              ? value.map((v) =>
                  typeof v === 'object' && v !== null ? v.id : v
                )
              : []
          }
        />
        <TextInput
          source='title'
          label='Заголовок'
          validate={requiredValidation}
        />
        <TextInputComponent source='priority' label='Приоритет' />
        <DateInput source='date' label='Дата' />
        <RichTextInput source='content' label='Текст' />
      </SimpleForm>
    </Edit>
  )
}
