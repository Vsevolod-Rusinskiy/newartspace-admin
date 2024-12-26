import { DataProvider } from 'react-admin'
import { stringify } from 'query-string'
import axiosInstance from './api/axiosInstance/axiosInstance'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'
console.log('ApiUrl:', apiUrl)
// test flag = true

export default {
  create: async (resource, params) => {
    console.log(params, 'params')
    console.log(resource, 'resource')
    const imageFile = params.data.pictures.rawFile
    const file = new FormData()
    file.append('file', imageFile, imageFile.name)

    let image
    try {
      image = await axiosInstance({
        method: 'post',
        url: `${apiUrl}/${resource}/upload-image`,
        data: file,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.error(`Error uploading image: ${error.message}`)
      return { error: `Error uploading image: ${error.message}` }
    }

    const updatedData = {
      ...params.data,
      imgUrl: image.data.imgUrl,

      // преобразование даты в ISO формат только для events
      ...(resource === 'events'
        ? { date: new Date(params.data.date).toISOString() }
        : {}),

      // обновляем поля только если resource равен 'paintings'
      ...(resource === 'paintings'
        ? {
            price: Number(params.data.price),
            discount: Number(params.data.discount),
            width: Number(params.data.width),
            height: Number(params.data.height),
            yearOfCreation: Number(params.data.yearOfCreation),
            isReproducible: params.data.isReproducible === 'true',
          }
        : {}),
    }

    delete updatedData.artist

    try {
      console.log(updatedData, 'отправляем на сервер')
      console.log(resource, 'resource')

      const { data } = await axiosInstance.post(
        `${apiUrl}/${resource}`,
        updatedData
      )
      console.log(data, 'data получили от сервера create')
      return { data: data }
    } catch (error) {
      console.error(`Error creating resource: ${error.message}`)
      //  удаляем картинку если карточка не создалась
      try {
        await axiosInstance({
          method: 'delete',
          url: `${apiUrl}/${resource}/delete-image`,
          data: { fileName: image.data.imgUrl.split('/').pop() },
        })
      } catch (deleteError) {
        console.error(`Error deleting image: ${deleteError.message}`)
      }
      return { error: `Error creating resource: ${error.message}` }
    }
  },

  getList: async (resource, params) => {
    const { page, perPage: limit } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      limit: limit,
      page: page,
      filter: JSON.stringify(params.filter),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    try {
      const { data } = await axiosInstance.get(url)
      return {
        data: data.data,
        total: data.total,
      }
    } catch (error) {
      console.error(`Failed to fetch data: ${error.message}`)
      return { error: `Failed to fetch data: ${error.message}` }
    }
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`

    try {
      const { data } = await axiosInstance.get(url)
      return {
        data: data,
      }
    } catch (error) {
      console.error(`Failed to fetch resource: ${error.message}`)
      return { error: `Failed to fetch resource: ${error.message}` }
    }
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    try {
      const { data } = await axiosInstance.get(url)
      return { data: data }
    } catch (error) {
      console.error(`Failed to fetch multiple resources: ${error.message}`)
      return { error: `Failed to fetch multiple resources: ${error.message}` }
    }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    try {
      const { data, headers } = await axiosInstance.get(url)
      return {
        data: data,
        total: parseInt(headers['content-range'].split('/').pop(), 10),
      }
    } catch (error) {
      console.error(`Failed to fetch reference data: ${error.message}`)
      return { error: `Failed to fetch reference data: ${error.message}` }
    }
  },

  update: async (resource, params) => {
    let image
    try {
      if (params.data.pictures && params.data.pictures.rawFile) {
        const imageFile = params.data.pictures.rawFile
        const file = new FormData()
        file.append('file', imageFile, imageFile.name)
        image = await axiosInstance({
          method: 'post',
          url: `${apiUrl}/${resource}/upload-image`,
          data: file,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        params.data.imgUrl = image.data.imgUrl
      } else {
        // Если картинка не предоставлена, сохраняем предыдущий URL
        params.data.imgUrl = params.previousData.imgUrl
        params.data.pictures = null
      }

      const url = `${apiUrl}/${resource}/${params.id}`
      delete params.data.artist

      const updatedData = {
        ...params.data,

        // обновляем поля только если resource равен 'paintings'
        ...(resource === 'paintings'
          ? {
              price: Number(params.data.price),
              discount: Number(params.data.discount),
              width: Number(params.data.width),
              height: Number(params.data.height),
              yearOfCreation: Number(params.data.yearOfCreation),
              isReproducible: params.data.isReproducible === 'true',
            }
          : {}),
      }
      console.log(updatedData, 'sendupdatedData')
      const { data } = await axiosInstance.patch(url, updatedData)
      console.log(data, 'data получили от сервера update')

      return { data: data }
    } catch (error) {
      console.error('Error in update method:', error.message)

      // Если ошибка при обновлении ресурса и изображение было загружено, удаляем изображение
      if (image) {
        try {
          await axiosInstance({
            method: 'delete',
            url: `${apiUrl}/${resource}/delete-image`,
            data: { fileName: image.data.imgUrl.split('/').pop() },
          })
        } catch (deleteError) {
          console.error(`Error deleting image: ${deleteError.message}`)
        }
      }
      return { error: `Error in update method: ${error.message}` }
    }
  },

  updateMany: async (_, params) => {
    console.log(params)
    return { data: [] }
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`

    try {
      const { data } = await axiosInstance.delete(url)
      // console.log(data, 'data получили от сервера delete', 6666)
      return {
        data: data,
      }
    } catch (error) {
      console.error(`Failed to delete resource: ${error.message}`)
      return { error: `Failed to delete resource: ${error.message}` }
    }
  },

  deleteMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}/deleteMany/${JSON.stringify(params.ids)}`

    try {
      await axiosInstance.delete(url)
      return {
        data: [],
      }
    } catch (error) {
      console.error(`Failed to delete multiple resources: ${error.message}`)
      return { error: `Failed to delete multiple resources: ${error.message}` }
    }
  },
} as DataProvider
