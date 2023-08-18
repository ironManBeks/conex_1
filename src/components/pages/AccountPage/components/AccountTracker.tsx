import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import { H3 } from "@components/Text";

import {
    accountTrackerDefaultValues,
    EAccountTrackerFieldsNames,
    TAccountTrackerForm,
} from "@components/pages/AccountPage/formAttrs";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { IRoot } from "@store/store";

const AccountTracker: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_tracker`;
        const { commonStore } = store as IRoot;
        const [spaceTop, setSpaceTop] = useState<number>(0);

        const methods = useForm<TAccountTrackerForm>({
            defaultValues: accountTrackerDefaultValues,
        });

        const { handleSubmit } = methods;

        const onSubmit: SubmitHandler<TAccountTrackerForm> = (data) => {
            notImplemented(
                `Value: ${data[EAccountTrackerFieldsNames.tracker]}`,
            );
        };

        useEffect(() => {
            setSpaceTop(commonStore.headerHeight);
        }, [commonStore.headerHeight]);

        return (
            <div
                className={`${classPrefix}__wrapper`}
                style={{ position: "sticky", top: spaceTop + 20 }}
            >
                <H3>Order Tracker</H3>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${classPrefix}__form`}
                    >
                        <FieldInputController
                            name={EAccountTrackerFieldsNames.tracker}
                        />
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.orange}
                        >
                            Track
                        </ButtonPrimary>
                    </form>
                </FormProvider>
            </div>
        );
    }),
);

export default AccountTracker;
