import { FC, Fragment, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { observer } from "mobx-react";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import { H2 } from "@components/Text";

import {
    accountInfoDefaultValues,
    accountInfoFormResolver,
    EAccountInfoFieldsNames,
    TAccountInfoForm,
} from "../formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { useRootStore } from "@store";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";

const AccountForm: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_form`;
    const { authStore } = useRootStore();
    const { authData } = authStore;
    const [formActionVisible, setFormActionVisible] = useState<boolean>(false);

    const methods = useForm<TAccountInfoForm>({
        resolver: accountInfoFormResolver(),
        defaultValues: accountInfoDefaultValues(authData),
    });

    const { handleSubmit, reset } = methods;

    const onSubmit: SubmitHandler<TAccountInfoForm> = (data) => {
        console.log("SubmitHandler", data);
        notImplemented(`value: ${JSON.stringify(data)}`);
        setFormActionVisible(false);
    };

    const handleEditIconClick = (value: boolean) => {
        setFormActionVisible(value);
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
                            editIcon={!formActionVisible}
                            onEditIconClick={() =>
                                handleEditIconClick(!formActionVisible)
                            }
                            readOnly={!formActionVisible}
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
                            editIcon={!formActionVisible}
                            onEditIconClick={() =>
                                handleEditIconClick(!formActionVisible)
                            }
                            readOnly={!formActionVisible}
                        />
                        <FieldInputController
                            name={EAccountInfoFieldsNames.phone}
                            placeholder="Phone"
                            label="Phone"
                            editIcon={!formActionVisible}
                            onEditIconClick={() =>
                                handleEditIconClick(!formActionVisible)
                            }
                            readOnly={!formActionVisible}
                        />
                    </div>
                    {formActionVisible && (
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
                                    setFormActionVisible(false);
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
