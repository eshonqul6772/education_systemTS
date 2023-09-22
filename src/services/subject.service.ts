import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL

const getData = (search = '', data: any) => {
  return axios.post(API_URL + '/subjects/pageable', data, {
    headers: authHeader(),
    params: {
      search: search,
    },
  })
}

const getAll = () => {
  return axios.get(API_URL + '/subjects/list', { headers: authHeader() })
}

const create = (data?: any) => {
  return axios.post(API_URL + '/subjects', data, { headers: authHeader() })
}

const remove = (id: string) => {
  return axios.delete(API_URL + '/subjects/' + id, { headers: authHeader() })
}

const getSubject = (id?: string) => {
  return axios.get(API_URL + '/subjects/' + id, { headers: authHeader() })
}

const update = (id?: string, data?: any) => {
  return axios.put(API_URL + `/subjects/${id}`, data, { headers: authHeader() })
}

export default {
  getAll,
  create,
  remove,
  getSubject,
  update,
  getData,
}
