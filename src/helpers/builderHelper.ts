import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    IBuilderFieldDataDTO,
    TBuilderStepDataDTO,
    TResultDoorData,
} from "@store/builder/types";
import { FieldValues } from "react-hook-form";
import { isArray, isEmpty, isNumber } from "lodash";
import {
    BUILDER_FIELD_ID_DIVIDER,
    BUILDER_FIELD_ID_PREFIX,
    BUILDER_VALUE_NONE,
} from "@components/pages/BuilderPage/consts";
import { TAddedOptionsListItem } from "@components/globalComponents/types";
import { toJS } from "mobx";
import { TNullable } from "@globalTypes/commonTypes";

export type TGetNextStepResult = number | number[] | "end" | null;
export type TBuilderDefaultValue = string | string[] | number | number[] | null;
export type TGetDefaultValuesResult =
    | Record<string, TBuilderDefaultValue>
    | undefined;

export type TResultValuesParams = {
    stepId: number;
    fieldName: string;
    fieldValue: any;
};

export const getNextStep = (
    currentStep: TBuilderStepDataDTO | null,
    fieldsList: FieldValues,
): TGetNextStepResult => {
    if (isEmpty(currentStep) || isEmpty(fieldsList)) {
        return null;
    }

    console.log("currentStep", toJS(currentStep));
    console.log("fieldsList", toJS(fieldsList));

    const stepType = currentStep?.attributes.fieldType;
    // const selectedValues =

    for (const fieldKey in fieldsList) {
        const fieldValue = fieldsList[fieldKey];

        console.log("fieldValue", fieldValue);

        if (stepType === EBuilderFieldTypes.multiple) {
            return currentStep.attributes.nextQuestion;
        } else {
            if (isArray(fieldValue)) {
                const steps: number[] = [];
                for (let i = 0; i < fieldValue.length; i++) {
                    const selectedElement =
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        currentStep?.attributes.subQuestions.find(
                            (item: IBuilderElementDataDTO) =>
                                item.value === fieldValue[i],
                        );
                    if (selectedElement?.nextQuestion) {
                        steps.push(selectedElement.nextQuestion);
                    }
                }
                return steps;
            } else {
                const selectedElement =
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    currentStep?.attributes.subQuestions.find(
                        (item: IBuilderElementDataDTO) => {
                            console.log("item", item);
                            return item.value === fieldValue;
                        },
                    );
                if (!isEmpty(selectedElement)) {
                    if (isNumber(selectedElement.nextQuestion)) {
                        return selectedElement.nextQuestion;
                    } else {
                        if (isNumber(currentStep?.attributes.nextQuestion)) {
                            return currentStep?.attributes.nextQuestion;
                        } else return "end";
                    }
                }
            }
        }
    }

    return null;
};

const convertBuilderDefaultValues = (
    value: string[],
    fieldType: EBuilderFieldTypes,
) => {
    switch (fieldType) {
        case EBuilderFieldTypes.card:
        case EBuilderFieldTypes.radio:
        case EBuilderFieldTypes.colorPicker:
        case EBuilderFieldTypes.radioButton:
            return value[0];
        case EBuilderFieldTypes.checkbox:
            return value;
        default:
            return value;
    }
};

export const getBuilderStepDefaultValues = (
    stepId: number,
    attributes: TBuilderStepDataDTO["attributes"],
): TGetDefaultValuesResult => {
    if (isEmpty(attributes)) {
        return undefined;
    }
    const isMultiStep = attributes.fieldType === EBuilderFieldTypes.multiple;

    const result: TGetDefaultValuesResult = {};

    if (isMultiStep) {
        for (let i = 0; i < attributes.subQuestions.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const fieldsList: IBuilderFieldDataDTO[] = attributes.subQuestions;
            if (fieldsList.length) {
                for (let j = 0; j < fieldsList.length; j++) {
                    const defaultValues: string[] = [];
                    const elementsList = fieldsList[j].questions;
                    for (let el = 0; el < elementsList.length; el++) {
                        const element = elementsList[el];
                        if (element.default) {
                            defaultValues.push(element.value);
                        }
                    }
                    if (
                        !isEmpty(fieldsList[j]) &&
                        fieldsList[j].subfieldName &&
                        defaultValues.length
                    ) {
                        result[
                            convertBuilderFieldName(
                                stepId,
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                fieldsList[j].subfieldName,
                            )
                        ] = convertBuilderDefaultValues(
                            defaultValues,
                            fieldsList[j].fieldType,
                        );
                    }
                }
            }
        }
    } else {
        const defaultValues = [];
        for (let i = 0; i < attributes.subQuestions.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const element: IBuilderElementDataDTO = attributes.subQuestions[i];
            if (element.default) {
                defaultValues.push(element.value);
            }
        }

        if (attributes.fieldType === EBuilderFieldTypes.checkbox) {
            result[convertBuilderFieldName(stepId, attributes.fieldName)] =
                defaultValues;
        } else
            result[convertBuilderFieldName(stepId, attributes.fieldName)] =
                defaultValues[0];
    }

    return isEmpty(result) ? undefined : result;
};

export const convertBuilderFieldName = (
    stepId: number,
    fieldName: string,
): string => {
    return (
        BUILDER_FIELD_ID_PREFIX + stepId + BUILDER_FIELD_ID_DIVIDER + fieldName
    );
};

