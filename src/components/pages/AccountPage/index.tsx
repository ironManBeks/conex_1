import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import AccountInfo from "./components/AccountInfo";
import AccountOrder from "./components/AccountOrder";
import AccountInfoSkeleton from "@components/skeletons/AccountInfoSkeleton";
import AccountOrderSkeleton from "@components/skeletons/AccountOrderSkeleton";
import AuthForm from "@components/globalComponents/AuthForm";

import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";

const AccountPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { authStore } = store as IRoot;

        const { accountDataFetching, authData } = authStore;
        const classPrefix = "account-page";

        useEffect(() => {
            console.log("authData", authData);
        }, [authData]);

        const accountContent = useMemo(() => {
            if (accountDataFetching) {
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
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <AuthForm className={classPrefix} />
                    </div>
                );
            }

            if (!isEmpty(authData)) {
                return (
                    <>
                        <AccountInfo pageClassPrefix={classPrefix} />
                        <AccountOrder pageClassPrefix={classPrefix} />
                    </>
                );
            }

            return (
                <div style={{ textAlign: "center" }}>
                    Something went wrong. <br /> Please try to reload the page
                </div>
            );
        }, [authData, accountDataFetching, classPrefix]);

        return (
            <Layout pageClassPrefix={classPrefix}>
                <Container>
                    <div className={cn(`${classPrefix}_content__wrapper`)}>
                        {accountContent}
                    </div>
                </Container>
            </Layout>
        );
    }),
);

export default AccountPage;
