import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  useShowController,
} from 'react-admin'
import EventMedia from '../EventMedia'

export const EventShow = () => {
  const { record } = useShowController()

  return (
    <Show>
      <SimpleShowLayout>
        <TextField source='title' label='Заголовок' />
        <TextField source='priority' label='Приоритет' />
        <DateField source='date' label='Дата' />
        <RichTextField source='content' label='Текст' />
        <EventMedia />
        {record?.eventPhotos?.length > 0 && (
          <div style={{ margin: '16px 0' }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              Дополнительные фото:
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {record.eventPhotos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={photo.imgUrl}
                    alt={photo.title}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 4,
                      marginBottom: 4,
                    }}
                  />
                  <span style={{ fontSize: 12 }}>{photo.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </SimpleShowLayout>
    </Show>
  )
}
