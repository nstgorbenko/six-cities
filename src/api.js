import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
};

const LOADING_TIME = 5000;
const APP_URL = `https://4.react.pages.academy/six-cities`;

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: APP_URL,
    timeout: LOADING_TIME,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
