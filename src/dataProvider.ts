import { DataProvider } from 'react-admin'
import { stringify } from 'query-string'
import axios from 'axios'

// const apiUrl = 'http://localhost:3000';

const apiUrl = import.meta.env.VITE_APP_API_URL
console.log('ApiUrldata:', apiUrl)

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`
    console.log(url, 'url')

    const { data } = await axios.get(url)

    return {
      data: data.data,
      total: data.length,
    }
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`

    const { data } = await axios.get(url)

    return {
      data: data,
    }
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    const { data } = await axios.get(url)
    return { data: data }
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
    const { data, headers } = await axios.get(url)
    return {
      data: data,
      total: parseInt(headers['content-range'].split('/').pop(), 10),
    }
  },

  create: async (resource, params) => {
    const imageFile = params.data.pictures.rawFile
    const file = new FormData()

    file.append('file', imageFile, imageFile.name)

    const image = await axios({
      method: 'post',
      url: `${apiUrl}/${resource}/upload`,
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const updatedData = {
      ...params.data,
      paintingUrl: `${apiUrl}/${image.data.path}`,
    }

    const { data } = await axios.post(`${apiUrl}/${resource}`, updatedData)
    return { data: data }
  },

  update: async (resource, params) => {
    if (params.data.pictures && params.data.pictures.rawFile) {
      const imageFile = params.data.pictures.rawFile
      const file = new FormData()
      file.append('file', imageFile, imageFile.name)

      const image = await axios({
        method: 'post',
        url: `${apiUrl}/${resource}/upload`,
        data: file,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Обновление данных с новым URL изображения !
      params.data.paintingUrl = `${apiUrl}/${image.data.path}`
      params.data.prevPaintingUrl = params.previousData.paintingUrl
    }

    const url = `${apiUrl}/${resource}/${params.id}`
    const { data } = await axios.patch(url, params.data)
    return { data: data[1][0] }
  },

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    const { data } = await axios.delete(url)
    return { data: data }
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`

    const { data } = await axios.delete(url)

    return {
      data: data,
    }
  },

  deleteMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}/deleteMany/${JSON.stringify(params.ids)}`
    await axios.delete(url)

    return {
      data: [],
    }
  },
} as DataProvider
