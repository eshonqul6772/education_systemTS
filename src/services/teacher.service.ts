import axios from 'axios'

import authHeader from './auth-header'


const API_URL = process.env.REACT_APP_API_URL;

const getAll = (search = '', data:any) => {
  return axios.post(API_URL + '/teachers/pageable', data, {
    headers: authHeader(),
    params: {
      search: search
    }
  });
};
const create = (data?:any) => {
  return axios.post(API_URL + '/teachers',data, { headers: authHeader() })
}

const update = (id?:string,data?:any) => {
  return axios.put(API_URL + `/teachers/${id}`,data, { headers: authHeader() })
}


const getTeacher = (id?:string) => {
  return axios.get(API_URL + '/teachers/'+id, { headers: authHeader() })
}

const remove = (id?:string) => {
  return axios.delete(API_URL + '/teachers/'+id, { headers: authHeader() })
}


export default {
  getAll,
  create,
  getTeacher,
  update,
  remove
}
