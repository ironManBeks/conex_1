import { FC } from "react";
import cn from "classnames";
import { isFunction } from "lodash";

import { H4, H5, P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { BUILDER_ELEMENT_CLASSNAME } from "../../consts";
import { TBuilderElementCard } from "../../types";

const BuilderElementCard: FC<TBuilderElementCard & { isActive: boolean }> = ({
    className,
    title,
    value,
    subTitle,
    imgSrc,
    price,
    currency,
    isActive,
    onClick,
}) => {
    const classPrefix = `builder-element-card`;

    const handleClick = () => {
        if (isFunction(onClick)) {
            onClick(value);
        }
    };

    return (
        <div
            className={cn(
                `${classPrefix}_wrapper`,
                BUILDER_ELEMENT_CLASSNAME,
                className,
                { _active: isActive },
            )}
        >
            <div
                className={cn(`${classPrefix}_inner-wrapper`)}
                onClick={handleClick}
            >
                {title && <H4 className={`${classPrefix}_title`}>{title}</H4>}
                {imgSrc && <ImgWrapper src={imgSrc} height={220} />}
                {subTitle && <H5>{subTitle}</H5>}
                {price && (
                    <P>
                        {price}
                        {currency}
                    </P>
                )}
            </div>
        </div>
    );
};

export default BuilderElementCard;
