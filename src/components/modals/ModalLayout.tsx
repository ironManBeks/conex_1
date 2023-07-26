import React, { useEffect } from "react";
import { Modal } from "antd";
import cn from "classnames";

import { IconCross } from "@components/Icons";

import { COLOR_BLACK } from "@common/theme/colorTheme";
import disableBodyScroll from "@helpers/disableBodyScroll";

import { EModalSize, TModalLayout } from "./types";
import { H3, H4 } from "@components/Text";

const ModalLayout: React.FC<TModalLayout> = ({
    handleCancel,
    modalVisible,
    modalSize = EModalSize.lg,
    title,
    subTitle,
    wrapperClassName,
    headContent,
    bodyContent,
    footerContent,
    maskStyle,
    wrapperStyles,
    headClassName,
    bodyClassName,
    footerClassName,
    isCloseBtn = true,
    forceRender = false,
    maskZIndex,
}) => {
    const classPrefix = "common-modal";
    const maskStyles = {
        zIndex: maskZIndex,
        maskStyle,
    };

    const closeButton = isCloseBtn ? (
        <button className={`${classPrefix}_close`} onClick={handleCancel}>
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
        disableBodyScroll(modalVisible);
    }, [modalVisible]);

    return (
        <Modal
            open={modalVisible}
            onCancel={handleCancel}
            title={null}
            footer={null}
            className={cn(`${classPrefix}_inner-wrapper`, modalSize)}
            wrapClassName={cn(`${classPrefix}_wrapper`, wrapperClassName)}
            maskStyle={maskStyles}
            style={wrapperStyles}
            forceRender={forceRender}
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
        </Modal>
    );
};

export default ModalLayout;
