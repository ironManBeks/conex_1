import React from "react";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";

import Tooltip from "@components/globalComponents/Tooltip";
import Spin from "@components/globalComponents/Spin";

import { commonButtonClassPrefix } from "./consts";
import { EButtonColor, EButtonSize, TButtonPrimary } from "./types";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";

const ButtonPrimary: React.FC<TButtonPrimary> = ({
    children,
    className,
    color = EButtonColor.default,
    size = EButtonSize.md,
    type = "button",
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    tooltipText,
    tooltipClassName,
    onClick,
    value,
    changeSizeOnMobile = true,
    style,
}) => {
    const isMobile = useMediaQuery({
        minWidth: mediaBreakpoints.xsMedia,
        maxWidth: mediaBreakpoints.smMediaEnd,
    });

    const buttonContent = (
        <button
            style={style}
            type={type}
            className={cn(
                `${commonButtonClassPrefix}`,
                "_primary",
                className,
                `__${color}`,
                `__${isMobile && changeSizeOnMobile ? EButtonSize.md : size}`,
                {
                    __disabled: disabled,
                    __loading: isLoading,
                    __notText: !children || children === "",
                    __icon: leftIcon || rightIcon,
                },
            )}
            disabled={disabled}
            onClick={onClick}
            value={value}
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
                {isLoading ? <Spin /> : children}
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
