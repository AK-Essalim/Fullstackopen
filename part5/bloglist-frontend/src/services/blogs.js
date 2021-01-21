import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const req = axios.put(`${baseUrl}/${id}`, newObject, config)
  return req
}
const like = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const req = axios.put(`${baseUrl}/${id}/like`, newObject, config)
  return req
}

export default { getAll, create, update, setToken, like }
