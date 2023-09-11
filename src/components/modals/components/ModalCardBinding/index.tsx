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
// import {
//     customQuoteDefaultValues,
//     customQuoteFormResolver,
//     ECustomQuoteFieldsNames,
//     TCustomQuoteForm,
// } from "./formAttrs";
import { phoneNumberMask } from "@consts/masksConsts";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";

const ModalCardBinding: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "modal-card-binding";
        const { commonStore } = store as IRoot;
        const { modalCardBindingVisible, setModalCardBindingVisible } =
            commonStore;
        const [addressValue, setAddressValue] = useState<string>("");

        // const methods = useForm<TCustomQuoteForm>({
        //     resolver: customQuoteFormResolver(),
        //     defaultValues: customQuoteDefaultValues,
        // });

        // const {
        //     handleSubmit,
        //     formState: { errors },
        //     setValue,
        //     reset,
        // } = methods;

        // useEffect(() => {
        //     setValue(ECustomQuoteFieldsNames.address, addressValue);
        // }, [addressValue]);

        // const onSubmit: SubmitHandler<TCustomQuoteForm> = (data) => {
        //     notImplemented(`value: ${JSON.stringify(data)}`);
        //     handleCloseModal();
        // };

        const handleCloseModal = () => {
            setModalCardBindingVisible(false);
            // reset();
        };

        return (
            <ModalLayout
                wrapperClassName={classPrefix}
                modalVisible={modalCardBindingVisible}
                handleCancel={handleCloseModal}
                modalSize={EModalSize.sm}
                title={"Card binding"}
                bodyContent={
                    <>
                        <PaymentCardForm
                            className={`${classPrefix}__form`}
                            submitText="Add to card"
                            onSuccessfulSubmit={(data) => {
                                notImplemented(
                                    `value: ${JSON.stringify(data)}`,
                                );
                                handleCloseModal();
                            }}
                        />
                    </>
                }
            />
        );
    }),
);

export default ModalCardBinding;
