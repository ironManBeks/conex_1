import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import { TLogout } from "./types";
import { useRootStore } from "@store";
import { removeStorage } from "@services/storage.service";
import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import { JWT_TOKEN } from "@consts/storageNamesContsts";

const Logout: React.FC<TLogout> = observer(({ component, pageLink }) => {
    const { authStore } = useRootStore();
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
});

export default Logout;
