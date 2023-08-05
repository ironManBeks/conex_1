import { FC, ReactNode } from "react";
import cn from "classnames";

import { H2 } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import FieldRadioArrayController from "@components/form/formControllers/FieldRadioArrayController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import BuilderElementCard from "./elements/BuilderElementCard";

import {
    EBuilderFieldTypes,
    TBuilderElements,
    TBuilderFieldBase,
} from "../types";

const BuilderField: FC<TBuilderFieldBase> = ({
    className,
    type,
    title,
    titleSize,
    value,
    elements,
}) => {
    const classPrefix = `builder-field`;

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            {title && (
                <H2
                    className={cn(`${classPrefix}_title`, {
                        [`_${titleSize}`]: titleSize,
                    })}
                >
                    {title}
                </H2>
            )}
            <div className={`${classPrefix}_content`}>
                {getElementsListByType({
                    type,
                    elements,
                    fieldValue: value,
                })}
            </div>
        </div>
    );
};

export default BuilderField;

const getElementsListByType = ({
    type,
    elements,
    fieldValue,
}: TBuilderElements & { fieldValue: string }): ReactNode => {
    switch (type) {
        case EBuilderFieldTypes.card:
            return elements.map((item) => (
                <BuilderElementCard
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    title={item.title}
                    popular={item.popular}
                    disabled={item.disabled}
                    subTitle={item.subTitle}
                    imgSrc={item.imgSrc}
                    price={item.price}
                    currency={item.currency}
                    fieldValue={fieldValue}
                />
            ));
        case EBuilderFieldTypes.checkbox:
            return (
                <FieldCheckboxArrayController
                    name={fieldValue}
                    options={elements.map((item) => ({
                        label: item.title,
                        value: item.value,
                        disabled: item.disabled,
                    }))}
                />
            );
        case EBuilderFieldTypes.radio:
            return (
                <FieldRadioArrayController
                    name={fieldValue}
                    options={elements.map((item) => ({
                        label: item.title,
                        value: item.value,
                        disabled: item.disabled,
                    }))}
                />
            );
        case EBuilderFieldTypes.radioButton:
            return (
                <FieldRadioButtonArrayController
                    name={fieldValue}
                    options={elements.map((item) => ({
                        label: item.title,
                        value: item.value,
                        disabled: item.disabled,
                    }))}
                />
            );
        default:
            return <></>;
    }
};
