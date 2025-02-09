import { DataProvider } from 'react-admin'
import { stringify } from 'query-string'
import axiosInstance from './api/axiosInstance/axiosInstance'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'
console.log('ApiUrl:', apiUrl)
// test flag = true

interface DeleteOrderItemsParams {
  orderId: number
  itemIds: number[]
}

interface CustomDataProvider extends DataProvider {
  deleteOrderItems: (params: DeleteOrderItemsParams) => Promise<{ data: any }>
}

const cleanArtistData = (data: any) => {
  const { paintings, ...cleanedData } = data
  return cleanedData
}

export default {
  create: async (resource, params) => {
    console.log(params, 'params')
    console.log(resource, 'resource')

    // Очищаем данные если это artist
    const dataToSend =
      resource === 'artists' ? cleanArtistData(params.data) : params.data

    const imageFile = dataToSend.pictures?.rawFile
    const file = new FormData()
    if (imageFile) {
      file.append('file', imageFile, imageFile.name)
    }

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
      ...dataToSend,
      imgUrl: image.data.imgUrl,

      // преобразование даты в ISO формат только для events
      ...(resource === 'events'
        ? { date: new Date(dataToSend.date).toISOString() }
        : {}),

      // обновляем поля только если resource равен 'paintings'
      ...(resource === 'paintings'
        ? {
            price: Number(dataToSend.price),
            discount: Number(dataToSend.discount),
            width: Number(dataToSend.width),
            height: Number(dataToSend.height),
            yearOfCreation: Number(dataToSend.yearOfCreation),
            isReproducible: dataToSend.isReproducible === 'true',
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
      // Очищаем данные если это artist
      const dataToSend =
        resource === 'artists' ? cleanArtistData(params.data) : params.data

      if (dataToSend.pictures && dataToSend.pictures.rawFile) {
        const imageFile = dataToSend.pictures.rawFile
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

        dataToSend.imgUrl = image.data.imgUrl
      } else {
        // Если картинка не предоставлена, сохраняем предыдущий URL
        dataToSend.imgUrl = params.previousData.imgUrl
        dataToSend.pictures = null
      }

      const url = `${apiUrl}/${resource}/${params.id}`
      delete dataToSend.artist

      const updatedData = {
        ...dataToSend,

        // обновляем поля только если resource равен 'paintings'
        ...(resource === 'paintings'
          ? {
              price: Number(dataToSend.price),
              discount: Number(dataToSend.discount),
              width: Number(dataToSend.width),
              height: Number(dataToSend.height),
              yearOfCreation: Number(dataToSend.yearOfCreation),
              isReproducible: dataToSend.isReproducible === 'true',
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

  deleteOrderItems: async (params: DeleteOrderItemsParams) => {
    console.log('=== Удаление позиций из заказа ===')
    console.log('URL:', `${apiUrl}/orders/${params.orderId}/items`)
    console.log('Данные запроса:', {
      orderId: params.orderId,
      itemIds: params.itemIds,
    })
    console.log('Тело запроса:', { itemIds: params.itemIds })

    try {
      const { data } = await axiosInstance.delete(
        `${apiUrl}/orders/${params.orderId}/items`,
        {
          data: { itemIds: params.itemIds },
        }
      )
      console.log('Ответ сервера:', data)
      return { data }
    } catch (error) {
      console.error('Ошибка при удалении позиций заказа:', error)
      console.error('Детали запроса:', {
        url: `${apiUrl}/orders/${params.orderId}/items`,
        orderId: params.orderId,
        itemIds: params.itemIds,
      })
      throw error
    }
  },
} as CustomDataProvider
