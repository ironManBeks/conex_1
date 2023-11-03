import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountMyFormPage from "@components/pages/account/AccountMyFormPage";

const AccountMyFormLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Account" />
            <AccountMyFormPage />
        </>
    );
};

export default AccountMyFormLayout;
