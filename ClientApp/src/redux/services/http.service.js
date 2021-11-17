import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:44329/',
  timeout: 10000,
});


instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
        instance.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
        try {
          const response = await instance.post("/auth/refresh");
          const tokens = response.data;
          localStorage.setItem("token", JSON.stringify(tokens.token));
          localStorage.setItem("refresh_token", JSON.stringify(tokens.refresh_token));
          instance.defaults.headers.common['Authorization'] = `Bearer ${tokens.token}`;
          originalConfig.headers['Authorization'] = `Bearer ${tokens.token}`;
          return instance(originalConfig);
        } catch (_error) {
          console.log( _error)
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;