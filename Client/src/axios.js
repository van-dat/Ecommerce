import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let localStorageData = window.localStorage.getItem('persist:auth')
    if (localStorageData && typeof localStorageData === 'string') {
      localStorageData = JSON.parse(localStorageData)
      const token = JSON.parse(localStorageData.token)
      config.headers = { Authorization: `Bearer ${token}` }
      return config
    } else{
      return config;
    }

    
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response)
    return error.response.data;

  }
);
export default instance;
