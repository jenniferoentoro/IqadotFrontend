import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080",
});

axiosPrivate.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    }, (err) => Promise.reject(err)
);

export default axiosPrivate