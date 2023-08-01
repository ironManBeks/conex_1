import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldSelectController from "@components/form/formControllers/FieldSelectController";
import FieldRadioArrayController from "@components/form/formControllers/FieldRadioArrayController";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import FieldCheckboxController from "@components/form/formControllers/FieldCheckboxController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";
import FieldInputNumberController from "@components/form/formControllers/FieldInputNumberController";

import { H1 } from "@components/Text";

import { EButtonColor, EButtonSize } from "@components/buttons/types";
import {
    EFieldNames,
    formResolver,
    formDefaultValues,
    optionsMockup,
    TFormFields,
} from "./formAttrs";
import { EDirection } from "@globalTypes/commonTypes";
import { convertCheckboxArrayToBoolean } from "@helpers/formHelpers";

const TestPage: FC = () => {
    const classPrefix = "test-page";
    const methods = useForm<TFormFields>({
        resolver: formResolver(),
        defaultValues: formDefaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        const checkboxArray = data[EFieldNames.checkboxArray];
        const result = {
            ...data,
            [EFieldNames.checkboxArray]: convertCheckboxArrayToBoolean(
                checkboxArray,
                optionsMockup,
            ),
        };

        console.log("SubmitHandler", result);
    };

    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection="column">
                <H1 style={{ padding: "50px 0 0", fontWeight: "700" }}>
                    Test page
                </H1>
                <div style={{ paddingTop: "70px" }}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldSelectController
                                name={EFieldNames.select}
                                placeholder={EFieldNames.select}
                                label={EFieldNames.select}
                                options={optionsMockup}
                            />
                            <FieldSelectController
                                name={EFieldNames.select + "123"}
                                placeholder={EFieldNames.select}
                                label={EFieldNames.select}
                                options={optionsMockup}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldRadioButtonArrayController
                                name={EFieldNames.radioButtonArray}
                                label={EFieldNames.radioButtonArray}
                                options={optionsMockup}
                            />
                            <FieldRadioButtonArrayController
                                name={EFieldNames.radioButtonArray + "123"}
                                label={EFieldNames.radioButtonArray}
                                options={optionsMockup}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldRadioArrayController
                                name={EFieldNames.radioArray}
                                options={optionsMockup}
                                label={EFieldNames.radioArray}
                            />
                            <FieldRadioArrayController
                                name={EFieldNames.radioArray + "123"}
                                options={optionsMockup}
                                label={EFieldNames.radioArray}
                                direction={EDirection.vertical}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldCheckboxController
                                name={EFieldNames.checkbox}
                                label={EFieldNames.checkbox}
                            />
                            <FieldCheckboxController
                                name={EFieldNames.checkbox + "123"}
                                label={EFieldNames.checkbox}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldTextAreaController
                                name={EFieldNames.textArea}
                                placeholder={EFieldNames.textArea}
                                label={EFieldNames.textArea}
                            />
                            <FieldTextAreaController
                                name={EFieldNames.textArea + "123"}
                                placeholder={EFieldNames.textArea}
                                label={EFieldNames.textArea}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldInputController
                                name={EFieldNames.input}
                                placeholder={EFieldNames.input}
                                label={EFieldNames.input}
                            />
                            <FieldInputController
                                name={EFieldNames.input + "123"}
                                placeholder={EFieldNames.input}
                                label={EFieldNames.input}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldInputNumberController
                                name={EFieldNames.inputNumber}
                                placeholder={EFieldNames.inputNumber}
                                label={EFieldNames.inputNumber}
                            />
                            <FieldInputNumberController
                                name={EFieldNames.inputNumber + "123"}
                                placeholder={EFieldNames.inputNumber}
                                label={EFieldNames.inputNumber}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldCheckboxArrayController
                                name={EFieldNames.checkboxArray}
                                options={optionsMockup}
                                label={EFieldNames.checkboxArray}
                            />
                            <FieldCheckboxArrayController
                                name={EFieldNames.checkboxArray + "123"}
                                options={optionsMockup}
                                label={EFieldNames.checkboxArray}
                                direction={EDirection.vertical}
                                disabled={true}
                            />
                            <br />
                            <br />
                            <br />
                            <div>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.primary}
                                    size={EButtonSize.sm}
                                >
                                    primary
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.secondary}
                                    size={EButtonSize.sm}
                                >
                                    secondary
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.danger}
                                    size={EButtonSize.sm}
                                >
                                    danger
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.transparent}
                                    size={EButtonSize.sm}
                                >
                                    transparent
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.default}
                                    size={EButtonSize.sm}
                                >
                                    default
                                </ButtonPrimary>
                            </div>
                            <br />
                            <div>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.primary}
                                    size={EButtonSize.md}
                                >
                                    primary
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.secondary}
                                    size={EButtonSize.md}
                                >
                                    secondary
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.danger}
                                    size={EButtonSize.md}
                                >
                                    danger
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.transparent}
                                    size={EButtonSize.md}
                                >
                                    transparent
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.default}
                                    size={EButtonSize.md}
                                >
                                    default
                                </ButtonPrimary>
                            </div>
                            <br />
                            <div>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.primary}
                                    size={EButtonSize.lg}
                                >
                                    primary
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.secondary}
                                    size={EButtonSize.lg}
                                >
                                    secondary
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.danger}
                                    size={EButtonSize.lg}
                                >
                                    danger
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.transparent}
                                    size={EButtonSize.lg}
                                >
                                    transparent
                                </ButtonPrimary>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.default}
                                    size={EButtonSize.lg}
                                >
                                    default
                                </ButtonPrimary>
                            </div>
                            <br />
                            <br />
                            <br />
                        </form>
                    </FormProvider>
                </div>
            </Container>
        </Layout>
    );
};

export default TestPage;
