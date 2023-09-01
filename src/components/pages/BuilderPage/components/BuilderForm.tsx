import { FC, useEffect } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";

import BuilderProgress from "./BuilderProgress";
import BuilderStepLayout from "./BuilderStepLayout";
import BuilderRightSide from "./BuilderRightSide";
import BuilderFormActions from "./BuilderStepActions";

import { TBuilderCompProps, TBuilderElementComp } from "../types";
import {
    EBuilderFieldTypes,
    IBuilderFieldDataDTO,
    TBuilderStepDataDTO,
} from "@store/builder/types";
import { IRoot } from "@store/store";
import { convertBuilderFieldName } from "@helpers/builderHelper";
import { Schema } from "yup";

const getBuilderFiledValidation = ({
    fieldType,
    fieldTitle,
    stepTitle,
}: {
    fieldType: EBuilderFieldTypes;
    fieldTitle?: string;
    stepTitle?: string;
}): Schema => {
    const currentFieldName = fieldTitle ? fieldTitle : stepTitle ?? "";
    const requiredText = `Field "${currentFieldName}" is required`;
    const oneFieldRequiredText = `At least one value in field "${currentFieldName}" must be filled`;

    switch (fieldType) {
        case EBuilderFieldTypes.card:
        case EBuilderFieldTypes.radio:
        case EBuilderFieldTypes.colorPicker:
        case EBuilderFieldTypes.radioButton:
            return yup.string().required(requiredText);
        case EBuilderFieldTypes.checkbox:
            return yup
                .array()
                .min(1, oneFieldRequiredText)
                .of(yup.string().required(requiredText))
                .required(requiredText);
        default:
            return yup.string();
    }
};

const builderFormResolver = (
    pageId: number | null,
    attributes?: TBuilderStepDataDTO["attributes"],
): Resolver | undefined => {
    if (isEmpty(attributes) || !pageId) return undefined;
    const isMulti = attributes?.fieldType === EBuilderFieldTypes.multiple;

    const validation: Record<string, Schema> = {};

    if (isMulti) {
        for (let i = 0; i < attributes?.subQuestions.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const field: IBuilderFieldDataDTO = attributes?.subQuestions[i];
            if (field.required && field.subfieldName) {
                validation[
                    convertBuilderFieldName(pageId, field.subfieldName)
                ] = getBuilderFiledValidation({
                    fieldType: field.fieldType,
                    fieldTitle: field.fieldTitle,
                    stepTitle: "",
                });
            }
        }
    } else {
        validation[convertBuilderFieldName(pageId, attributes.fieldName)] =
            getBuilderFiledValidation({
                fieldType: attributes.fieldType,
                fieldTitle: attributes.fieldTitle,
                stepTitle: "",
            });
    }

    return yupResolver(yup.object().shape(validation));
};

const BuilderForm: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { currentStepId, currentStepData } = builderStore;

        const methods = useForm({
            resolver: builderFormResolver(
                currentStepId,
                currentStepData?.attributes,
            ),
            defaultValues: undefined,
            mode: "onTouched",
        });

        return (
            <FormProvider {...methods}>
                <form action="">
                    <BuilderProgress pageClassPrefix={pageClassPrefix} />
                    <div className={`${pageClassPrefix}_content__wrapper`}>
                        <div
                            className={`${pageClassPrefix}_left-side__wrapper`}
                        >
                            <BuilderStepLayout
                                pageClassPrefix={pageClassPrefix}
                            />
                        </div>
                        <BuilderRightSide pageClassPrefix={pageClassPrefix} />
                    </div>
                    <BuilderFormActions pageClassPrefix={pageClassPrefix} />
                </form>
            </FormProvider>
        );
    }),
);

export default BuilderForm;
