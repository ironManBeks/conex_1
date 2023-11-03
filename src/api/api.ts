import axios from "axios";

import { JWT_TOKEN } from "@consts/storageNamesContsts";
import { PATH_LOGIN } from "@consts/pathsConsts";
import { getStorage } from "@services/storage.service";

// const baseURL = process.env.NEXT_PUBLIC_ENV_DEV_API
//     ? "https://conexwest-doors-test.opserver.store/api"
//     : "https://conexwest-doors.opserver.store/api";

const baseURL = process.env.NEXT_PUBLIC_ENV_DEV_API
    ? "https://conexwest-doors.opserver.store/api"
    : "https://conexwest-doors.opserver.store/api";

const axiosInstance = axios.create({
    baseURL,
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
axiosInstance.interceptors.request.use((request: any) => {
    const { url, headers } = request;
    if (url !== PATH_LOGIN) {
        const token = getStorage(JWT_TOKEN);

        const authorizationParams = () => {
            if (headers.Authorization === "false") return undefined;
            if (token) return `Bearer ${token}`;
            return undefined;
        };

        const authorization = token
            ? {
                  Authorization: authorizationParams(),
              }
            : {};

        request.headers = {
            ...headers,
            ...authorization,
        };
    }

    return request;
});

axiosInstance.interceptors.response.use(
    /* eslint-disable  @typescript-eslint/no-explicit-any */
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
