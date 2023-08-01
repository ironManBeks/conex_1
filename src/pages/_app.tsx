import { RootStoreProvider } from "src/store";
import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "antd/dist/antd.css";
import "@common/styles/main.scss";

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
    const router = useRouter();

    useEffect(() => {
        console.log("router", router);
    }, [router]);

    return (
        <GoogleOAuthProvider clientId="<your_client_id>">
            <RootStoreProvider>
                <Component {...pageProps} />
            </RootStoreProvider>
        </GoogleOAuthProvider>
    );
}

export default CustomApp;
