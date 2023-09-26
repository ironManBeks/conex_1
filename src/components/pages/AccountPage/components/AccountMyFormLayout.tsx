import { FC, useMemo } from "react";
import { isNil } from "lodash";
import { inject, observer } from "mobx-react";

import AccountMyForm from "./AccountMyForm";
import AccountNoData from "./AccountNoData";
import AccountLoader from "./AccountLoader";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";

const AccountMyFormLayout: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userData, userDataFetching } = authStore;

        return useMemo(() => {
            if (userDataFetching) {
                return <AccountLoader pageClassPrefix={pageClassPrefix} />;
            }

            if (!isNil(userData)) {
                return <AccountMyForm pageClassPrefix={pageClassPrefix} />;
            }

            return <AccountNoData pageClassPrefix={pageClassPrefix} />;
        }, [userData, userDataFetching]);
    }),
);

export default AccountMyFormLayout;
