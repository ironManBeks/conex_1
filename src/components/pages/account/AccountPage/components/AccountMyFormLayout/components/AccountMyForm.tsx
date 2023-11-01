import { FC, useMemo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import { H4 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AccountSectionWrapper from "@components/pages/account/AccountPage/components/AccountSectionWrapper";

import {
    accountMyFormDefaultValues,
    accountMyFormResolver,
    EAccountMyFormFieldsNames,
    TAccountMyForm,
} from "../../../formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { phoneNumberMask } from "@consts/masksConsts";
import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";
import { TUpdateUserRequest } from "@store/auth/types";
import { showNotification } from "@helpers/notificarionHelper";

const AccountMyForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_my-form`;
        const { authStore } = store as IRoot;
        const { userData, updateUserRequest, updateUserRequestFetching } =
            authStore;

        const methods = useForm<TAccountMyForm>({
            resolver: accountMyFormResolver(),
            defaultValues: accountMyFormDefaultValues(userData),
        });

        const {
            handleSubmit,
            reset,
            formState: { isDirty },
        } = methods;

        const onSubmit: SubmitHandler<TAccountMyForm> = (data) => {
            if (!userData) {
                showNotification({
                    mainProps: {
                        type: "warning",
                        message: "Error",
                        description: "Try to reload the page",
                    },
                });
                return;
            }
            const params: TUpdateUserRequest = {
                ...data,
                id: userData.id,
            };
            updateUserRequest(params).then(() => {
                showNotification({
                    mainProps: {
                        type: "success",
                        message: "Your information updated successfully",
                    },
                });
                reset({}, { keepValues: true });
            });
        };

        const handleCancel = () => {
            reset();
        };

        const actionsContent = useMemo(() => {
            return (
                <div className={`${classPrefix}__actions`}>
                    <ButtonPrimary
                        onClick={handleCancel}
                        color={EButtonColor.secondary}
                        disabled={!isDirty}
                    >
                        Cancel
                    </ButtonPrimary>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        type="submit"
                        isLoading={updateUserRequestFetching}
                        disabled={!isDirty || updateUserRequestFetching}
                    >
                        Save changes
                    </ButtonPrimary>
                </div>
            );
        }, [isDirty, updateUserRequestFetching]);

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
                                    name={EAccountMyFormFieldsNames.first_name}
                                    placeholder="Name"
                                    label="Name"
                                />
                                <FieldInputController
                                    name={EAccountMyFormFieldsNames.last_name}
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
                                    name={EAccountMyFormFieldsNames.zip}
                                    placeholder="ZIP code"
                                    label="ZIP code"
                                />
                            </div>
                        </AccountSectionWrapper>
                        {actionsContent}
                    </form>
                </FormProvider>
            </div>
        );
    }),
);

export default AccountMyForm;
