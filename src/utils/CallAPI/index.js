import axios from 'axios';
import { getData } from '../Storage';

export const API_HOST = process.env.EXPO_PUBLIC_API_URL;

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
        const error = new Error();
        if (!e.response) {
          error.message = 'Terjadi kesalahan dari sisi server!';
          reject(error);
        } else {
          error.message = e.response.data.message;
          reject(error);
        }
      });
  });
};
