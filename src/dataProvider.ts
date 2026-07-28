import { DataProvider } from 'react-admin'
import { stringify } from 'query-string'
import axiosInstance from './api/axiosInstance/axiosInstance'

const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://back.newartspace.ru'
// test flag = true

interface DeleteOrderItemsParams {
  orderId: number
  itemIds: number[]
}

interface CustomDataProvider extends DataProvider {
  deleteOrderItems: (params: DeleteOrderItemsParams) => Promise<{ data: any }>
  sendOrderCustomerEmail: (orderId: number) => Promise<{ data: any }>
}

const cleanArtistData = (data: any) => {
  const { paintings: _paintings, ...cleanedData } = data
  return cleanedData
}

/** Empty optional numeric fields must not become NaN (JSON → null) or accidental 0. */
const toOptionalNumber = (value: unknown): number | null => {
  if (value === '' || value === null || value === undefined) return null
  const n = Number(value)
  if (!Number.isFinite(n) || n === 0) return null
  return n
}

export default {
  create: async (resource, params) => {
    // Если это welcome-modal, пропускаем логику с картинками
    if (resource === 'welcome') {
      try {
        const updatedWelcomeData = {
          ...params.data,
          isActive:
            params.data.isActive === true || params.data.isActive === 'true',
        }
        const { data } = await axiosInstance.post(
          `${apiUrl}/${resource}`,
          updatedWelcomeData
        )
        return { data: data }
      } catch (error) {
        return { error: `Error creating resource: ${error.message}` }
      }
    }

    // working-hours не работает с картинками — пропускаем логику загрузки
    if (resource === 'working-hours') {
      try {
        const { data } = await axiosInstance.post(
          `${apiUrl}/${resource}`,
          params.data
        )
        return { data: data }
      } catch (error) {
        return { error: `Error creating resource: ${error.message}` }
      }
    }

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
            width: toOptionalNumber(dataToSend.width),
            height: toOptionalNumber(dataToSend.height),
            yearOfCreation: toOptionalNumber(dataToSend.yearOfCreation),
            isReproducible: dataToSend.isReproducible === 'true',
            isAdult: dataToSend.isAdult === 'true',
          }
        : {}),
    }

    delete updatedData.artist

    try {
      const { data } = await axiosInstance.post(
        `${apiUrl}/${resource}`,
        updatedData
      )
      return { data: data }
    } catch (error) {
      //  удаляем картинку если карточка не создалась
      try {
        await axiosInstance({
          method: 'delete',
          url: `${apiUrl}/${resource}/delete-image`,
          data: { fileName: image.data.imgUrl.split('/').pop() },
        })
      } catch (deleteError) {
        void deleteError
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
      return { error: `Failed to fetch reference data: ${error.message}` }
    }
  },

  update: async (resource, params) => {
    // Если это welcome-modal, пропускаем логику с картинками
    if (resource === 'welcome') {
      try {
        const updatedWelcomeData = {
          ...params.data,
          isActive:
            params.data.isActive === true || params.data.isActive === 'true',
        }
        const url = `${apiUrl}/${resource}/${params.id}`
        const { data } = await axiosInstance.patch(url, updatedWelcomeData)
        return { data: data }
      } catch (error) {
        return { error: `Error in update method: ${error.message}` }
      }
    }

    // working-hours не работает с картинками — пропускаем логику загрузки
    if (resource === 'working-hours') {
      try {
        const url = `${apiUrl}/${resource}/${params.id}`
        const { data } = await axiosInstance.patch(url, params.data)
        return { data: data }
      } catch (error) {
        return { error: `Error in update method: ${error.message}` }
      }
    }

    let image
    try {
      // Очищаем данные если это artist
      let dataToSend =
        resource === 'artists' ? cleanArtistData(params.data) : params.data

      // Преобразование eventPhotos -> eventPhotoIds для событий
      if (resource === 'events' && Array.isArray(dataToSend.eventPhotos)) {
        dataToSend = {
          ...dataToSend,
          eventPhotoIds: dataToSend.eventPhotos,
        }
        delete dataToSend.eventPhotos
      }

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
              width: toOptionalNumber(dataToSend.width),
              height: toOptionalNumber(dataToSend.height),
              yearOfCreation: toOptionalNumber(dataToSend.yearOfCreation),
              isReproducible: dataToSend.isReproducible === 'true',
              isAdult: dataToSend.isAdult === 'true',
            }
          : {}),
      }
      const { data } = await axiosInstance.patch(url, updatedData)

      return { data: data }
    } catch (error) {
      // Если ошибка при обновлении ресурса и изображение было загружено, удаляем изображение
      if (image) {
        try {
          await axiosInstance({
            method: 'delete',
            url: `${apiUrl}/${resource}/delete-image`,
            data: { fileName: image.data.imgUrl.split('/').pop() },
          })
        } catch (deleteError) {
          void deleteError
        }
      }
      return { error: `Error in update method: ${error.message}` }
    }
  },

  updateMany: async () => {
    return { data: [] }
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`

    try {
      const { data } = await axiosInstance.delete(url)
      return {
        data: data,
      }
    } catch (error) {
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
      return { error: `Failed to delete multiple resources: ${error.message}` }
    }
  },

  deleteOrderItems: async (params: DeleteOrderItemsParams) => {
    const { data } = await axiosInstance.delete(
      `${apiUrl}/orders/${params.orderId}/items`,
      {
        data: { itemIds: params.itemIds },
      }
    )
    return { data }
  },

  sendOrderCustomerEmail: async (orderId: number) => {
    const { data } = await axiosInstance.post(
      `${apiUrl}/orders/${orderId}/send-customer-email`
    )
    return { data }
  },
} as CustomDataProvider
