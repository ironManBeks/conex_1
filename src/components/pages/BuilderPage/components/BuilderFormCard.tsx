import { FC } from "react";
import cn from "classnames";

import { H4, H5, P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TBuilderFormCard } from "../types";
import { isFunction } from "lodash";

const BuilderFormCard: FC<TBuilderFormCard> = ({
    wrapperClassPrefix,
    wrapperStyles,
    value,
    onClick,
    isActive,
    title,
    subTitle,
    subInfo,
    src,
}) => {
    const classPrefix = `${wrapperClassPrefix}__item`;
    return (
        <div
            className={cn(`${classPrefix} _wrapper`, { _active: isActive })}
            style={wrapperStyles}
        >
            <div
                className={cn(`${classPrefix} _inner-wrapper`, {
                    _active: isActive,
                })}
                onClick={() => isFunction(onClick) && onClick(value)}
            >
                {title && <H4>{title}</H4>}
                {src && <ImgWrapper src={src} height={220} />}
                {subTitle && <H5>{subTitle}</H5>}
                {subInfo && <P>{subInfo}</P>}
            </div>
        </div>
    );
};

export default BuilderFormCard;
