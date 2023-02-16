import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = async (id) => {
  const returnedBlog = await axios.get(`${baseUrl}/${id}`)
  return returnedBlog.data
}

const createNew = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.put(`${baseUrl}/${id}`, blogObject, config)
}

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, getOne, createNew, setToken, updateBlog, deleteOne }