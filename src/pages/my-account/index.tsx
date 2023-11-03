import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountPage from "src/components/pages/account/AccountPage";

const AccountPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="My account" />
            <AccountPage />
        </>
    );
};

export default AccountPageLayout;
