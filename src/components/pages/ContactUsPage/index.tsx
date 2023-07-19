import { FC, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldSelectController from "@components/form/formControllers/FieldSelectController";
import FieldRadioArrayController from "@components/form/formControllers/FieldRadioArrayController";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";

import { EButtonColor, EButtonSize } from "@components/buttons/types";
import {
    EFieldNames,
    formCreateResolver,
    formDefaultValues,
    optionsMockup,
    TFormFields,
} from "./formAttrs";
import FieldCheckboxController from "@components/form/formControllers/FieldCheckboxController";
import { EDirection } from "@globalTypes/commonTypes";

const ContactUsPage: FC = () => {
    const classPrefix = "contact-us-page";
    const methods = useForm<TFormFields>({
        resolver: formCreateResolver(),
        defaultValues: formDefaultValues,
    });
    const [formValues, setFormValues] = useState<any>();

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TFormFields> = (data) => {
        console.log("SubmitHandler", data);
        setFormValues(data);
    };

    useEffect(() => {
        console.log("formValues", formValues);
    }, [formValues]);

    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection="column">
                <div style={{ paddingTop: "70px" }}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
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

export default ContactUsPage;
