import { useRecordContext, ImageField } from 'react-admin'

const EventMedia = () => {
  const record = useRecordContext()
  if (!record?.imgUrl) return null

  return (
    <>
      {record.imgUrl.endsWith('.mp4') ? (
        <video
          controls
          style={{
            width: 100,
            height: 100,
          }}
        >
          <source src={record.imgUrl} type='video/mp4' />
          Ваш браузер не поддерживает видео.
        </video>
      ) : (
        <ImageField source='imgUrl' label='Изображение' />
      )}
    </>
  )
}

export default EventMedia
