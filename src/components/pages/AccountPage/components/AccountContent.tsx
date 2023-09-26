import { FC, useMemo } from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import AccountOrder from "./AccountOrder";
import AccountMyFormLayout from "./AccountMyFormLayout";
import AccountPaymentLayout from "./AccountPaymentLayout";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { AccountTabKey, EAccountTabsPaths } from "../consts";

const AccountContent: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const router = useRouter();
    const tabValue = router.query[AccountTabKey] as
        | EAccountTabsPaths
        | undefined;

    const content = useMemo(() => {
        switch (tabValue) {
            case EAccountTabsPaths.paymentMethods:
                return (
                    <AccountPaymentLayout pageClassPrefix={pageClassPrefix} />
                );
            case EAccountTabsPaths.orders:
                return <AccountOrder pageClassPrefix={pageClassPrefix} />;
            default:
                return (
                    <AccountMyFormLayout pageClassPrefix={pageClassPrefix} />
                );
        }
    }, [tabValue]);

    return (
        <div className={cn(`${pageClassPrefix}_content__wrapper`)}>
            {content}
        </div>
    );
};

export default AccountContent;
