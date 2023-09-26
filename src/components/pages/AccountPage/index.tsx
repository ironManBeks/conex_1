import { FC, useEffect, useMemo, useState } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";
import { Spin } from "antd";
import { useRouter } from "next/router";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import AuthForm from "@components/globalComponents/AuthForm";
import AccountMenu from "./components/AccountMenu";
import AccountContent from "./components/AccountContent";

import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import { getStorage } from "@services/storage.service";
import { JWT_TOKEN } from "@consts/storageNamesContsts";
import { EButtonColor } from "@components/buttons/types";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

const AccountPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const router = useRouter();
        const { authStore } = store as IRoot;
        const { authRequestFetching, logOut } = authStore;
        const [tokenState, setTokenState] = useState<string>();
        const classPrefix = "account-page";

        const token = getStorage(JWT_TOKEN);

        useEffect(() => {
            if (token) {
                setTokenState(token);
            }
        }, [token]);

        const wrapperStyles = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "50vh",
        };

        const accountContent = useMemo(() => {
            if (authRequestFetching) {
                return (
                    <div style={wrapperStyles}>
                        <Spin size="large" />
                    </div>
                );
            }

            if (isNil(tokenState)) {
                return (
                    <div style={wrapperStyles}>
                        <AuthForm className={classPrefix} />
                    </div>
                );
            }

            if (tokenState) {
                return (
                    <>
                        <AccountMenu pageClassPrefix={classPrefix} />
                        <AccountContent pageClassPrefix={classPrefix} />
                    </>
                );
            }

            return (
                <div
                    style={{
                        ...wrapperStyles,
                        flexDirection: "column",
                        textAlign: "center",
                    }}
                >
                    Something went wrong. <br /> Please try to reload the page
                    <br />
                    <div style={{ marginTop: 20 }}>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={() => {
                                logOut();
                                router.reload();
                            }}
                        >
                            Reset and reload
                        </ButtonPrimary>
                    </div>
                </div>
            );
        }, [authRequestFetching, tokenState]);

        return (
            <Layout pageClassPrefix={classPrefix}>
                <Container>{accountContent}</Container>
            </Layout>
        );
    }),
);

export default AccountPage;
