import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { isEmpty, isEqual } from "lodash";
import { useFormContext } from "react-hook-form";
import { inject, observer } from "mobx-react";

import { H3, P } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import FieldRadioArrayController from "@components/form/formControllers/FieldRadioArrayController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import BuilderElementCard from "./elements/BuilderElementCard";
import BuilderElementColorPicker from "./elements/BuilderElementColorPicker";
import ModalConfirm from "@components/modals/components/ModalConfirm";

import {
    convertBuilderFieldName,
    getBuilderStepDefaultValues,
    getDefaultValuesFromResultDoorData,
} from "@helpers/builderHelper";
import { TNullable } from "@globalTypes/commonTypes";
import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    IBuilderFieldDataDTO,
} from "@store/builder/types";
import { TBuilderStepBase } from "../types";
import { IRoot } from "@store/store";
import { BUILDER_VALUE_NONE } from "@components/pages/BuilderPage/consts";
import { EButtonColor } from "@components/buttons/types";
import { toJS } from "mobx";

const BuilderStep: FC<TBuilderStepBase> = inject("store")(
    observer(({ store, className }) => {
        const { builderStore, commonStore } = store as IRoot;
        const { resultDoorData, currentStepData } = builderStore;
        const { setModalConfirmVisible } = commonStore;
        if (isEmpty(currentStepData)) return null;
        const {
            fieldType,
            fieldName,
            fieldTitle,
            fieldTitleSize,
            subQuestions,
            fieldRequired,
        } = currentStepData?.attributes;

        const [confirmToChange, setConfirmToChange] = useState(false);

        const classPrefix = `builder-step`;
        const isMultiStep = fieldType === EBuilderFieldTypes.multiple;
        const { setValue, setFocus, trigger, watch } = useFormContext();

        const resultDefaultValues = useCallback(() => {
            return getDefaultValuesFromResultDoorData(
                currentStepData?.id,
                resultDoorData,
            );
        }, [resultDoorData, currentStepData?.id]);

        useEffect(() => {
            const builderDefaultValues = getBuilderStepDefaultValues(
                currentStepData.id,
                currentStepData.attributes,
            );

            // const resultDefaultValues = getDefaultValuesFromResultDoorData(
            //     currentStepData?.id,
            //     resultDoorData,
            // );

            const newDefaultValues = resultDefaultValues()
                ? resultDefaultValues()
                : builderDefaultValues;

            if (!isEmpty(newDefaultValues)) {
                for (const key in newDefaultValues) {
                    setValue(key, newDefaultValues[key]);
                    setFocus(key);
                    trigger();
                }
            }
        }, [currentStepData.id]);

        // const fieldNamesOnCurrentStep: string[] = isMultiStep
        //     ? subQuestions.map((item) =>
        //           convertBuilderFieldName(
        //               currentStepData.id,
        //               item.subfieldName || "",
        //           ),
        //       )
        //     : [convertBuilderFieldName(currentStepData.id, fieldName)];
        //
        // const watchOnStepFields = watch(fieldNamesOnCurrentStep);
        //
        // useEffect(() => {
        //     const newDefaultValues = resultDefaultValues();
        //
        //     if (newDefaultValues && watchOnStepFields) {
        //         const isEqualArrays = isEqual(
        //             Object.values(newDefaultValues),
        //             watchOnStepFields,
        //         );
        //         console.log("isEqualArrays", isEqualArrays);
        //     }
        //     // setConfirmToChange(true);
        // }, [watchOnStepFields]);
        //
        // useEffect(() => {
        //     if (confirmToChange) {
        //         setModalConfirmVisible(true);
        //     }
        // }, [confirmToChange]);
        //
        // const resetValuesAfter = () => {
        //     console.log("resetValuesAfter_______");
        // };

        return (
            <div
                className={cn(`${classPrefix}_wrapper`, className, {
                    _required: fieldRequired,
                })}
            >
                {<b>id: {currentStepData?.id}</b>}

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
                    {isMultiStep ? (
                        <>
                            {subQuestions.map(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                (item: IBuilderFieldDataDTO, index) => {
                                    console.log(
                                        "fieldTitleSize",
                                        fieldTitleSize,
                                    );
                                    return (
                                        <div
                                            key={index}
                                            className={cn(
                                                `${classPrefix}_field__wrapper`,
                                                "_multi",
                                            )}
                                            style={{
                                                width: item.fieldWidth
                                                    ? `${item.fieldWidth}%`
                                                    : "100%",
                                            }}
                                        >
                                            {item.fieldTitle && (
                                                <H3
                                                    className={cn(
                                                        `${classPrefix}_title`,
                                                        {
                                                            [`_${item.fieldTitleSize}`]:
                                                                item.fieldTitleSize,
                                                        },
                                                    )}
                                                >
                                                    {item.fieldTitle}
                                                </H3>
                                            )}
                                            <div
                                                className={`${classPrefix}_elements__list`}
                                            >
                                                {getElementsListByType({
                                                    type: item.fieldType,
                                                    elements: item.questions,
                                                    fieldName:
                                                        convertBuilderFieldName(
                                                            currentStepData.id,
                                                            item.subfieldName ||
                                                                "",
                                                        ),
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
                                    fieldName: convertBuilderFieldName(
                                        currentStepData.id,
                                        fieldName,
                                    ),
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
    }),
);

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
                    subfieldName={item.subfieldName}
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
                    }))}
                    showError={false}
                />
            );
        case EBuilderFieldTypes.radio:
            return (
                <FieldRadioArrayController
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
                                className={cn({
                                    _none:
                                        item.value.toLowerCase() ===
                                        BUILDER_VALUE_NONE,
                                })}
                            />
                        ),
                        value: item.value,
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
                    color={item.color || undefined}
                    default={item.default}
                    subfieldName={item.subfieldName}
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
    className?: string;
}> = ({ title, subTitle, priceCurrency, price }) => {
    return (
        <div>
            {title && <P className="title">{title}</P>}
            {subTitle && <P className="sub-title">{subTitle}</P>}
            {!!price && (
                <P className="price">
                    <b>
                        {price}
                        {priceCurrency}
                    </b>
                </P>
            )}
        </div>
    );
};
