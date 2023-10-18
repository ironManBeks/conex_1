import { FC, RefObject, useEffect, useRef } from "react";
import cn from "classnames";
import Link from "next/link";
import { inject, observer } from "mobx-react";
import dynamic from "next/dynamic";

import Container from "@components/globalComponents/Container";
import { IconBurger, LogoMain } from "@components/Icons";
import NavLinks from "../components/NavLinks";
import NavActions from "../components/NavActions";

import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor } from "@components/buttons/types";
import { ColorTheme } from "@assets/theme/colorTheme";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";
import { IRoot } from "@store/store";
import { THeader } from "./types";

const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

const Header: FC<THeader> = inject("store")(
    observer(({ store, pageClassPrefix, className }) => {
        const { commonStore } = store as IRoot;
        const classPrefix = `header`;
        const headerRef = useRef<HTMLElement>(null);
        const { setHeaderHeight, setHeaderDrawerVisible, headerDrawerVisible } =
            commonStore;

        // const isMobile = useMediaQuery({
        //     minWidth: mediaBreakpoints.xsMedia,
        //     maxWidth: mediaBreakpoints.mdMediaEnd,
        // });

        useEffect(() => {
            if (headerRef?.current) {
                setHeaderHeight(
                    Math.ceil(headerRef.current.getBoundingClientRect().height),
                );
            }
        }, [headerRef?.current]);

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
                            <MediaQuery maxWidth={mediaBreakpoints.smMediaEnd}>
                                <ButtonPrimary
                                    color={EButtonColor.transparent}
                                    onClick={() =>
                                        setHeaderDrawerVisible(
                                            !headerDrawerVisible,
                                        )
                                    }
                                    className={cn(`${classPrefix}_drawer-btn`)}
                                >
                                    <IconBurger color={ColorTheme.blue._700} />
                                </ButtonPrimary>
                            </MediaQuery>
                            <MediaQuery minWidth={mediaBreakpoints.mdMedia}>
                                <div className={cn(`${classPrefix}_logo`)}>
                                    <Link href={PATH_HOME_PAGE}>
                                        <LogoMain />
                                    </Link>
                                </div>
                                <NavLinks
                                    wrapperClassPrefix={classPrefix}
                                    placement="header"
                                />
                            </MediaQuery>
                        </div>
                        <NavActions
                            wrapperClassPrefix={classPrefix}
                            placement="header"
                        />
                    </Container>
                </div>
            </header>
        );
    }),
);

export default Header;
