export const validateFileSize = (value) => {
  if (value && value.rawFile && value.rawFile.size > 1048576) {
    return 'Размер файла должен быть не более 1MB'
  }
  return undefined
}
