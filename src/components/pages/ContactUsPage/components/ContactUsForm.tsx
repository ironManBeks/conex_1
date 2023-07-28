import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import FieldInputController from "@components/form/formControllers/FieldInputController";

import {
    contactsUsDefaultValues,
    contactsUsFormResolver,
    EContactsUsFieldsNames,
    TContactsUsForm,
} from "@components/pages/ContactUsPage/formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { notImplemented } from "@helpers/notImplemented";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor } from "@components/buttons/types";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";

const ContactUsForm: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_form`;
    const methods = useForm<TContactsUsForm>({
        resolver: contactsUsFormResolver(),
        defaultValues: contactsUsDefaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TContactsUsForm> = (data) => {
        console.log("SubmitHandler", data);
        notImplemented(`value: ${JSON.stringify(data)}`);
    };

    return (
        <div className={`${classPrefix}__wrapper`}>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${classPrefix}__form`}
                >
                    <FieldInputController
                        name={EContactsUsFieldsNames.name}
                        placeholder="Your Name"
                        label="Your Name"
                    />
                    <FieldInputController
                        name={EContactsUsFieldsNames.phone}
                        placeholder="Phone number"
                        label="Phone number"
                    />
                    <FieldTextAreaController
                        name={EContactsUsFieldsNames.message}
                        placeholder="Message"
                        label="Message"
                        minHeight={140}
                        maxSymbolLength={1000}
                    />
                    <div className={`${classPrefix}__actions`}>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                        >
                            Send
                        </ButtonPrimary>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default ContactUsForm;
