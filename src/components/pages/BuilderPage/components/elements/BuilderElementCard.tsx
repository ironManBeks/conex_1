import { FC, useEffect } from "react";
import cn from "classnames";
import { isFunction } from "lodash";
import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from "react-hook-form";

import { H4, H5, P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { BUILDER_ELEMENT_CLASSNAME } from "../../consts";
import {
    IBuilderElementCardProps,
    TBuilderElementComp,
} from "@components/pages/BuilderPage/types";

const BuilderElementCard: FC<
    IBuilderElementCardProps & TBuilderElementComp
> = ({
    className,
    title,
    value,
    subTitle,
    imgSrc,
    price,
    currency,
    popular,
    disabled,
    onClick,
    fieldValue,
}) => {
    const classPrefix = `builder-element-card`;
    const {
        control,
        getValues,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[fieldValue]?.message;

    const getIsActive = (
        value: string | number | null | undefined,
    ): boolean => {
        const fieldValues = getValues();
        if (fieldValues[fieldValue]) {
            return fieldValues[fieldValue].includes(value);
        }
        return false;
    };

    return (
        <Controller
            name={fieldValue}
            control={control}
            render={({ field }) => {
                return (
                    <div
                        className={cn(
                            `${classPrefix}_wrapper`,
                            `${BUILDER_ELEMENT_CLASSNAME}_wrapper`,
                            className,
                            { _active: getIsActive(value) },
                            { _popular: popular },
                            { _disabled: disabled },
                        )}
                    >
                        <div
                            className={cn(`${classPrefix}_inner-wrapper`)}
                            onClick={() => {
                                if (!disabled) {
                                    field.onChange(value);
                                    if (isFunction(onClick)) {
                                        onClick(value);
                                    }
                                }
                            }}
                        >
                            {title && (
                                <H4 className={`${classPrefix}_title`}>
                                    {title}
                                </H4>
                            )}
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
            }}
        />
    );
};

export default BuilderElementCard;
