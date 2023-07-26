import { FC } from "react";
import cn from "classnames";

import { H2 } from "@components/Text";

import { TOrderSettingsLayout } from "./types";

const OrderSettingsLayout: FC<TOrderSettingsLayout> = ({
    className,
    title,
    headContent,
    bodyContent,
    footerContent,
    footerActions,
}) => {
    const classPrefix = `order-settings-layout`;
    return (
        <div
            className={cn(`${classPrefix}_wrapper`, className, {
                _title: title,
            })}
        >
            {title && <H2>{title}</H2>}
            <div className={`${classPrefix}_inner-wrapper`}>
                {headContent && (
                    <div className={`${classPrefix}_head`}>{headContent}</div>
                )}
                {bodyContent && (
                    <div className={`${classPrefix}_body`}>{bodyContent}</div>
                )}
                {footerContent && (
                    <div className={`${classPrefix}_footer`}>
                        {footerContent}
                    </div>
                )}
                {footerActions && (
                    <div className={`${classPrefix}_actions`}>
                        {footerActions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderSettingsLayout;
