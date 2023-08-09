import { FC, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { useRootStore } from "src/store";
import { observer } from "mobx-react";

import { Header } from "../Header";
import ModalAuth from "@components/modals/components/ModalAuth";

import { TLayout } from "./types";
import DrawerHeader from "@components/drawers/components/DrawerHeader";

export const Layout: FC<TLayout> = observer(
    ({ children, pageClassPrefix, headerClassName, layoutClassName }) => {
        const classPrefix = "layout";
        const { commonStore } = useRootStore();
        const [layoutSpaceTop, setLayoutSpaceTop] = useState<number>(0);

        useEffect(() => {
            setLayoutSpaceTop(commonStore.headerHeight);
        }, [commonStore.headerHeight]);

        return useMemo(
            () => (
                <div
                    className={cn(
                        `${classPrefix}_wrapper`,
                        layoutClassName,
                        `${pageClassPrefix}_layout__wrapper`,
                    )}
                    style={{ paddingTop: layoutSpaceTop }}
                >
                    <Header
                        pageClassPrefix={pageClassPrefix}
                        className={headerClassName}
                    />
                    <div
                        className={cn(
                            `${classPrefix}_inner-wrapper`,
                            `${pageClassPrefix}_layout__inner-wrapper`,
                        )}
                    >
                        {children}
                    </div>
                    <ModalAuth />
                    <DrawerHeader />
                </div>
            ),
            [
                layoutSpaceTop,
                layoutClassName,
                classPrefix,
                pageClassPrefix,
                children,
            ],
        );
    },
);
