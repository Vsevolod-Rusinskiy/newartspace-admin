export const validateFileSize = ({ rawFile } = {}) => {
  if (rawFile?.size > 1048576) {
    return 'Размер файла должен быть не более 1MB'
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
