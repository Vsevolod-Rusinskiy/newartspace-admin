export const validateFileSize = (fileData?: { rawFile?: File }) => {
  const imageMaxSize = 1 * 1024 * 1024
  const videoMaxSize = 5 * 1024 * 1024

  const rawFile = fileData?.rawFile

  if (!rawFile) {
    return null
  }

  const isImage = rawFile.type.startsWith('image/')
  const isVideo = rawFile.type.startsWith('video/')
  if (isImage && rawFile.size > imageMaxSize) {
    return 'Размер изображения должен быть не более 1MB'
  }

  if (isVideo && rawFile.size > videoMaxSize) {
    return 'Размер видео должен быть не более 5MB'
  }
}

// Вспомогательная функция для извлечения атрибутов
export const extractAttributes = (record, type: string) => {
  return (
    record?.attributes
      ?.filter((attr) => attr.type === type)
      .map((attr) => attr.value) || []
  )
}

// Вспомогательная функция для получения идентификаторов
export const getSelectedIds = (
  list: Array<{ id: number; value: string }>,
  existingValues: string[]
) => {
  return list
    .filter((item) => existingValues.includes(item.value))
    .map((item) => item.id)
}
