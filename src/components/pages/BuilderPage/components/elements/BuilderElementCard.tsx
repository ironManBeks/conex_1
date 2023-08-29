import { FC, useCallback, useEffect } from "react";
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

import { BUILDER_ELEMENT_CLASSNAME, BUILDER_VALUE_NONE } from "../../consts";
import {
    IBuilderElementCardProps,
    TBuilderElementComp,
} from "@components/pages/BuilderPage/types";

const BuilderElementCard: FC<
    IBuilderElementCardProps & TBuilderElementComp
> = ({
    className,
    mainTitle,
    value,
    subTitle,
    imgSrc,
    price,
    priceCurrency,
    popular,
    onClick,
    fieldName,
}) => {
    const classPrefix = `builder-element-card`;
    const {
        control,
        getValues,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[fieldName]?.message;

    const getIsActive = useCallback(
        (value: string | number | null | undefined) => {
            const fieldValues = getValues();
            if (fieldValues[fieldName]) {
                return fieldValues[fieldName] === value;
            }
            return false;
        },
        [getValues],
    );

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                // console.log("field", field.name);
                return (
                    <div
                        className={cn(
                            `${classPrefix}_wrapper`,
                            `${BUILDER_ELEMENT_CLASSNAME}_wrapper`,
                            className,
                            { _active: getIsActive(value) },
                            { _popular: popular },
                            { _none: value === BUILDER_VALUE_NONE },
                            // { _disabled: disabled },
                        )}
                    >
                        <div
                            className={cn(`${classPrefix}_inner-wrapper`)}
                            onClick={() => {
                                field.onChange(value);
                                if (isFunction(onClick)) {
                                    onClick(value);
                                }
                            }}
                        >
                            {mainTitle && (
                                <H4 className={`${classPrefix}_title`}>
                                    {mainTitle}
                                </H4>
                            )}
                            {imgSrc && (
                                <ImgWrapper
                                    src={imgSrc}
                                    height={220}
                                    alt={`image: ${mainTitle}`}
                                    title={mainTitle}
                                />
                            )}
                            {subTitle && <H5>{subTitle}</H5>}
                            {!!price && (
                                <P>
                                    {price}
                                    {priceCurrency}
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
