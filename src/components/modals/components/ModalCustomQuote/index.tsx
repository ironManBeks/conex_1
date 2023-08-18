import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { H2 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ModalLayout from "@components/modals/ModalLayout";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";
import AddressSelection from "@components/globalComponents/AddressSelection";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";

import { EModalSize } from "@components/modals/types";
import { EButtonColor } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import {
    customQuoteDefaultValues,
    customQuoteFormResolver,
    ECustomQuoteFieldsNames,
    TCustomQuoteForm,
} from "./formAttrs";
import { phoneNumberMask } from "@consts/masksConsts";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";

const ModalCustomQuote: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "modal-custom-quote";
        const { commonStore } = store as IRoot;
        const { modalCustomQuoteVisible, setModalCustomQuoteVisible } =
            commonStore;
        const [addressValue, setAddressValue] = useState<string>("");

        const methods = useForm<TCustomQuoteForm>({
            resolver: customQuoteFormResolver(),
            defaultValues: customQuoteDefaultValues,
        });

        const {
            handleSubmit,
            formState: { errors },
            setValue,
            reset,
        } = methods;

        useEffect(() => {
            setValue(ECustomQuoteFieldsNames.address, addressValue);
        }, [addressValue]);

        const onSubmit: SubmitHandler<TCustomQuoteForm> = (data) => {
            notImplemented(`value: ${JSON.stringify(data)}`);
            handleCloseModal();
        };

        const handleCloseModal = () => {
            setModalCustomQuoteVisible(false);
            reset();
        };

        return (
            <ModalLayout
                wrapperClassName={classPrefix}
                modalVisible={modalCustomQuoteVisible}
                handleCancel={handleCloseModal}
                modalSize={EModalSize.lg}
                bodyContent={
                    <>
                        <H2>Custom quote</H2>
                        <FormProvider {...methods}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className={`${classPrefix}_form`}
                            >
                                <div
                                    className={`${classPrefix}_form__main-fields`}
                                >
                                    <FieldInputController
                                        name={ECustomQuoteFieldsNames.name}
                                        placeholder="Your name"
                                        label="Your name"
                                    />
                                    <FieldInputMaskController
                                        name={ECustomQuoteFieldsNames.phone}
                                        placeholder="Phone number"
                                        label="Phone number"
                                        mask={phoneNumberMask}
                                    />
                                </div>
                                <AddressSelection
                                    className={classPrefix}
                                    name={ECustomQuoteFieldsNames.address}
                                    label="Delivery address"
                                    onValueChange={(value) =>
                                        setAddressValue(value)
                                    }
                                    errorMessage={
                                        errors[ECustomQuoteFieldsNames.address]
                                            ?.message
                                    }
                                />
                                <FieldTextAreaController
                                    name={
                                        ECustomQuoteFieldsNames.additionalDetails
                                    }
                                    placeholder="Additional details"
                                    label="Additional details"
                                    minHeight={140}
                                    maxSymbolLength={1000}
                                />
                                <div className={`${classPrefix}_actions`}>
                                    <ButtonPrimary
                                        type="submit"
                                        color={EButtonColor.primary}
                                        withShadow={false}
                                    >
                                        Send request
                                    </ButtonPrimary>
                                </div>
                            </form>
                        </FormProvider>
                    </>
                }
            />
        );
    }),
);

export default ModalCustomQuote;
