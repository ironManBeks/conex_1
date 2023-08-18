import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { TLogout } from "./types";
import { removeStorage } from "@services/storage.service";
import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import { JWT_TOKEN } from "@consts/storageNamesContsts";
import { IRoot } from "@store/store";

const Logout: React.FC<TLogout> = inject("store")(
    observer(({ store, component, pageLink }) => {
        const { authStore } = store as IRoot;

        const router = useRouter();
        const onClick = () => {
            removeStorage(JWT_TOKEN);
            authStore.setAuthData(null);
            authStore.setAccountData(null);
            if (pageLink) {
                router.push(pageLink);
            } else router.push(PATH_HOME_PAGE);
        };

        return React.cloneElement(component, { onClick });
    }),
);

export default Logout;
