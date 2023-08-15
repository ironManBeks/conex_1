import React from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import { TLogout } from "./types";
import { useRootStore } from "@store";
import { clearStorage } from "@services/storage.service";
import { PATH_HOME_PAGE } from "@consts/pathsConsts";

const Logout: React.FC<TLogout> = observer(({ component, pageLink }) => {
    const { authStore } = useRootStore();
    const router = useRouter();
    const onClick = () => {
        clearStorage();
        authStore.setAuthData(null);
        authStore.setAccountData(null);
        if (pageLink) {
            router.push(pageLink);
        } else router.push(PATH_HOME_PAGE);
    };

    return React.cloneElement(component, { onClick });
});

export default Logout;
