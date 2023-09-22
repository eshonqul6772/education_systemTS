import axios from 'axios'

import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL

const getData = (data: any) => {
  return axios.post(API_URL + '/groups/pageable', data, { headers: authHeader() })
}

const getAll = (search = '', data: any) => {
  return axios.post(API_URL + '/groups/pageable', data, {
    headers: authHeader(),
    params: {
      search: search,
    },
  })
}

const create = (data?: any) => {
  return axios.post(API_URL + '/groups', data, { headers: authHeader() })
}

const remove = (id: string) => {
  return axios.delete(API_URL + '/groups/' + id, { headers: authHeader() })
}

const getGroup = (id?: string) => {
  return axios.get(API_URL + '/groups/' + id, { headers: authHeader() })
}

const update = (id?: string, data?: any) => {
  return axios.put(API_URL + `/groups/${id}`, data, { headers: authHeader() })
}

export default {
  getAll,
  getGroup,
  create,
  remove,
  update,
  getData,
}
