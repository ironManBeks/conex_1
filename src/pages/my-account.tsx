import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountPage from "@components/pages/AccountPage";

const AccountPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="My account" />
            <AccountPage />
        </>
    );
};

export default AccountPageLayout;
