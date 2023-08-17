import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { JSX, ReactNode, useEffect } from "react";

import { RootStoreProvider, useRootStore } from "src/store";

import "antd/dist/antd.css";
import "@common/styles/main.scss";
import { observer } from "mobx-react";
import { getStorage } from "@services/storage.service";
import { AUTH_DATA, JWT_TOKEN } from "@consts/storageNamesContsts";
import { toJS } from "mobx";

const CustomAppWrapper = observer(
    ({ children }: { children: ReactNode }): JSX.Element => {
        const { authStore } = useRootStore();
        const { authData, setAuthData } = authStore;
        const storageToken = getStorage(JWT_TOKEN);
        const storageAuthData = getStorage(AUTH_DATA);

        useEffect(() => {
            if (storageToken && storageAuthData) {
                setAuthData({
                    jwt: storageToken,
                    user: storageAuthData,
                });
            }
        }, []);

        useEffect(() => {
            console.log("authData", toJS(authData));
        }, [authData]);

        return <>{children}</>;
    },
);

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <GoogleOAuthProvider clientId="<your_client_id>">
            <RootStoreProvider>
                <CustomAppWrapper>
                    <Component {...pageProps} />
                </CustomAppWrapper>
            </RootStoreProvider>
        </GoogleOAuthProvider>
    );
}

export default CustomApp;
