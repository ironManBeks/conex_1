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
    formDefaultValues,
    // formResolver,
    optionsMockup,
    TFormFields,
} from "./formAttrs";
import { EDirection } from "@globalTypes/commonTypes";
import { convertCheckboxArrayToBoolean } from "@helpers/formHelpers";
import { IconMapPoint } from "@components/Icons";
import FieldSliderController from "@components/form/formControllers/FieldSliderController";

const TestPage: FC = () => {
    const classPrefix = "test-page";
    const methods = useForm<TFormFields>({
        // resolver: formResolver(),
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
                            <FieldInputController
                                name={EFieldNames.input}
                                placeholder={EFieldNames.input}
                                label={EFieldNames.input}
                                isFloatingLabel={true}
                            />
                            <FieldInputController
                                name={EFieldNames.input + "123"}
                                placeholder={EFieldNames.input}
                                label={EFieldNames.input}
                                disabled={true}
                                isFloatingLabel={true}
                            />
                            <br />
                            <br />
                            <br />
                            <FieldSliderController
                                name={EFieldNames.slider}
                                // placeholder={EFieldNames.select}
                                label={EFieldNames.slider}
                            />
                            <FieldSelectController
                                name={EFieldNames.select}
                                placeholder={EFieldNames.select}
                                label={EFieldNames.select}
                                options={optionsMockup}
                            />
                            <FieldSelectController
                                name={EFieldNames.select + 321}
                                placeholder={EFieldNames.select + 321}
                                label={EFieldNames.select + 321}
                                options={optionsMockup}
                                showSearch={false}
                            />
                            {/*<FieldSelectController*/}
                            {/*    name={EFieldNames.select + 123}*/}
                            {/*    placeholder={EFieldNames.select + 123}*/}
                            {/*    label={EFieldNames.select + 123}*/}
                            {/*    options={optionsMockup}*/}
                            {/*    disabled={true}*/}
                            {/*/>*/}
                            <br />
                            <br />
                            <br />
                            <FieldRadioButtonArrayController
                                name={EFieldNames.radioButtonArray}
                                label={EFieldNames.radioButtonArray}
                                options={optionsMockup}
                            />
                            <FieldRadioButtonArrayController
                                name={EFieldNames.radioButtonArray + 123}
                                label={EFieldNames.radioButtonArray + 123}
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
                                <div>
                                    <div>
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.primary}
                                            leftIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            primary
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.primary}
                                            disabled={true}
                                            leftIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            primary
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.primary}
                                            leftIcon={
                                                <IconMapPoint
                                                    width={24}
                                                    height={24}
                                                />
                                            }
                                            type="submit"
                                        ></ButtonPrimary>
                                        {/*________________________________________________*/}
                                        <br />
                                        {/*________________________________________________*/}
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.secondary}
                                            leftIcon={<IconMapPoint />}
                                            rightIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            secondary
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.secondary}
                                            disabled={true}
                                            leftIcon={<IconMapPoint />}
                                            rightIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            secondary
                                        </ButtonPrimary>
                                        {/*________________________________________________*/}
                                        <br />
                                        {/*________________________________________________*/}
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.transparent}
                                            leftIcon={<IconMapPoint />}
                                            rightIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            transparent
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.md}
                                            color={EButtonColor.transparent}
                                            disabled={true}
                                            type="submit"
                                        >
                                            transparent
                                        </ButtonPrimary>
                                        <br />
                                    </div>
                                    <br />
                                    <br />
                                    <div>
                                        <ButtonPrimary
                                            size={EButtonSize.lg}
                                            color={EButtonColor.primary}
                                            type="submit"
                                            // rightIcon={
                                            //     <IconMapPoint
                                            //         width={24}
                                            //         height={24}
                                            //     />
                                            // }
                                        >
                                            primary
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.lg}
                                            color={EButtonColor.primary}
                                            disabled={true}
                                            type="submit"
                                        >
                                            primary
                                        </ButtonPrimary>
                                        {/*<ButtonPrimary*/}
                                        {/*    size={EButtonSize.lg}*/}
                                        {/*    color={EButtonColor.primary}*/}
                                        {/*    rightIcon={*/}
                                        {/*        <IconMapPoint*/}
                                        {/*            width={24}*/}
                                        {/*            height={24}*/}
                                        {/*        />*/}
                                        {/*    }*/}
                                        {/*    type="submit"*/}
                                        {/*></ButtonPrimary>*/}
                                        {/*________________________________________________*/}
                                        <br />
                                        {/*________________________________________________*/}
                                        <ButtonPrimary
                                            size={EButtonSize.lg}
                                            color={EButtonColor.secondary}
                                            type="submit"
                                        >
                                            secondary
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.lg}
                                            color={EButtonColor.secondary}
                                            disabled={true}
                                            type="submit"
                                        >
                                            secondary
                                        </ButtonPrimary>
                                        {/*________________________________________________*/}
                                        <br />
                                        {/*________________________________________________*/}
                                        <ButtonPrimary
                                            size={EButtonSize.lg}
                                            color={EButtonColor.transparent}
                                            type="submit"
                                        >
                                            transparent
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            size={EButtonSize.lg}
                                            color={EButtonColor.transparent}
                                            disabled={true}
                                            type="submit"
                                        >
                                            transparent
                                        </ButtonPrimary>
                                        <br />
                                    </div>
                                    <div>
                                        <ButtonPrimary
                                            color={EButtonColor.success}
                                            leftIcon={<IconMapPoint />}
                                            rightIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            success
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            color={EButtonColor.success}
                                            disabled={true}
                                            type="submit"
                                        >
                                            success
                                        </ButtonPrimary>
                                        {/*________________________________________________*/}
                                        <br />
                                        {/*________________________________________________*/}
                                        <ButtonPrimary
                                            color={EButtonColor.danger}
                                            leftIcon={<IconMapPoint />}
                                            rightIcon={<IconMapPoint />}
                                            type="submit"
                                        >
                                            danger
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            color={EButtonColor.danger}
                                            disabled={true}
                                            type="submit"
                                        >
                                            danger
                                        </ButtonPrimary>
                                        {/*________________________________________________*/}
                                        <br />
                                        {/*________________________________________________*/}
                                        <ButtonPrimary
                                            color={EButtonColor.default}
                                            type="submit"
                                        >
                                            default
                                        </ButtonPrimary>
                                        <ButtonPrimary
                                            color={EButtonColor.default}
                                            disabled={true}
                                            type="submit"
                                        >
                                            default
                                        </ButtonPrimary>
                                        <br />
                                    </div>
                                </div>
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
