import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import Header from "../Header";
import ModalAuth from "@components/modals/components/ModalAuth";
import DrawerHeader from "@components/drawers/components/DrawerHeader";
import Footer from "@components/segments/Footer";

import { TLayoutProps } from "./types";
import { IRoot } from "@store/store";

export const Layout: FC<PropsWithChildren<TLayoutProps>> = inject("store")(
    observer(
        ({
            store,
            children,
            pageClassPrefix,
            headerClassName,
            layoutClassName,
            footerClassName,
            isFullFooter,
        }) => {
            const classPrefix = "layout";
            const { commonStore } = store as IRoot;
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
                        <Footer
                            pageClassPrefix={pageClassPrefix}
                            className={footerClassName}
                            isFullFooter={isFullFooter}
                        />
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
    ),
);
