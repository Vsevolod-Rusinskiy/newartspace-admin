import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ImageField,
  required,
  SelectArrayInput,
} from 'react-admin'
import { RichTextInput } from 'ra-input-rich-text'
import '../../../styles/customStyles.css'
import { TextInputComponent } from '../../inputs'

const requiredValidation = required('Это обязательное поле')
const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'

export const EventCreate = () => {
  const [eventPhotos, setEventPhotos] = useState([])

  useEffect(() => {
    axios
      .get(`${apiUrl}/event-photos?limit=1000`)
      .then((response) => {
        setEventPhotos(response.data.data)
        console.log('eventPhotos:', response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении event-photos:', error)
      })
  }, [])

  return (
    <Create mutationMode='pessimistic'>
      <SimpleForm>
        <ImageInput
          source='pictures'
          label='Фото или Видео'
          accept='image/*,video/*'
        >
          <ImageField source='src' title='title' />
        </ImageInput>
        <SelectArrayInput
          source='eventPhotoIds'
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
        />
        <TextInput
          source='title'
          label='Заголовок'
          validate={requiredValidation}
        />
        <TextInputComponent source='priority' label='Приоритет' />
        <DateInput source='date' label='Дата' validate={requiredValidation} />
        <RichTextInput source='content' label='Текст' />
      </SimpleForm>
    </Create>
  )
}
