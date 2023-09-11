import { FC } from "react";
import cn from "classnames";
import { isFunction } from "lodash";
import { Controller, useFormContext } from "react-hook-form";

import { H4, H5, P } from "@components/Text";

import { BUILDER_ELEMENT_CLASSNAME } from "../../consts";
import {
    IBuilderElementBase,
    TBuilderElementComp,
} from "@components/pages/BuilderPage/types";
import { isColorHex } from "@helpers/checkHelper";

const BuilderElementColorPicker: FC<
    IBuilderElementBase & TBuilderElementComp
> = ({
    className,
    mainTitle,
    value,
    subTitle,
    price,
    priceCurrency,
    popular,
    onClick,
    fieldName,
    nextQuestion,
    color,
}) => {
    const classPrefix = `builder-element-color-picker`;
    const {
        control,
        getValues,
        formState: { errors },
    } = useFormContext();
    const errorMessage = errors[fieldName]?.message;

    const getIsActive = (
        value: string | number | null | undefined,
    ): boolean => {
        const fieldValues = getValues();
        if (fieldValues[fieldName]) {
            return fieldValues[fieldName].includes(value);
        }
        return false;
    };

    return (
        <Controller
            name={fieldName}
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
                            <div
                                className={`${classPrefix}_field`}
                                style={{
                                    background: isColorHex(color)
                                        ? color
                                        : "none",
                                }}
                            />
                            {mainTitle && (
                                <H4 className={`${classPrefix}_title`}>
                                    {mainTitle}
                                </H4>
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

export default BuilderElementColorPicker;
