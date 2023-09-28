import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import { H4 } from "@components/Text";

import {
    accountMyFormDefaultValues,
    accountMyFormResolver,
    EAccountMyFormFieldsNames,
    TAccountMyForm,
} from "../formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { notImplemented } from "@helpers/notImplemented";
import { phoneNumberMask } from "@consts/masksConsts";
import { IRoot } from "@store/store";
import AccountSectionWrapper from "@components/pages/AccountPage/components/AccountSectionWrapper";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor } from "@components/buttons/types";

const AccountMyForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_my-form`;
        const { authStore } = store as IRoot;
        const { userData } = authStore;

        const methods = useForm<TAccountMyForm>({
            resolver: accountMyFormResolver(),
            defaultValues: accountMyFormDefaultValues(userData),
        });

        const { handleSubmit, reset } = methods;

        const onSubmit: SubmitHandler<TAccountMyForm> = (data) => {
            notImplemented(`changedValue: ${JSON.stringify(data)}`);
        };

        const handleCancel = () => {
            reset();
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${classPrefix}__form`}
                    >
                        <AccountSectionWrapper
                            pageClassPrefix={pageClassPrefix}
                        >
                            <H4>Main info</H4>
                            <div className={`${classPrefix}__fields`}>
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.name}
                                    placeholder="Name"
                                    label="Name"
                                />
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.surname}
                                    placeholder="Surname"
                                    label="Surname"
                                />
                            </div>
                            <div className={`${classPrefix}__fields`}>
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.email}
                                    placeholder="Email"
                                    label="Email"
                                />
                                <FieldInputMaskController
                                    name={EAccountMyFormFieldsNames.phone}
                                    placeholder="Phone"
                                    label="Phone"
                                    mask={phoneNumberMask}
                                />
                            </div>
                        </AccountSectionWrapper>
                        <AccountSectionWrapper
                            pageClassPrefix={pageClassPrefix}
                        >
                            <H4>Delivery info</H4>
                            <div className={`${classPrefix}__fields`}>
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.country}
                                    placeholder="Сountry"
                                    label="Сountry"
                                />
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.city}
                                    placeholder="City"
                                    label="City"
                                />
                            </div>
                            <div className={`${classPrefix}__fields`}>
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.address}
                                    placeholder="Address"
                                    label="Address"
                                />
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.index}
                                    placeholder="Index"
                                    label="Index"
                                />
                            </div>
                        </AccountSectionWrapper>
                        <div className={`${classPrefix}__actions`}>
                            <ButtonPrimary
                                onClick={handleCancel}
                                color={EButtonColor.secondary}
                            >
                                Cancel
                            </ButtonPrimary>
                            <ButtonPrimary
                                color={EButtonColor.primary}
                                type="submit"
                                // isLoading={}
                                // disabled={}
                            >
                                Save changes
                            </ButtonPrimary>
                        </div>
                    </form>
                </FormProvider>
            </div>
        );
    }),
);

export default AccountMyForm;
