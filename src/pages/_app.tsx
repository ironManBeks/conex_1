import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Fragment, JSX, ReactNode, useEffect } from "react";
import { inject, Provider } from "mobx-react";

import "antd/dist/antd.css";
import "@common/styles/main.scss";
import { observer } from "mobx-react";
import { getStorage } from "@services/storage.service";
import initializeStore from "@store/index";
import { AUTH_DATA, JWT_TOKEN } from "@consts/storageNamesContsts";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import { toJS } from "mobx";

const CustomAppWrapper = inject("store")(
    observer(
        ({
            store,
            children,
        }: {
            children: ReactNode;
        } & TStore): JSX.Element => {
            const { authStore } = store as IRoot;
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
    ),
);

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
    const mobxStore = initializeStore();

    return (
        <Fragment>
            <Provider store={mobxStore}>
                <GoogleOAuthProvider clientId="<your_client_id>">
                    <CustomAppWrapper>
                        <Component {...pageProps} />
                    </CustomAppWrapper>
                </GoogleOAuthProvider>
            </Provider>
        </Fragment>
    );
}

export default CustomApp;
