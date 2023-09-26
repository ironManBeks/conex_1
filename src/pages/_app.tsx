import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Fragment, JSX, ReactNode, useEffect } from "react";
import { inject, Provider } from "mobx-react";
import jwt from "jwt-decode";

import "antd/dist/antd.css";
import "@common/styles/main.scss";
import { observer } from "mobx-react";
import { getStorage } from "@services/storage.service";
import initializeStore from "@store/index";
import { JWT_TOKEN, JWT_TOKEN_EXP } from "@consts/storageNamesContsts";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";

const CustomAppWrapper = inject("store")(
    observer(
        ({
            store,
            children,
        }: {
            children: ReactNode;
        } & TStore): JSX.Element => {
            const { authStore } = store as IRoot;
            const { getUserData, logOut } = authStore;
            const storageToken = getStorage(JWT_TOKEN);
            const storageTokenExp = getStorage(JWT_TOKEN_EXP);

            const tokenVerification = () => {
                if (storageToken) {
                    if (new Date(storageTokenExp) < new Date()) {
                        logOut();
                    } else {
                        getUserData();
                    }
                }
            };

            useEffect(() => {
                tokenVerification();
            }, []);

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
