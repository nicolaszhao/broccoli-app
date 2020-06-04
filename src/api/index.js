/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { partial } from '../utils';

const URLS = {
  INVITE: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
};

const ajax = axios.create({
  timeout: 8000,
  validateStatus(status) {
    return (status >= 200 && status < 300) || status === 400;
  },
});

ajax.interceptors.response.use(({ data, status }) => {
  if (status === 400) {
    return Promise.reject(data.errorMessage);
  }
  return data;
});

export const invite = partial(ajax.post, URLS.INVITE);
