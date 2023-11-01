import { FC, useMemo } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import AccountMyFormLayout from "./AccountMyFormLayout";
import AccountPaymentLayout from "./AccountPaymentLayout";
import AccountOrdersLayout from "./AccountOrdersLayout";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { AccountOrderIdKey, AccountTabKey } from "../consts";
import { EAccountTabsPaths } from "../types";
import AccountSingleOrderLayout from "@components/pages/account/AccountPage/components/AccountSingleOrderLayout";

const AccountContent: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const router = useRouter();
    const tabValue = router.query[AccountTabKey] as
        | EAccountTabsPaths
        | undefined;

    const orderIdValue = router.query[AccountOrderIdKey] as string | undefined;

    const content = useMemo(() => {
        switch (tabValue) {
            case EAccountTabsPaths.paymentMethods:
                return (
                    <AccountPaymentLayout pageClassPrefix={pageClassPrefix} />
                );
            case EAccountTabsPaths.orders:
                if (orderIdValue) {
                    return (
                        <AccountSingleOrderLayout
                            pageClassPrefix={pageClassPrefix}
                        />
                    );
                } else
                    return (
                        <AccountOrdersLayout
                            pageClassPrefix={pageClassPrefix}
                        />
                    );
            default:
                return (
                    <AccountMyFormLayout pageClassPrefix={pageClassPrefix} />
                );
        }
    }, [tabValue, orderIdValue]);

    return (
        <div className={cn(`${pageClassPrefix}_content__wrapper`)}>
            {content}
        </div>
    );
};

export default AccountContent;
