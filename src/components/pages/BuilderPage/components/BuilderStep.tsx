import { FC, ReactNode } from "react";
import cn from "classnames";

import { H3, P } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import FieldRadioArrayController from "@components/form/formControllers/FieldRadioArrayController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import BuilderElementCard from "./elements/BuilderElementCard";

import { TBuilderStepBase } from "../types";
import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    IBuilderFieldDataDTO,
} from "@store/builder/types";
import BuilderElementColorPicker from "@components/pages/BuilderPage/components/elements/BuilderElementColorPicker";
import { TNullable } from "@globalTypes/commonTypes";

const BuilderStep: FC<TBuilderStepBase> = ({ id, attributes, className }) => {
    const classPrefix = `builder-step`;
    const {
        fieldType,
        fieldName,
        fieldTitle,
        fieldTitleSize,
        subQuestions,
        fieldRequired,
    } = attributes;
    const isMultiField = fieldType === EBuilderFieldTypes.multiple;

    return (
        <div
            className={cn(`${classPrefix}_wrapper`, className, {
                _required: fieldRequired,
            })}
        >
            <div>
                {id && <div>id: {id}</div>}
                {fieldType && <div>Type: {fieldType}</div>}
                {fieldRequired && (
                    <div>Required: {fieldRequired.toString()}</div>
                )}
            </div>
            {fieldTitle && (
                <H3
                    className={cn(`${classPrefix}_title`, {
                        [`_${fieldTitleSize}`]: fieldTitleSize,
                    })}
                >
                    {fieldTitle}
                </H3>
            )}
            <div className={`${classPrefix}_content`}>
                {isMultiField ? (
                    <>
                        {subQuestions.map(
                            // ToDo Remove ts-ignore
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            (item: IBuilderFieldDataDTO, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            `${classPrefix}_field__wrapper`,
                                            "_multi",
                                        )}
                                    >
                                        {item.title && (
                                            <H3
                                                className={cn(
                                                    `${classPrefix}_title`,
                                                    "_small",
                                                )}
                                            >
                                                {item.title}
                                            </H3>
                                        )}
                                        <div
                                            className={`${classPrefix}_elements__list`}
                                        >
                                            {getElementsListByType({
                                                type: item.fieldType,
                                                elements: item.questions,
                                                fieldName: fieldName + item.id,
                                            })}
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </>
                ) : (
                    <div className={`${classPrefix}_field__wrapper`}>
                        <div className={`${classPrefix}_elements__list`}>
                            {getElementsListByType({
                                type: fieldType,
                                // ToDo Remove ts-ignore
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                elements: subQuestions,
                                fieldName: fieldName,
                            })}
                        </div>
                    </div>
                )}
            </div>
            {/*{stepDescription && (*/}
            {/*    <div className={`${classPrefix}__description`}>*/}
            {/*        <P>{stepDescription}</P>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default BuilderStep;

const getElementsListByType = ({
    type,
    elements,
    fieldName,
}: {
    type: EBuilderFieldTypes;
    elements: IBuilderElementDataDTO[];
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
                    default={item.default}
                    // disabled={item.disabled}
                />
            ));
        case EBuilderFieldTypes.checkbox:
            return (
                <FieldCheckboxArrayController
                    name={fieldName}
                    options={elements.map((item) => ({
                        label: (
                            <LabelContent
                                title={item.mainTitle}
                                subTitle={item.subTitle}
                                price={item.price}
                                priceCurrency={item.priceCurrency}
                            />
                        ),
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
                        label: `${item.mainTitle}`,
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
                            <LabelContent
                                title={item.mainTitle}
                                subTitle={item.subTitle}
                                price={item.price}
                                priceCurrency={item.priceCurrency}
                            />
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
                    default={item.default}
                    // disabled={item.disabled}
                />
            ));
        default:
            return <></>;
    }
};

const LabelContent: FC<{
    title: string;
    subTitle: TNullable<string>;
    price: number;
    priceCurrency: string;
}> = ({ title, subTitle, priceCurrency, price }) => {
    return (
        <>
            {title && <P className="title">{title}</P>}
            {subTitle && <P className="sub-title">{subTitle}</P>}
            {price && (
                <P className="price">
                    <b>
                        {price}
                        {priceCurrency}
                    </b>
                </P>
            )}
        </>
    );
};