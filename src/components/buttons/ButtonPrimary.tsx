import React from "react";
import cn from "classnames";
import { Tooltip } from "antd";

import { commonButtonClassPrefix } from "./consts";

import { EButtonColor, EButtonSize, TButtonPrimary } from "./types";

const ButtonPrimary: React.FC<TButtonPrimary> = ({
    children,
    className,
    color = EButtonColor.default,
    size = EButtonSize.md,
    type = "button",
    withShadow = true,
    isOutline = false,
    isLoading = false,
    disabled = false,
    icon,
    iconPosition = "left",
    tooltipText,
    tooltipClassName,
    onClick,
    value,
    style,
}) => {
    const buttonContent = (
        <button
            style={style}
            type={type}
            className={cn(
                `${commonButtonClassPrefix}`,
                "_primary",
                className,
                `__${color}`,
                `__${size}`,
                {
                    __shadow: withShadow,
                    __disabled: disabled,
                    __outline: isOutline,
                    __loading: isLoading,
                    __notText: !children || children === "",
                    __icon: icon,
                },
            )}
            disabled={disabled}
            onClick={onClick}
            value={value}
        >
            <>
                {icon && iconPosition === "left" && (
                    <span
                        className={cn(
                            `${commonButtonClassPrefix}_icon`,
                            "_left",
                        )}
                    >
                        {icon}
                    </span>
                )}
                {children}
                {icon && iconPosition === "right" && (
                    <span
                        className={cn(
                            `${commonButtonClassPrefix}_icon`,
                            "_right",
                        )}
                    >
                        {icon}
                    </span>
                )}
            </>
        </button>
    );

    return tooltipText ? (
        <Tooltip
            placement="top"
            title={tooltipText}
            className={tooltipClassName}
        >
            {buttonContent}
        </Tooltip>
    ) : (
        buttonContent
    );
};

export default ButtonPrimary;
