import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountOrdersPage from "@components/pages/account/AccountOrdersPage";

const AccountOrdersLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Orders" />
            <AccountOrdersPage />
        </>
    );
};

export default AccountOrdersLayout;
