import axios from 'axios';
import { getData } from '../Storage';

export const API_HOST = 'http://irvans-macbook-pro.local:3203';

export const CallAPI = async ({
  url, method, data,
}) => {
  const headers = {
    Authorization: `Bearer ${await getData('user-token')}`,
  };

  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      headers,
    })
      .then((r) => {
        resolve({ statusCode: r.status, ...r.data.data });
      })
      .catch((e) => {
        if (!e.response) {
          reject(new Error('Terjadi kesalahan dari sisi server!'));
        } else {
          reject(new Error(e.response.data.message));
        }
      });
  });
};
