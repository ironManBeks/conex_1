import React, { JSX } from "react";
import cn from "classnames";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Tooltip from "@components/globalComponents/Tooltip";

import { commonButtonClassPrefix } from "@components/buttons/consts";

import { EButtonColor, EButtonSize, TButtonLink } from "./types";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";

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
    const isMobile = useMediaQuery({
        minWidth: mediaBreakpoints.xsMedia,
        maxWidth: mediaBreakpoints.smMediaEnd,
    });

    const linkParams = {
        className: cn(
            `${commonButtonClassPrefix}`,
            "_link",
            className,
            `__${color}`,
            `__${isMobile ? EButtonSize.md : size}`,
            {
                __disabled: disabled,
                __notText: !children || children === "",
                __icon: leftIcon || rightIcon,
            },
        ),
        target: target || "_self",
        rel: "noreferrer",
        style: style,
    };

    const buttonContent = (
        <>
            {leftIcon && (
                <span
                    className={cn(`${commonButtonClassPrefix}_icon`, "_left")}
                >
                    {leftIcon}
                </span>
            )}
            {children}
            {rightIcon && (
                <span
                    className={cn(`${commonButtonClassPrefix}_icon`, "_right")}
                >
                    {rightIcon}
                </span>
            )}
        </>
    );

    return isLinkSimple ? (
        <a {...linkParams}>{buttonContent}</a>
    ) : tooltipText ? (
        <Link href={href} {...linkParams}>
            <Tooltip
                placement="top"
                title={tooltipText}
                className={tooltipClassName}
            >
                {buttonContent}
            </Tooltip>
        </Link>
    ) : (
        <Link href={href} {...linkParams}>
            {buttonContent}
        </Link>
    );
};

export default ButtonLink;
