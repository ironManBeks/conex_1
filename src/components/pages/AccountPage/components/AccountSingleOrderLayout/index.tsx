import { FC, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";
import { useRouter } from "next/router";

import ButtonLink from "@components/buttons/ButtonLink";
import { IconArrowSingle } from "@components/Icons";
import { H2 } from "@components/Text";
import AccountLoader from "../AccountLoader";
import AccountNoData from "../AccountNoData";
import AccountSingleOrder from "./components/AccountSingleOrder";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EArrowDirection } from "@components/Icons/types";
import { PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import { EAccountTabsPaths } from "../../types";
import { AccountOrderIdKey, AccountTabKey } from "../../consts";
import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";

const AccountSingleOrderLayout: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const router = useRouter();
        const orderIdValue = router.query[AccountOrderIdKey] as
            | string
            | undefined;

        const {
            getUserSingleOrderData,
            userSingleOrderData,
            userSingleOrderDataFetching,
            setUserSingleOrderData,
        } = authStore;

        const classPrefix = `${pageClassPrefix}_single-order`;

        const backLinkPath = {
            pathname: PATH_MY_ACCOUNT_PAGE,
            query: {
                [AccountTabKey]: EAccountTabsPaths.orders,
            },
        };

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

        const content = useMemo(() => {
            if (userSingleOrderDataFetching) {
                return <AccountLoader pageClassPrefix={pageClassPrefix} />;
            }

            if (!isNil(userSingleOrderData)) {
                return (
                    <AccountSingleOrder
                        pageClassPrefix={pageClassPrefix}
                        classPrefix={classPrefix}
                    />
                );
            }

            return (
                <AccountNoData
                    pageClassPrefix={pageClassPrefix}
                    title={"Order not found"}
                    isButton={false}
                />
            );
        }, [userSingleOrderData, userSingleOrderDataFetching]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>
                    <ButtonLink
                        href={backLinkPath}
                        color={EButtonColor.transparent}
                    >
                        <IconArrowSingle direction={EArrowDirection.left} />
                        Back
                    </ButtonLink>
                    Order
                </H2>
                {content}
                <div className={`${classPrefix}__actions`}>
                    <ButtonLink
                        href={backLinkPath}
                        color={EButtonColor.primary}
                    >
                        Back to orders
                    </ButtonLink>
                </div>
            </div>
        );
    }),
);

export default AccountSingleOrderLayout;
