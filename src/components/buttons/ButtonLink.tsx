import React, { JSX } from "react";
import cn from "classnames";
import Link from "next/link";
import { Tooltip } from "antd";

import { commonButtonClassPrefix } from "@components/buttons/consts";

import { TButtonLink } from "./types";
import { EButtonColor, EButtonSize } from "./types";

const ButtonLink: React.FC<TButtonLink> = ({
    children,
    className,
    color = EButtonColor.default,
    size = EButtonSize.md,
    disabled = false,
    href,
    leftIcon,
    rightIcon,
    target,
    tooltipText,
    tooltipClassName,
    style,
    isLinkSimple = false,
}): JSX.Element => {
    const buttonContent = (
        <a
            className={cn(
                `${commonButtonClassPrefix}`,
                "_link",
                className,
                `__${color}`,
                `__${size}`,
                {
                    __disabled: disabled,
                    __notText: !children || children === "",
                    __icon: leftIcon || rightIcon,
                },
            )}
            target={target || "_self"}
            rel="noreferrer"
            style={style}
            href={isLinkSimple ? href : undefined}
        >
            <>
                {leftIcon && (
                    <span
                        className={cn(
                            `${commonButtonClassPrefix}_icon`,
                            "_left",
                        )}
                    >
                        {leftIcon}
                    </span>
                )}
                {children}
                {rightIcon && (
                    <span
                        className={cn(
                            `${commonButtonClassPrefix}_icon`,
                            "_right",
                        )}
                    >
                        {rightIcon}
                    </span>
                )}
            </>
        </a>
    );

    return isLinkSimple ? (
        buttonContent
    ) : tooltipText ? (
        <Link href={href}>
            <Tooltip
                placement="top"
                title={tooltipText}
                className={tooltipClassName}
            >
                {buttonContent}
            </Tooltip>
        </Link>
    ) : (
        <Link href={href}>{buttonContent}</Link>
    );
};

export default ButtonLink;
