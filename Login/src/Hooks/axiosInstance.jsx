import axios from "axios";
import { getRefreshToken, setAccessToken } from "../Utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("Interceptor caught an error:", error.response);
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      console.log("Handling 403 error, attempting token refresh...");
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken("refreshToken");
        const { data } = await axiosInstance.get("/refresh", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        console.log("new access token", data.accessToken);
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("this is err", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
