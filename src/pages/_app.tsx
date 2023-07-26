import { RootStoreProvider } from "src/store";
import { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "antd/dist/antd.css";
import "@common/styles/main.scss";

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <GoogleOAuthProvider clientId="<your_client_id>">
            <RootStoreProvider>
                <Component {...pageProps} />
            </RootStoreProvider>
        </GoogleOAuthProvider>
    );
}

export default CustomApp;
