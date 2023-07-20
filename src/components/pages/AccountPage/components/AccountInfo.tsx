import { FC } from "react";

import AccountForm from "../components/AccountForm";
import AccountPayment from "../components/AccountPayment";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import AccountTracker from "@components/pages/AccountPage/components/AccountTracker";

const AccountInfo: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    return (
        <div className={`${pageClassPrefix}_info__wrapper`}>
            <AccountForm pageClassPrefix={pageClassPrefix} />
            <AccountPayment pageClassPrefix={pageClassPrefix} />
            <AccountTracker pageClassPrefix={pageClassPrefix} />
        </div>
    );
};

export default AccountInfo;
