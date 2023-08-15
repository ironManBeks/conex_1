import { RootStoreProvider } from "src/store";
import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { JSX, ReactNode } from "react";

import "antd/dist/antd.css";
import "@common/styles/main.scss";

function CustomAppWrapper({ children }: { children: ReactNode }): JSX.Element {
    return <>{children}</>;
}

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
