import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    IBuilderFieldDataDTO,
    TBuilderStepDataDTO,
    TResultDoorData,
    TUpdateCurrentStepWay,
} from "@store/builder/types";
import { FieldValues } from "react-hook-form";
import { isArray, isEmpty, isFunction, isNil, isString, uniq } from "lodash";
import {
    BUILDER_FIELD_ID_DIVIDER,
    BUILDER_FIELD_ID_PREFIX,
    BUILDER_VALUE_NONE,
} from "@components/pages/BuilderPage/consts";
import { TAddedOptionsListItem } from "@components/globalComponents/types";
import { toJS } from "mobx";
import { TNullable } from "@globalTypes/commonTypes";

export type TGetNextStepResult = number | number[] | null;
export type TBuilderDefaultValue = string | string[] | number | number[] | null;
export type TGetDefaultValuesResult =
    | Record<string, TBuilderDefaultValue>
    | undefined;

export type TResultValuesParams = {
    stepId: number;
    fieldName: string;
    fieldValue: any;
};

export const getSelectedElementByFormValues = (
    currentStepData: TBuilderStepDataDTO | null,
    fieldsList: FieldValues,
): IBuilderElementDataDTO | null => {
    if (isEmpty(currentStepData) || isEmpty(fieldsList)) {
        return null;
    }
    let result: IBuilderElementDataDTO | null = null;
    const { attributes } = currentStepData;
    const currentStepSelectedValues = getResultFieldsParams(fieldsList);
    const groupedSteps = groupedFieldsByStepId(currentStepSelectedValues);
    if (isEmpty(groupedSteps)) return null;

    for (const stepId in groupedSteps) {
        if (parseInt(stepId, 10) === currentStepData.id) {
            const newFormValues: TResultValuesParams[] = groupedSteps[stepId];
            for (let i = 0; i < newFormValues.length; i++) {
                const formValue = newFormValues[i];
                if (isArray(formValue.fieldValue)) {
                    const elements: IBuilderElementDataDTO[] = [];
                    for (let j = 0; j < formValue.fieldValue.length; j++) {
                        const fieldValue = formValue.fieldValue[j];
                        // ToDo Remove ts-ignore
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const selectedElement = attributes.subQuestions.find(
                            (item: IBuilderElementDataDTO) =>
                                item.value === fieldValue,
                        );
                        elements.push(selectedElement);
                    }
                    // ToDo here may be bugs
                    result = elements[0];
                } else {
                    // ToDo Remove ts-ignore
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    result = attributes.subQuestions.find(
                        (item: IBuilderElementDataDTO) =>
                            item.value === formValue.fieldValue,
                    );
                }
            }
            break;
        }
    }

    return result;
};

