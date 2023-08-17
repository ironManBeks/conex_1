import axios from "axios";

import { JWT_TOKEN } from "@consts/storageNamesContsts";
import { PATH_LOGIN } from "@consts/pathsConsts";
import { getStorage } from "@services/storage.service";

// Test api URL
const baseURL = "https://conexwest-doors.opserver.store/api";

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use((request: any) => {
    const { url } = request;
    if (url !== PATH_LOGIN) {
        const token = getStorage(JWT_TOKEN);
        const authorization = token
            ? {
                  Authorization: token ? `Bearer ${token}` : "",
              }
            : {};

        request.headers = {
            ...request.headers,
            ...authorization,
        };
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    ({ response }: any) => {
        const { status, config } = response || {};
        if ((status === 401 || status === 403) && config.url !== PATH_LOGIN) {
            // window.location.href = LOGIN;
            // localStorage.clear();
        }

        return Promise.reject(response);
    },
);

export default axiosInstance;
