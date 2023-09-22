import axios from 'axios';

import authHeaders from './auth-header';
const API_URL = process.env.REACT_APP_API_URL;

const uploadFile = (data:any) => {
  return axios.post(API_URL + '/files/upload', data, {
    headers: {
      ...authHeaders(),
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getFile = (search = '', data:any) => {
  return axios.post(API_URL + '/files/pageable', data, {
    headers: authHeaders(),
    params: {
      search: search,
    },
  });
};


const viewFile = ( hashId?:string) => {
    return axios.get(API_URL + '/files/file-preview/' + hashId, {
      headers: authHeaders(),
    });
  };

  const remove = (id?:any) => {
    return axios.delete(API_URL + '/files/' + id, {
      headers: authHeaders(),
    });
  };

export default {
  uploadFile,
  getFile,
  viewFile,
  remove
}
