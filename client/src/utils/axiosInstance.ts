import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({ baseURL: '' ,withCredentials: true });

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if(response.data.msg == "Unauthorized!"){
      // code here what you want
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;