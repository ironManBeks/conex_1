import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import {
    contactsUsDefaultValues,
    contactsUsFormResolver,
    EContactsUsFieldsNames,
    FEEDBACK_MAX_MESSAGE_LENGTH,
    TContactsUsForm,
} from "@components/pages/ContactUsPage/formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { phoneNumberMask } from "@consts/masksConsts";
import { useRootStore } from "@store";

const ContactUsForm: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_form`;
    const { contactStore } = useRootStore();
    const { createFeedbackRequest, createFeedbackFetching } = contactStore;

    const methods = useForm<TContactsUsForm>({
        resolver: contactsUsFormResolver(),
        defaultValues: contactsUsDefaultValues,
    });

    const { handleSubmit, reset } = methods;

    const onSubmit: SubmitHandler<TContactsUsForm> = (data) => {
        createFeedbackRequest(data).then(() => {
            reset();
        });
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
                    <FieldInputMaskController
                        name={EContactsUsFieldsNames.phoneNumber}
                        placeholder="Phone number"
                        label="Phone number"
                        mask={phoneNumberMask}
                        saveOnlyNumber={true}
                    />
                    <FieldTextAreaController
                        name={EContactsUsFieldsNames.message}
                        placeholder="Message"
                        label="Message"
                        minHeight={140}
                        maxSymbolLength={FEEDBACK_MAX_MESSAGE_LENGTH}
                    />
                    <div className={`${classPrefix}__actions`}>
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.primary}
                            isLoading={createFeedbackFetching}
                            disabled={createFeedbackFetching}
                        >
                            Send
                        </ButtonPrimary>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
});

export default ContactUsForm;
