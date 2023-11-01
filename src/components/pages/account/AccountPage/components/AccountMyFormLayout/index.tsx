import { FC, useMemo } from "react";
import { isNil } from "lodash";
import { inject, observer } from "mobx-react";

import { H2 } from "@components/Text";
import AccountSectionWrapper from "../AccountSectionWrapper";
import AccountNoData from "../AccountNoData";
import AccountLoader from "../AccountLoader";
import AccountMyForm from "./components/AccountMyForm";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";

const AccountMyFormLayout: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userData, userDataFetching } = authStore;
        const classPrefix = `${pageClassPrefix}_my-form`;

        const content = useMemo(() => {
            if (userDataFetching) {
                return (
                    <AccountSectionWrapper pageClassPrefix={pageClassPrefix}>
                        <AccountLoader pageClassPrefix={pageClassPrefix} />
                    </AccountSectionWrapper>
                );
            }

            if (!isNil(userData)) {
                return <AccountMyForm pageClassPrefix={pageClassPrefix} />;
            }

            return (
                <AccountSectionWrapper pageClassPrefix={pageClassPrefix}>
                    <AccountNoData pageClassPrefix={pageClassPrefix} />
                </AccountSectionWrapper>
            );
        }, [userDataFetching, userData]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Your account</H2>
                {content}
            </div>
        );
    }),
);

export default AccountMyFormLayout;
