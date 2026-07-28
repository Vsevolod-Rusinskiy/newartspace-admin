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

const FILE_EXT_RE = /\.(jpe?g|png|gif|webp|heic)$/i
const CAMERA_NAME_RE = /^IMG_\d/i

/** Title must be a human name, not a phone/camera filename. */
export const validatePaintingTitle = (value: unknown) => {
  if (value === undefined || value === null || String(value).trim() === '') {
    return 'Это обязательное поле'
  }

  const title = String(value).trim()

  if (FILE_EXT_RE.test(title) || CAMERA_NAME_RE.test(title)) {
    return 'Не используйте имя файла (IMG_…, .jpg). Укажите название работы'
  }

  const half = Math.floor(title.length / 2)
  if (
    title.length >= 10 &&
    half > 0 &&
    title.slice(0, half) === title.slice(half)
  ) {
    return 'Похоже, название вставлено дважды — проверьте поле'
  }

  return undefined
}

/** Year is optional; if set, must be a realistic 4-digit year (not 0). */
export const validateYearOfCreation = (value: unknown) => {
  if (value === '' || value === null || value === undefined) {
    return undefined
  }

  const year = Number(value)
  if (!Number.isInteger(year) || year < 1000 || year > 2100) {
    return 'Укажите год от 1000 до 2100 или оставьте поле пустым'
  }

  return undefined
}

/** Dimensions are optional; if set, must be > 0. */
export const validatePositiveDimension = (value: unknown) => {
  if (value === '' || value === null || value === undefined) {
    return undefined
  }

  const size = Number(value)
  if (!Number.isFinite(size) || size <= 0) {
    return 'Размер должен быть больше 0'
  }

  return undefined
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
