import { FC, PropsWithChildren, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";
import { useRouter } from "next/router";
import cn from "classnames";

import Container from "@components/globalComponents/Container";
import { Layout } from "@components/segments/Layout";
import Spin from "@components/globalComponents/Spin";
import AccountMenu from "@components/pages/account/components/AccountMenu";
import AuthForm from "@components/globalComponents/AuthForm";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { IRoot } from "@store/store";
import { getStorage } from "@services/storage.service";
import { JWT_TOKEN } from "@consts/storageNamesContsts";
import { EButtonColor } from "@components/buttons/types";
import { ACCOUNT_CLASSPREFIX } from "../consts";
import { TAccountLayoutProps } from "../types";

const wrapperStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "50vh",
};

const AccountLayout: FC<PropsWithChildren<TAccountLayoutProps>> = inject(
    "store",
)(
    observer(({ store, pageClassPrefix, children }) => {
        const { authStore } = store as IRoot;
        const { authRequestFetching, logOut } = authStore;
        const [tokenState, setTokenState] = useState<string>();
        const [loading, setLoading] = useState(true);
        const router = useRouter();
        const token = getStorage(JWT_TOKEN) as string;

        useEffect(() => {
            if (token) {
                setTokenState(token);
            }
            setLoading(false);
        }, [token]);

        const accountContent = () => {
            if (authRequestFetching || loading) {
                return (
                    <div style={wrapperStyles}>
                        <Spin size="large" />
                    </div>
                );
            }

            if (tokenState) {
                return (
                    <>
                        <AccountMenu />
                        <div
                            className={cn(
                                `${ACCOUNT_CLASSPREFIX}_content__wrapper`,
                                `${pageClassPrefix}_content__wrapper`,
                            )}
                        >
                            {children}
                        </div>
                    </>
                );
            }

            if (isNil(tokenState)) {
                return (
                    <div style={wrapperStyles}>
                        <AuthForm className={ACCOUNT_CLASSPREFIX} />
                    </div>
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
        };

        return (
            <Layout
                pageClassPrefix={ACCOUNT_CLASSPREFIX}
                layoutClassName={`${pageClassPrefix}_layout__wrapper`}
            >
                <Container>{accountContent()}</Container>
            </Layout>
        );
    }),
);

export default AccountLayout;
