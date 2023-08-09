import React, { useEffect } from "react";
import { Drawer } from "antd";
import cn from "classnames";

import { IconCross } from "@components/Icons";
import { H3, H4 } from "@components/Text";

import disableBodyScroll from "@helpers/disableBodyScroll";
import { COLOR_BLACK } from "@common/theme/colorTheme";
import { TDrawerLayout } from "./types";

const DrawerLayout: React.FC<TDrawerLayout> = (props) => {
    const {
        onClose,
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
        ...rest
    } = props;
    const classPrefix = "common-drawer";
    const maskStyles = {
        zIndex: maskZIndex,
        maskStyle,
    };

    const closeButton = isCloseBtn ? (
        <button className={`${classPrefix}_close`} onClick={onClose}>
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

    return (
        <Drawer
            {...rest}
            title={null}
            footer={null}
            onClose={onClose}
            open={open}
            maskStyle={maskStyles}
            className={cn(
                `${classPrefix}_wrapper`,
                className,
                wrapperClassName,
            )}
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
