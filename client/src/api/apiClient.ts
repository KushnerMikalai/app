import axios from 'axios'
// import qs from 'qs'

export const qsOptions = {
  parseBooleans: true,
  parseNumbers: true,
  skipNulls: true,
}

const client = axios.create({
  baseURL: '/api',
})

const getUrl = (endpoint: string = '/api', path: string) => {
  return path ? `${endpoint}/${path}` : endpoint
}

const getResponse = (responseClient: any) => {
  return responseClient && responseClient.data ? responseClient.data : false
}

export const setTokens = (token: string) => {
  client.interceptors.request.use((config) => {
    if (config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

export const get = async (
  endpoint: string = '/api',
  path: string,
  params: any,
  settings = {},
) => {
  const response = await client.get(
    getUrl(endpoint, path),
    {
      params,
      ...settings,
    },
  )

  return getResponse(response)
}

export const post = async (
  endpoint: string,
  path: string,
  data: any,
  file: any,
  settings = {},
) => {
  const formData = new FormData()
  if (file) {
    for (const key in data) {
      formData.append(key, data[key])
    }
  }
  const response = await client({
    method: 'POST',
    url: getUrl(endpoint, path),
    data: file ? formData : data,
    withCredentials: true,
    headers: {
      'content-type': file ? 'multipart/form-data' : 'application/json',
    },
    maxRedirects: 0,
    ...settings,
  })

  return response && response.data ? response.data : false
}

export default client
