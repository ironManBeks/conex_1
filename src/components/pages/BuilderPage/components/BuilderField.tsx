import { FC, ReactNode } from "react";
import cn from "classnames";

import { H2, P } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import FieldRadioArrayController from "@components/form/formControllers/FieldRadioArrayController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import BuilderElementCard from "./elements/BuilderElementCard";

import { TBuilderFieldBase } from "../types";
import {
    EBuilderFieldTypes,
    TBuilderElementDataDTO,
} from "@store/stores/builder/types";
import BuilderElementColorPicker from "@components/pages/BuilderPage/components/elements/BuilderElementColorPicker";

const BuilderField: FC<TBuilderFieldBase> = ({ id, attributes, className }) => {
    const classPrefix = `builder-field`;
    const {
        fieldType,
        fieldName,
        fieldTitle,
        fieldTitleSize,
        fieldElements,
        fieldRequired,
    } = attributes;
    return (
        <div
            className={cn(`${classPrefix}_wrapper`, className, {
                _required: fieldRequired,
            })}
        >
            {fieldName && (
                <P>
                    <b>Field name:</b> {fieldName}
                </P>
            )}
            {fieldType && (
                <P>
                    <b>Field type:</b> {fieldType}
                </P>
            )}
            {fieldName && (
                <P>
                    <b>Step ID:</b> {id}
                </P>
            )}
            {fieldTitle && (
                <H2
                    className={cn(`${classPrefix}_title`, {
                        [`_${fieldTitleSize}`]: fieldTitleSize,
                    })}
                >
                    {fieldTitle}
                </H2>
            )}
            <div className={`${classPrefix}_content`}>
                {/*// ToDo remove ts-ignore*/}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*// @ts-ignore*/}
                {getElementsListByType({
                    type: fieldType,
                    elements: fieldElements,
                    fieldName: fieldName,
                })}
            </div>
        </div>
    );
};

export default BuilderField;

const getElementsListByType = ({
    type,
    elements,
    fieldName,
}: {
    type: EBuilderFieldTypes;
    elements: TBuilderElementDataDTO[];
    fieldName: string;
}): ReactNode => {
    switch (type) {
        case EBuilderFieldTypes.card:
            return elements.map((item) => (
                <BuilderElementCard
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    mainTitle={item.mainTitle}
                    popular={item.popular}
                    subTitle={item.subTitle}
                    price={item.price}
                    priceCurrency={item.priceCurrency}
                    fieldName={fieldName}
                    nextQuestion={item.nextQuestion}
                    imgSrc={item.image?.url}
                    // disabled={item.disabled}
                />
            ));
        case EBuilderFieldTypes.checkbox:
            return (
                <FieldCheckboxArrayController
                    name={fieldName}
                    options={elements.map((item) => ({
                        label: `${item.mainTitle}. NEXT: ${
                            item.nextQuestion || "null"
                        }`,
                        value: item.value,
                        // disabled: item.disabled,
                    }))}
                    showError={false}
                />
            );
        case EBuilderFieldTypes.radio:
            return (
                <FieldRadioArrayController
                    name={fieldName}
                    options={elements.map((item) => ({
                        label: `${item.mainTitle}. NEXT: ${
                            item.nextQuestion || "null"
                        }`,
                        value: item.value,
                        // disabled: item.disabled,
                    }))}
                    showError={false}
                />
            );
        case EBuilderFieldTypes.radioButton:
            return (
                <FieldRadioButtonArrayController
                    name={fieldName}
                    options={elements.map((item) => ({
                        label: (
                            <div>
                                {item.mainTitle}
                                {item.subTitle && (
                                    <>
                                        <br />
                                        {item.subTitle}
                                    </>
                                )}
                                {item.price && (
                                    <>
                                        <br />
                                        <b>
                                            {item.price}
                                            {item.priceCurrency}
                                        </b>
                                    </>
                                )}
                                {item.nextQuestion && (
                                    <b>
                                        <br />
                                        nextId: {item.nextQuestion || "null"}
                                    </b>
                                )}
                            </div>
                        ),
                        value: item.value,
                        // disabled: item.disabled,
                    }))}
                    showError={false}
                />
            );
        case EBuilderFieldTypes.colorPicker:
            return elements.map((item) => (
                <BuilderElementColorPicker
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    mainTitle={item.mainTitle}
                    popular={item.popular}
                    subTitle={item.subTitle}
                    price={item.price}
                    priceCurrency={item.priceCurrency}
                    fieldName={fieldName}
                    nextQuestion={item.nextQuestion}
                    color={null}
                    // disabled={item.disabled}
                />
            ));
        default:
            return <></>;
    }
};
