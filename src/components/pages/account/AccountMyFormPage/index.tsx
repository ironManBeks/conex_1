import { FC } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";

import { H2 } from "@components/Text";
import AccountLayout from "../components/AccountLayout";
import AccountLoader from "../components/AccountLoader";
import AccountNoData from "../components/AccountNoData";
import AccountMyForm from "./components/AccountMyForm";

import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";

const AccountMyFormPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { authStore } = store as IRoot;
        const { userData, userDataFetching } = authStore;
        const classPrefix = "account-my-form-page";

        const content = () => {
            if (userDataFetching) {
                return <AccountLoader />;
            }

            if (!isNil(userData)) {
                return <AccountMyForm pageClassPrefix={classPrefix} />;
            }

            return <AccountNoData />;
        };

        return (
            <AccountLayout pageClassPrefix={classPrefix}>
                <div className={`${classPrefix}_wrapper`}>
                    <H2>Your account</H2>
                    {content()}
                </div>
            </AccountLayout>
        );
    }),
);

export default AccountMyFormPage;
