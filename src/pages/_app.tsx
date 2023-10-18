import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Fragment, JSX, ReactNode, useEffect } from "react";
import { inject, Provider } from "mobx-react";
import Head from "next/head";

import localFont from "next/font/local";

// import "antd/dist/antd.css";
// import "leaflet/dist/leaflet.css";
import "../assets/styles/main.scss";

import { observer } from "mobx-react";
import { getStorage } from "@services/storage.service";
import initializeStore from "@store/index";
import { JWT_TOKEN, JWT_TOKEN_EXP } from "@consts/storageNamesContsts";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import { showNotification } from "@helpers/notificarionHelper";

const manrope = localFont({
    src: [
        {
            path: "../assets/fonts/Manrope-Light/Manrope-Light.woff2",
            weight: "300",
        },
        {
            path: "../assets/fonts/Manrope-Regular/Manrope-Regular.woff2",
            weight: "400",
        },
        {
            path: "../assets/fonts/Manrope-Medium/Manrope-Medium.woff2",
            weight: "500",
        },
        {
            path: "../assets/fonts/Manrope-SemiBold/Manrope-SemiBold.woff2",
            weight: "600",
        },
        {
            path: "../assets/fonts/Manrope-Bold/Manrope-Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-manrope",
});

const helvetica = localFont({
    src: [
        {
            path: "../assets/fonts/HelveticaNeue-Light/HelveticaNeue-Light.woff2",
            weight: "300",
        },
        {
            path: "../assets/fonts/HelveticaNeue-Regular/HelveticaNeue-Regular.woff2",
            weight: "400",
        },
        {
            path: "../assets/fonts/HelveticaNeue-Medium/HelveticaNeue-Medium.woff2",
            weight: "500",
        },
        {
            path: "../assets/fonts/HelveticaNeue-Bold/HelveticaNeue-Bold.woff2",
            weight: "700",
        },
    ],
    variable: "--font-helvetica",
});

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
            const storageTokenExp = getStorage(JWT_TOKEN_EXP) as string;

            const tokenVerification = () => {
                if (storageToken) {
                    if (new Date(storageTokenExp) < new Date()) {
                        logOut();
                        showNotification({
                            mainProps: {
                                type: "warning",
                                message: (
                                    <>
                                        Your session has expired <br />
                                        Please log in again
                                    </>
                                ),
                            },
                        });
                    } else {
                        getUserData();
                    }
                }
            };

            useEffect(() => {
                tokenVerification();
            }, []);

            return (
                <>
                    <Head>
                        <body
                            className={`${manrope.variable} ${helvetica.variable} font-sans`}
                        />
                    </Head>
                    {children}
                </>
            );
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
