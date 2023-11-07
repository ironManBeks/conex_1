import { FC, cloneElement } from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import cn from "classnames";

import { TLogout } from "./types";
import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import { IRoot } from "@store/store";

const Logout: FC<TLogout> = inject("store")(
    observer(({ store, component, pageLink }) => {
        const { authStore, orderStore } = store as IRoot;
        const { logOut } = authStore;
        const { setDoorsData } = orderStore;
        const router = useRouter();

        const onClick = () => {
            logOut();
            setDoorsData(null);
            if (pageLink) {
                router.push(pageLink);
            } else router.push(PATH_HOME_PAGE);
        };

        return cloneElement(component, {
            onClick,
            className: cn(component.props.className, "_logout"),
        });
    }),
);

export default Logout;
