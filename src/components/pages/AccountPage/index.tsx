import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { observer } from "mobx-react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import AccountInfo from "./components/AccountInfo";
import AccountOrder from "./components/AccountOrder";
import AccountInfoSkeleton from "@components/skeletons/AccountInfoSkeleton";
import AccountOrderSkeleton from "@components/skeletons/AccountOrderSkeleton";
import AuthForm from "@components/globalComponents/AuthForm";

import { useRootStore } from "@store";
import { getStorage } from "@services/storage.service";
import { AUTH_TOKEN } from "@consts/storageNamesContsts";
import { isEmpty } from "lodash";

const AccountPage: FC = observer(() => {
    const { authStore } = useRootStore();
    const { accountDataFetching, accountData } = authStore;
    const classPrefix = "account-page";

    useEffect(() => {
        console.log("accountData", accountData);
    }, [accountData]);

    const accountContent = useMemo(() => {
        if (accountDataFetching) {
            return (
                <>
                    <AccountInfoSkeleton />
                    <AccountOrderSkeleton />
                </>
            );
        }

        // if (isEmpty(accountData)) {
        //     return (
        //         <div
        //             style={{
        //                 display: "flex",
        //                 justifyContent: "center",
        //                 width: "100%",
        //             }}
        //         >
        //             <AuthForm className={classPrefix} />
        //         </div>
        //     );
        // }

        return (
            <>
                <AccountInfo pageClassPrefix={classPrefix} />
                <AccountOrder pageClassPrefix={classPrefix} />
            </>
        );
    }, [accountData, accountDataFetching, classPrefix]);

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
