import { RootStoreProvider, useRootStore } from "src/store";
import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { JSX, ReactNode } from "react";
import { useRouter } from "next/router";

import "antd/dist/antd.css";
import "@common/styles/main.scss";

function CustomAppWrapper({ children }: { children: ReactNode }): JSX.Element {
    const router = useRouter();
    const { commonStore } = useRootStore();

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
