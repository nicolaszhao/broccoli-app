/* eslint-disable import/prefer-default-export */
import Ajax from '@totebox/ajax';
import { URLS } from './constants';

// TODO: 调整为真实接口后需要删除 import 和 mock()
import mock from './mock';

mock();

const ajax = Ajax({
  timeout: 5000,
  interceptors: {
    response(data) {
      if (data.status === 0) {
        return Promise.reject(new Error(data.message || 'Server Error'));
      }
      return data.data;
    },
    error(err) {
      err.message = `Request api error, url: ${err.config ? err.config.url : ''}, message: ${err.message}`;
      return err;
    },
  },
});

export function fetchUser() {
  return ajax.get(URLS.USER);
}
