import { FC, Fragment, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { H2 } from "@components/Text";

import {
    accountInfoDefaultValues,
    accountInfoFormResolver,
    EAccountInfoFieldsNames,
    TAccountInfoForm,
} from "../formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { useRootStore } from "@store";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { phoneNumberMask } from "@consts/masksConsts";

const AccountForm: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_form`;
    const { authStore } = useRootStore();
    const { authData } = authStore;
    const [editableField, setEditableField] = useState<
        EAccountInfoFieldsNames | undefined
    >(undefined);

    const methods = useForm<TAccountInfoForm>({
        resolver: accountInfoFormResolver(editableField),
        defaultValues: accountInfoDefaultValues(authData),
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

    return (
        <Fragment>
            <H2>My Account</H2>
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
                                editableField !== EAccountInfoFieldsNames.name
                            }
                            onEditIconClick={() =>
                                handleEditIconClick(
                                    EAccountInfoFieldsNames.name,
                                )
                            }
                            readOnly={
                                editableField !== EAccountInfoFieldsNames.name
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
                                editableField !== EAccountInfoFieldsNames.email
                            }
                            onEditIconClick={() =>
                                handleEditIconClick(
                                    EAccountInfoFieldsNames.email,
                                )
                            }
                            readOnly={
                                editableField !== EAccountInfoFieldsNames.email
                            }
                        />
                        <FieldInputMaskController
                            name={EAccountInfoFieldsNames.phone}
                            placeholder="Phone"
                            label="Phone"
                            mask={phoneNumberMask}
                            editIcon={
                                editableField !== EAccountInfoFieldsNames.phone
                            }
                            onEditIconClick={() =>
                                handleEditIconClick(
                                    EAccountInfoFieldsNames.phone,
                                )
                            }
                            readOnly={
                                editableField !== EAccountInfoFieldsNames.phone
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
});

export default AccountForm;
