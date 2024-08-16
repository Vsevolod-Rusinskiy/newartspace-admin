export const validateFileSize = ({ rawFile } = {}) => {
  if (rawFile?.size > 1048576) {
    return 'Размер файла должен быть не более 1MB'
  }
}
