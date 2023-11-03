import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";
import { useRouter } from "next/router";

import { H2 } from "@components/Text";
import { IconArrowSingle } from "@components/Icons";
import AccountLayout from "../components/AccountLayout";
import AccountLoader from "../components/AccountLoader";
import AccountNoData from "../components/AccountNoData";
import AccountSingleOrder from "./components/AccountSingleOrder";
import ButtonLink from "@components/buttons/ButtonLink";

import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import { AccountOrderIdKey } from "../consts";
import { PATH_MY_ACCOUNT_ORDERS_PAGE } from "@consts/pathsConsts";
import { EArrowDirection } from "@components/Icons/types";

const AccountSingleOrderPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { authStore } = store as IRoot;
        const {
            getUserSingleOrderData,
            userSingleOrderData,
            userSingleOrderDataFetching,
            setUserSingleOrderData,
        } = authStore;
        const router = useRouter();
        const orderIdValue = router.query[AccountOrderIdKey] as
            | string
            | undefined;
        const classPrefix = "account-single-order-page";

        useEffect(() => {
            if (orderIdValue) {
                const id = parseInt(orderIdValue, 10);
                if (!isNaN(id)) {
                    getUserSingleOrderData({ id });
                }
            }
            return () => {
                setUserSingleOrderData(null);
            };
        }, [orderIdValue]);

        const content = () => {
            if (userSingleOrderDataFetching) {
                return <AccountLoader />;
            }

            if (!isNil(userSingleOrderData)) {
                return <AccountSingleOrder pageClassPrefix={classPrefix} />;
            }

            return <AccountNoData title={"Order not found"} isButton={false} />;
        };

        return (
            <AccountLayout pageClassPrefix={classPrefix}>
                <div className={`${classPrefix}_wrapper`}>
                    <H2>
                        <ButtonLink
                            href={PATH_MY_ACCOUNT_ORDERS_PAGE}
                            color={EButtonColor.transparent}
                        >
                            <IconArrowSingle direction={EArrowDirection.left} />
                            Back
                        </ButtonLink>
                        Order
                    </H2>
                    {content()}
                    <div className={`${classPrefix}_actions`}>
                        <ButtonLink
                            href={PATH_MY_ACCOUNT_ORDERS_PAGE}
                            color={EButtonColor.primary}
                        >
                            Back to orders
                        </ButtonLink>
                    </div>
                </div>
            </AccountLayout>
        );
    }),
);

export default AccountSingleOrderPage;
