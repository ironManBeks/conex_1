import { FC, Fragment } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import FieldInputController from "@components/form/formControllers/FieldInputController";
import { H2 } from "@components/Text";

import {
    accountInfoDefaultValues,
    accountInfoFormResolver,
    EAccountInfoFieldsNames,
    TAccountInfoForm,
} from "../formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";

const AccountForm: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const methods = useForm<TAccountInfoForm>({
        resolver: accountInfoFormResolver(),
        defaultValues: accountInfoDefaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TAccountInfoForm> = (data) => {
        console.log("SubmitHandler", data);
    };

    return (
        <Fragment>
            <H2>My Account</H2>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${pageClassPrefix}_form__wrapper`}
                >
                    <div>
                        <FieldInputController
                            name={EAccountInfoFieldsNames.name}
                            placeholder="Name"
                            label="Name"
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
                        />
                        <FieldInputController
                            name={EAccountInfoFieldsNames.phone}
                            placeholder="Phone"
                            label="Phone"
                        />
                    </div>
                </form>
            </FormProvider>
        </Fragment>
    );
};

export default AccountForm;
