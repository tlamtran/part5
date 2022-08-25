import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token}
    }

    const request = await axios.post(baseUrl, newBlog, config)
    return request.data
}
const blogService = { getAll, create, setToken }

export default blogService