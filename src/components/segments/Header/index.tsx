import { FC, useRef, RefObject, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRootStore } from "src/store";
import { observer } from "mobx-react";

import Container from "@components/globalComponents/Container";
import NavLinks from "../components/NavLinks";
import NavActions from "../components/NavActions";

import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import { THeader } from "./types";

export const Header: FC<THeader> = observer(
    ({ pageClassPrefix, className }) => {
        const classPrefix = `header`;
        const headerRef = useRef<HTMLElement>(null);
        const { commonStore } = useRootStore();

        useEffect(() => {
            if (headerRef?.current?.clientHeight) {
                commonStore.setHeaderHeight(headerRef.current.clientHeight);
            }
        }, [headerRef?.current?.clientHeight]);

        return (
            <header
                ref={headerRef as RefObject<HTMLDivElement>}
                className={cn(
                    `${classPrefix}_wrapper`,
                    `${pageClassPrefix}_${classPrefix}__wrapper`,
                    className,
                )}
            >
                <div className={cn(`${classPrefix}_inner-wrapper`)}>
                    <Container
                        flexDirection="row"
                        flexJustifyContent="space-between"
                    >
                        <div className={cn(`${classPrefix}_left-side`)}>
                            <div className={cn(`${classPrefix}_logo`)}>
                                <Link href={PATH_HOME_PAGE}>
                                    <a>LOGO</a>
                                </Link>
                            </div>
                            <NavLinks wrapperClassPrefix={classPrefix} />
                        </div>
                        <NavActions wrapperClassPrefix={classPrefix} />
                    </Container>
                </div>
            </header>
        );
    },
);