export const getResultFieldsParams = (
    fieldValues: Record<string, any>,
): TResultValuesParams[] => {
    if (isEmpty(fieldValues)) return [];
    const result: TResultValuesParams[] = [];
    for (const key in fieldValues) {
        const fullId = key.substring(0, key.indexOf("__"));
        result.push({
            stepId: parseInt(
                fullId.slice(
                    fullId.indexOf(BUILDER_FIELD_ID_PREFIX) +
                        BUILDER_FIELD_ID_PREFIX.length,
                ),
                10,
            ),
            fieldName: key.split("__")[1],
            fieldValue: fieldValues[key],
        });
    }

    return result;
};

export const groupedFieldsByStepId = (arr: TResultValuesParams[]) => {
    return arr.reduce((acc, cur) => {
        if (cur.fieldValue) {
            acc[cur.stepId] = acc[cur.stepId] || [];
            acc[cur.stepId].push(cur);
            return acc;
        } else return acc;
    }, Object.create(null));
};

export const renderResultDataToOptionsList = (
    resultDoorData: TResultDoorData[] | null,
): TAddedOptionsListItem[] => {
    const result: TAddedOptionsListItem[] = [];
    if (!resultDoorData?.length) return result;

    return resultDoorData?.map((stepItem) => {
        const list: { label: string; value: string | number }[] = [];

        for (let i = 0; i < stepItem.fields.length; i++) {
            const field = stepItem.fields[i];
            for (let j = 0; j < field.elements.length; j++) {
                const element = field.elements[j];
                if (element.value.toLowerCase() !== BUILDER_VALUE_NONE) {
                    list.push({
                        label: element.mainTitle,
                        value: element.price,
                    });
                }
            }
        }

        return {
            title: stepItem.stepTitle,
            list: list,
        };
    });
};

export const convertFormValuesToResultData = (
    formData: FieldValues,
    currentStepData: TNullable<TBuilderStepDataDTO>,
): TResultDoorData | null => {
    if (!isEmpty(currentStepData) && formData) {
        const convertedValues = getResultFieldsParams(formData);
        const groupedSteps = groupedFieldsByStepId(convertedValues);
        let newFormValues: TResultValuesParams[] = [];
        for (const stepId in groupedSteps) {
            if (parseInt(stepId, 10) === currentStepData.id) {
                newFormValues = groupedSteps[stepId];
                break;
            }
        }
        const newResultDoorDataBase = {
            stepId: currentStepData.id,
            stepTitle: currentStepData.attributes.fieldTitle,
            stepType: currentStepData.attributes.fieldType,
        };

        let newResult: TResultDoorData | null = null;

        if (
            currentStepData.attributes.fieldType === EBuilderFieldTypes.multiple
        ) {
            const includedFields: {
                fieldName: string | null;
                fieldTitle: string | null;
                fieldType: EBuilderFieldTypes;
                elements: IBuilderElementDataDTO[];
            }[] = [];

            for (
                let i = 0;
                i < currentStepData.attributes.subQuestions.length;
                i++
            ) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const field: IBuilderFieldDataDTO =
                    currentStepData.attributes.subQuestions[i];
                const includedElements: IBuilderElementDataDTO[] = [];
                for (let j = 0; j < field.questions.length; j++) {
                    const element: IBuilderElementDataDTO = field.questions[j];
                    const includedValue = newFormValues.find((item) => {
                        if (isArray(item.fieldValue)) {
                            return item.fieldValue.find((subItem) => {
                                return subItem === element.value;
                            });
                        } else return item.fieldValue === element.value;
                    });
                    if (includedValue) {
                        includedElements.push(toJS(element));
                    }
                }

                if (includedElements.length) {
                    includedFields.push({
                        fieldName: field.subfieldName,
                        fieldTitle: field.fieldTitle,
                        fieldType: field.fieldType,
                        elements: includedElements,
                    });
                }
            }
            newResult = {
                ...newResultDoorDataBase,
                fields: includedFields,
            };
        } else {
            const includedElements: IBuilderElementDataDTO[] = [];
            for (
                let i = 0;
                i < currentStepData.attributes.subQuestions.length;
                i++
            ) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const element: IBuilderElementDataDTO =
                    currentStepData.attributes.subQuestions[i];
                const includedValue = newFormValues.find(
                    (item) => item.fieldValue === element.value,
                );
                if (includedValue) {
                    includedElements.push(element);
                }
            }
            if (includedElements.length) {
                newResult = {
                    ...newResultDoorDataBase,
                    fields: [
                        {
                            fieldName: currentStepData.attributes.fieldName,
                            fieldTitle: currentStepData.attributes.fieldTitle,
                            fieldType: currentStepData.attributes.fieldType,
                            elements: includedElements,
                        },
                    ],
                };
            }
        }

        return newResult;
    } else return null;
};

export const getDefaultValuesFromResultDoorData = (
    stepId: number,
    resultDoorData: TNullable<TResultDoorData[]>,
): TGetDefaultValuesResult => {
    const result: TGetDefaultValuesResult = undefined;
    if (!resultDoorData || !resultDoorData.length) return result;
    const currentResult = resultDoorData.find((item) => item.stepId === stepId);
    if (isEmpty(currentResult)) return result;
    const convertedResult: TGetDefaultValuesResult = {};

    for (let i = 0; i < currentResult.fields.length; i++) {
        const field = currentResult.fields[i];
        const elementValue = field.elements.map((item) => item.value);
        if (field.fieldName) {
            convertedResult[convertBuilderFieldName(stepId, field.fieldName)] =
                field.fieldType === EBuilderFieldTypes.checkbox
                    ? elementValue
                    : elementValue[0];
        }
    }

    return convertedResult;
};
