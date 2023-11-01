import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountPaymentPage from "@components/pages/account/AccountPaymentPage";

const AccountPaymentLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Payment methods" />
            <AccountPaymentPage />
        </>
    );
};

export default AccountPaymentLayout;
