import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { observer } from "mobx-react";
import { isEmpty } from "lodash";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import AccountInfo from "./components/AccountInfo";
import AccountOrder from "./components/AccountOrder";
import AccountInfoSkeleton from "@components/skeletons/AccountInfoSkeleton";
import AccountOrderSkeleton from "@components/skeletons/AccountOrderSkeleton";

import { useRootStore } from "@store";
import AuthForm from "@components/globalComponents/AuthForm";

const AccountPage: FC = observer(() => {
    const { authStore } = useRootStore();
    const { authData, authDataFetching } = authStore;
    const classPrefix = "account-page";

    useEffect(() => {
        authStore.getAuthData();
    }, []);

    useEffect(() => {
        console.log("authData", authData);
    }, [authData]);

    useEffect(() => {
        console.log("authDataFetching", authDataFetching);
    }, [authDataFetching]);

    const accountContent = useMemo(() => {
        if (authDataFetching) {
            return (
                <>
                    <AccountInfoSkeleton />
                    <AccountOrderSkeleton />
                </>
            );
        }

        if (isEmpty(authData)) {
            return (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "50px",
                        flexDirection: "column",
                    }}
                >
                    <AuthForm className={classPrefix} />
                </div>
            );
        }

        return (
            <>
                <AccountInfo pageClassPrefix={classPrefix} />
                <AccountOrder pageClassPrefix={classPrefix} />
            </>
        );
    }, [authStore.authData, authStore.authDataFetching, classPrefix]);

    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container>
                <div className={cn(`${classPrefix}_content__wrapper`)}>
                    {accountContent}
                </div>
            </Container>
        </Layout>
    );
});

export default AccountPage;
