import { FC, useMemo } from "react";
import { isNil } from "lodash";
import { inject, observer } from "mobx-react";

import AccountMyForm from "./AccountMyForm";
import AccountNoData from "./AccountNoData";
import AccountLoader from "./AccountLoader";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { H2 } from "@components/Text";
import AccountSectionWrapper from "./AccountSectionWrapper";

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
        }, [userData, userDataFetching]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Your account</H2>

                {content}
            </div>
        );
    }),
);

export default AccountMyFormLayout;
