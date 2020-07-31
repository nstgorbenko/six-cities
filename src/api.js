import axios from "axios";

const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401
};

const LOADING_TIME = 5000;
const APP_URL = `https://4.react.pages.academy/six-cities`;

const createAPI = (onDataError, onUnauthorized) => {
  const api = axios.create({
    baseURL: APP_URL,
    timeout: LOADING_TIME,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;

    switch (response.status) {
      case Error.BAD_REQUEST:
        onDataError();
        break;
      case Error.UNAUTHORIZED:
        onUnauthorized();
        break;
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
