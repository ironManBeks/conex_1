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

import { TBuilderCompProps, TBuilderStepBase } from "../types";
import { EBuilderFieldTypes, TBuilderStepDataDTO } from "@store/builder/types";
import { IRoot } from "@store/store";
import { toJS } from "mobx";
import { TNullable } from "@globalTypes/commonTypes";
import { convertBuilderFieldName } from "@helpers/builderHelper";

// // ToDo remove type any
const getBuilderFiledValidation = ({
    fieldType,
    fieldTitle,
    stepTitle,
}: {
    fieldType: EBuilderFieldTypes;
    fieldTitle?: string;
    stepTitle?: string;
}): any => {
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
            return null;
    }
};

const builderFormResolver = (
    pageId: number | null,
    attributes?: TBuilderStepDataDTO["attributes"],
): Resolver | undefined => {
    if (isEmpty(attributes) || !pageId) return undefined;

    // ToDo remove type any
    const validation = {
        [convertBuilderFieldName(pageId, attributes.fieldName)]:
            getBuilderFiledValidation({
                fieldType: attributes.fieldType,
                fieldTitle: attributes.fieldTitle,
                stepTitle: "",
            }),
    };

    return yupResolver(yup.object().shape(validation));
};

const BuilderForm: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const {
            currentStepId,
            currentStepData,
            updateCurrentStepData,
            stepHistory,
        } = builderStore;

        const methods = useForm({
            resolver: builderFormResolver(
                currentStepId,
                currentStepData?.attributes,
            ),
            defaultValues: undefined,
        });

        useEffect(() => {
            updateCurrentStepData("start");
        }, []);

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
