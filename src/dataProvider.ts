import { DataProvider } from 'react-admin'
import { stringify } from 'query-string'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'
console.log('ApiUrl:', apiUrl)
// test flag = true

export default {
  create: async (resource, params) => {
    const imageFile = params.data.pictures.rawFile
    const file = new FormData()
    file.append('file', imageFile, imageFile.name)

    let image
    try {
      image = await axios({
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
    }

    delete updatedData.artist

    try {
      const { data } = await axios.post(`${apiUrl}/${resource}`, updatedData)
      return { data: data }
    } catch (error) {
      console.error(`Error creating resource: ${error.message}`)
      //  удаляем картинку если карточка не создалась
      try {
        await axios({
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
      const { data } = await axios.get(url)

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
      const { data } = await axios.get(url)
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
      const { data } = await axios.get(url)
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
      const { data, headers } = await axios.get(url)
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
        image = await axios({
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

      const { data } = await axios.patch(url, params.data)
      return { data: data }
    } catch (error) {
      console.error('Error in update method:', error.message)

      // Если ошибка при обновлении ресурса и изображение было загружено, удаляем изображение
      if (image) {
        try {
          await axios({
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
      const { data } = await axios.delete(url)
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
      await axios.delete(url)
      return {
        data: [],
      }
    } catch (error) {
      console.error(`Failed to delete multiple resources: ${error.message}`)
      return { error: `Failed to delete multiple resources: ${error.message}` }
    }
  },
} as DataProvider
