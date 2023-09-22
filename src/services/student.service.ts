import axios from 'axios'

import authHeader from './auth-header'


const API_URL = process.env.REACT_APP_API_URL;

const getAll = (search = '', data:any) => {
  return axios.post(API_URL + '/students/pageable', data, {
    headers: authHeader(),
    params: {
      search: search
    }
  });
};

const getStudent = (id?:string) => {
  return axios.get(API_URL + '/students/' + id, { headers: authHeader() })
}

const create = (data?:any) => {
  return axios.post(API_URL + '/students', data, { headers: authHeader() })
}

const remove = (id:string) => {
  return axios.delete(API_URL + '/students/' + id, { headers: authHeader() })
}

const update = (id?:string,data?:any) => {
  return axios.put(API_URL + `/students/${id}`, data, { headers: authHeader() })
}


export default {
  getAll,
  getStudent,
  create,
  remove,
  update
}
