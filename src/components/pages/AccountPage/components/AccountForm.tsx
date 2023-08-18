import { FC, Fragment, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import Logout from "@components/globalComponents/Logout";
import { H2 } from "@components/Text";

import {
    accountInfoDefaultValues,
    accountInfoFormResolver,
    EAccountInfoFieldsNames,
    TAccountInfoForm,
} from "../formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { phoneNumberMask } from "@consts/masksConsts";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";
import { IRoot } from "@store/store";

const AccountForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_form`;
        const { authStore } = store as IRoot;

        const { accountData, authData, emailConfirmationRequest } = authStore;
        const [editableField, setEditableField] = useState<
            EAccountInfoFieldsNames | undefined
        >(undefined);
        const router = useRouter();

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        const methods = useForm<TAccountInfoForm>({
            resolver: accountInfoFormResolver(editableField),
            defaultValues: accountInfoDefaultValues({
                [EAccountInfoFieldsNames.email]: authData?.user.email,
                [EAccountInfoFieldsNames.name]: authData?.user.username,
            }),
        });

        const { handleSubmit, reset } = methods;

        const onSubmit: SubmitHandler<TAccountInfoForm> = (data) => {
            if (editableField) {
                const changedValue = data[editableField];
                notImplemented(`changedValue: ${changedValue}`);
            }
            setEditableField(undefined);
        };

        const handleEditIconClick = (value: EAccountInfoFieldsNames) => {
            setEditableField(value);
            reset();
        };

        const handleConfirmEmail = () => {
            if (authData?.user.email) {
                emailConfirmationRequest({ email: authData?.user.email });
            }
        };

        return (
            <Fragment>
                <H2>
                    {isMobile ? "Personal info" : "My Account"}
                    <div>
                        {authData?.user.confirmed === false && (
                            <ButtonPrimary
                                size={EButtonSize.sm}
                                color={EButtonColor.secondary}
                                isOutline={true}
                                onClick={handleConfirmEmail}
                            >
                                Confirm email
                            </ButtonPrimary>
                        )}
                        <Logout
                            pageLink={router.asPath}
                            component={
                                <ButtonPrimary
                                    size={EButtonSize.sm}
                                    color={EButtonColor.danger}
                                    isOutline={true}
                                >
                                    Log Out
                                </ButtonPrimary>
                            }
                        />
                    </div>
                </H2>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${classPrefix}__wrapper`}
                    >
                        <div>
                            <FieldInputController
                                name={EAccountInfoFieldsNames.name}
                                placeholder="Name"
                                label="Name"
                                editIcon={
                                    editableField !==
                                    EAccountInfoFieldsNames.name
                                }
                                onEditIconClick={() =>
                                    handleEditIconClick(
                                        EAccountInfoFieldsNames.name,
                                    )
                                }
                                readOnly={
                                    editableField !==
                                    EAccountInfoFieldsNames.name
                                }
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <FieldInputController
                                name={EAccountInfoFieldsNames.email}
                                placeholder="Email"
                                label="Email"
                                editIcon={
                                    editableField !==
                                    EAccountInfoFieldsNames.email
                                }
                                onEditIconClick={() =>
                                    handleEditIconClick(
                                        EAccountInfoFieldsNames.email,
                                    )
                                }
                                readOnly={
                                    editableField !==
                                    EAccountInfoFieldsNames.email
                                }
                            />
                            <FieldInputMaskController
                                name={EAccountInfoFieldsNames.phone}
                                placeholder="Phone"
                                label="Phone"
                                mask={phoneNumberMask}
                                editIcon={
                                    editableField !==
                                    EAccountInfoFieldsNames.phone
                                }
                                onEditIconClick={() =>
                                    handleEditIconClick(
                                        EAccountInfoFieldsNames.phone,
                                    )
                                }
                                readOnly={
                                    editableField !==
                                    EAccountInfoFieldsNames.phone
                                }
                            />
                        </div>
                        {editableField && (
                            <div className={`${classPrefix}__actions`}>
                                <ButtonPrimary
                                    type="submit"
                                    color={EButtonColor.secondary}
                                    isOutline={true}
                                    size={EButtonSize.sm}
                                >
                                    Save Changes
                                </ButtonPrimary>
                                <ButtonPrimary
                                    onClick={() => {
                                        reset();
                                        setEditableField(undefined);
                                    }}
                                    color={EButtonColor.danger}
                                    isOutline={true}
                                    size={EButtonSize.sm}
                                    type="button"
                                >
                                    Reset
                                </ButtonPrimary>
                            </div>
                        )}
                    </form>
                </FormProvider>
            </Fragment>
        );
    }),
);

export default AccountForm;
