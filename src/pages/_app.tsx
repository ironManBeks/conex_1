import { RootStoreProvider } from "@mobx";
import { AppProps } from "next/app";

import "antd/dist/antd.css";
import "@common/styles/main.scss";

function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <RootStoreProvider>
            <Component {...pageProps} />
        </RootStoreProvider>
    );
}

export default CustomApp;
