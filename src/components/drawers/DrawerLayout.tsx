import React, { useEffect } from "react";
import { Drawer } from "antd";
import cn from "classnames";

import { IconCross } from "@components/Icons";
import { H3, H4 } from "@components/Text";

import disableBodyScroll from "@helpers/disableBodyScroll";
import { COLOR_BLACK } from "@assets/theme/colorTheme";
import { TDrawerLayout } from "./types";
import { useRouter } from "next/router";
import { isFunction } from "lodash";

const DrawerLayout: React.FC<TDrawerLayout> = (props) => {
    const {
        closeDrawer,
        title,
        subTitle,
        headContent,
        bodyContent,
        footerContent,
        maskStyle,
        headClassName,
        bodyClassName,
        footerClassName,
        isCloseBtn = true,
        className,
        maskZIndex,
        wrapperClassName,
        open,
        closeOnChangePath = true,
        rootClassName,
        ...rest
    } = props;
    const router = useRouter();
    const classPrefix = "common-drawer";
    const maskStyles = {
        zIndex: maskZIndex,
        maskStyle,
    };

    const closeButton = isCloseBtn ? (
        <button className={`${classPrefix}_close`} onClick={closeDrawer}>
            <IconCross color={COLOR_BLACK} />
        </button>
    ) : null;

    const headerSection = headContent ? (
        headContent
    ) : title ? (
        <>
            <H3 className={`${classPrefix}_header__title`}>{title}</H3>
            {subTitle && (
                <H4 className={`${classPrefix}_header__sub-title`}>
                    {subTitle}
                </H4>
            )}
        </>
    ) : null;

    useEffect(() => {
        disableBodyScroll(open);
    }, [open]);

    useEffect(() => {
        if (router.asPath && isFunction(closeDrawer) && closeOnChangePath) {
            closeDrawer();
        }
    }, [router.asPath]);

    return (
        <Drawer
            {...rest}
            title={null}
            footer={null}
            onClose={closeDrawer}
            open={open}
            maskStyle={maskStyles}
            className={cn(
                `${classPrefix}_wrapper`,
                className,
                wrapperClassName,
            )}
            rootClassName={cn(`${classPrefix}_root`, rootClassName)}
            closeIcon={<IconCross />}
        >
            <div className={`${classPrefix}_content__wrapper`}>
                {closeButton}
                {headerSection && (
                    <div
                        className={cn(
                            `${classPrefix}_header__wrapper`,
                            headClassName,
                        )}
                    >
                        {headerSection}
                    </div>
                )}
                {bodyContent && (
                    <div
                        className={cn(
                            `${classPrefix}_body__wrapper`,
                            bodyClassName,
                        )}
                    >
                        {bodyContent}
                    </div>
                )}
                {footerContent && (
                    <div
                        className={cn(
                            `${classPrefix}_footer__wrapper`,
                            footerClassName,
                        )}
                    >
                        {footerContent}
                    </div>
                )}
            </div>
        </Drawer>
    );
};

export default DrawerLayout;
