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
    isSticky = false,
}) => {
    const maskStyles = {
        zIndex: maskZIndex,
        maskStyle,
    };

    const closeButton = isCloseBtn ? (
        <button className="custom-modal_close" onClick={handleCancel}>
            <IconCross color={COLOR_BLACK} />
        </button>
    ) : (
        <></>
    );

    const headerSection = headContent ? (
        headContent
    ) : title ? (
        <>
            <H3 className="custom-modal_header__title">{title}</H3>
            {subTitle && (
                <H4 className="custom-modal_header__sub-title">{subTitle}</H4>
            )}
        </>
    ) : (
        <></>
    );

    useEffect(() => {
        disableBodyScroll(modalVisible);
    }, [modalVisible]);

    return (
        <Modal
            open={modalVisible}
            onCancel={handleCancel}
            title={null}
            footer={null}
            rootClassName={cn(
                "custom-modal_wrapper",
                wrapperClassName,
                modalSize,
                { _sticky: isSticky },
            )}
            wrapClassName={cn("custom-modal_inner-wrapper")}
            maskStyle={maskStyles}
            style={wrapperStyles}
            forceRender={forceRender}
        >
            <div className="custom-modal_content__wrapper">
                {closeButton}
                {headerSection && (
                    <div
                        className={cn(
                            "custom-modal_header__wrapper",
                            headClassName,
                        )}
                    >
                        {headerSection}
                    </div>
                )}
                {bodyContent && (
                    <div
                        className={cn(
                            "custom-modal_body__wrapper",
                            bodyClassName,
                        )}
                    >
                        {bodyContent}
                    </div>
                )}
                {footerContent && (
                    <div
                        className={cn(
                            "custom-modal_footer__wrapper",
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