export const getNextStepByFormValues = (
    currentStepData: TBuilderStepDataDTO | null,
    fieldsList: FieldValues,
    parentId: number,
): TGetNextStepResult => {
    if (isEmpty(currentStepData) || isEmpty(fieldsList)) {
        return null;
    }

    const { attributes } = currentStepData;

    const stepType = attributes.fieldType;
    const currentStepSelectedValues = getResultFieldsParams(fieldsList);
    const groupedSteps = groupedFieldsByStepId(currentStepSelectedValues);

    if (isEmpty(groupedSteps)) return null;

    let result: TGetNextStepResult = null;

    const getBranchingId = () => {
        if (attributes.branching.length) {
            const element = attributes.branching.find(
                (item) => item.doorType === parentId,
            );
            if (element) {
                return element.next;
            }
        }
        return null;
    };

    if (stepType === EBuilderFieldTypes.multiple) {
        return getBranchingId() ?? attributes.nextQuestion;
    }

    // ToDo replace with getSelectedElementByFormValues
    for (const stepId in groupedSteps) {
        if (parseInt(stepId, 10) === currentStepData.id) {
            const newFormValues: TResultValuesParams[] = groupedSteps[stepId];
            for (let i = 0; i < newFormValues.length; i++) {
                const formValue = newFormValues[i];
                if (isArray(formValue.fieldValue)) {
                    const nextQuestions = [];
                    for (let j = 0; j < formValue.fieldValue.length; j++) {
                        const fieldValue = formValue.fieldValue[j];
                        // ToDo Remove ts-ignore
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const selectedElement = attributes.subQuestions.find(
                            (item: IBuilderElementDataDTO) =>
                                item.value === fieldValue,
                        );
                        if (
                            selectedElement.nextQuestion ||
                            attributes.nextQuestion
                        ) {
                            nextQuestions.push(
                                selectedElement.nextQuestion ??
                                    attributes.nextQuestion,
                            );
                        }
                    }
                    result = uniq(nextQuestions);
                } else {
                    // ToDo Remove ts-ignore
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const selectedElement = attributes.subQuestions.find(
                        (item: IBuilderElementDataDTO) =>
                            item.value === formValue.fieldValue,
                    );

                    result =
                        getBranchingId() ??
                        selectedElement?.nextQuestion ??
                        attributes.nextQuestion;
                }
            }
            break;
        }
    }

    return isArray(result) ? uniq(result) : result;
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

export const groupedFieldsByStepId = (
    arr: TResultValuesParams[],
): Record<number, TResultValuesParams[]> => {
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
    updateCurrentStepData?: (
        way: TUpdateCurrentStepWay,
        changeQueue?: true,
        changeHistory?: true,
    ) => void,
    stepHistory?: number[],
    currentStepData?: TNullable<TBuilderStepDataDTO>,
    renderMainTitle = false,
): TAddedOptionsListItem[] => {
    console.log("resultDoorData", toJS(resultDoorData));
    console.log("stepHistory", toJS(stepHistory));
    console.log("currentStepData", toJS(currentStepData));

    const result: TAddedOptionsListItem[] = [];
    if (!resultDoorData?.length) return result;

    return resultDoorData?.map((stepItem) => {
        const list: { label: string; value: string | number }[] = [];

        const isMulti = stepItem.stepType === EBuilderFieldTypes.multiple;

        for (let i = 0; i < stepItem.fields.length; i++) {
            const field = stepItem.fields[i];
            for (let j = 0; j < field.elements.length; j++) {
                const element = field.elements[j];
                if (element.value.toLowerCase() !== BUILDER_VALUE_NONE) {
                    list.push({
                        label: isMulti
                            ? `${field.fieldTitle ? field.fieldTitle : ""} ${
                                  element.mainTitle
                              }`
                            : element.mainTitle,
                        value: element.priceCurrency + element.price,
                    });
                }
            }
        }

        return {
            title: renderMainTitle ? stepItem.stepTitle : undefined,
            onClick:
                isFunction(updateCurrentStepData) && stepHistory?.length
                    ? () => {
                          const mainStep = stepHistory[0];
                          updateCurrentStepData(
                              stepItem.stepId === mainStep
                                  ? "main-step"
                                  : stepItem.stepId,
                              false,
                              false,
                          );
                      }
                    : undefined,
            list: list,
            isActive: currentStepData?.id === stepItem.stepId,
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
                // ToDo Remove ts-ignore
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
                // ToDo Remove ts-ignore
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const element: IBuilderElementDataDTO =
                    currentStepData.attributes.subQuestions[i];
                const includedValue = newFormValues.find((item) => {
                    if (isArray(item.fieldValue)) {
                        return item.fieldValue.find((subItem) => {
                            return subItem === element.value;
                        });
                    } else return item.fieldValue === element.value;
                });
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

export const getUpdatedResultDoorData = (
    formData: FieldValues,
    currentStepData: TNullable<TBuilderStepDataDTO>,
    resultDoorData: TNullable<TResultDoorData[]>,
): TResultDoorData[] => {
    const newResult = convertFormValuesToResultData(formData, currentStepData);
    const oldResultIndex = resultDoorData?.findIndex(
        (item) => item.stepId === currentStepData?.id,
    );
    const arr: TResultDoorData[] = resultDoorData?.length
        ? [...resultDoorData]
        : [];
    if (newResult) {
        if (!isNil(oldResultIndex) && oldResultIndex !== -1) {
            arr.splice(oldResultIndex, 1, newResult);
        } else {
            arr.push(newResult);
        }
    }
    return arr;
};

export const getFormValuesByStepId = (
    formData: FieldValues,
    stepId: number,
): FieldValues => {
    const convertedValues = getResultFieldsParams(formData);
    const groupedSteps = groupedFieldsByStepId(convertedValues);
    const currentStepValues = groupedSteps[stepId];
    const result: FieldValues = {};
    for (let i = 0; i < currentStepValues.length; i++) {
        const params = currentStepValues[i];
        result[convertBuilderFieldName(params.stepId, params.fieldName)] =
            params.fieldValue;
    }

    return result;
};

export const getTotalPriceByResultData = (
    resultDoorData: TResultDoorData[] | null,
): number => {
    if (isNil(resultDoorData)) return 0;

    return resultDoorData.reduce((stepAcc, currentStep) => {
        const stepPrice = currentStep.fields.reduce(
            (fieldAcc, currentField) => {
                const fieldPrice = currentField.elements.reduce(
                    (elementAcc, currentElement) => {
                        return elementAcc + currentElement.price;
                    },
                    0,
                );
                return fieldAcc + fieldPrice;
            },
            0,
        );
        return stepAcc + stepPrice;
    }, 0);
};
