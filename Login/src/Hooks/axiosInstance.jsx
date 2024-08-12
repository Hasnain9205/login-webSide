import axios from "axios";
import { getRefreshToken, setAccessToken } from "../Utils";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `This user already exist`,
        showConfirmButton: false,
        timer: 2000,
      });
    }

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
