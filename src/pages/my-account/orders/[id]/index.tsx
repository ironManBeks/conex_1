import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountSingleOrderPage from "@components/pages/account/AccountSingleOrderPage";

const AccountSingleOrderLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Order" />
            <AccountSingleOrderPage />
        </>
    );
};

export default AccountSingleOrderLayout;
