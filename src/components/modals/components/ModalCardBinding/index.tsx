import { FC, useEffect, useRef } from "react";
import { inject, observer } from "mobx-react";

import ModalLayout from "@components/modals/ModalLayout";

import { EModalSize } from "@components/modals/types";
import { notImplemented } from "@helpers/notImplemented";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";
import { isEmpty } from "lodash";
import {
    EPaymentCardFromFieldsNames,
    paymentCardFromDefaultValues,
    TPaymentCardForm,
} from "@components/globalComponents/PaymentCardForm/formAttrs";
import { addZeroBefore } from "@helpers/textHelpers";
import { IPaymentCardFormRef } from "@components/globalComponents/PaymentCardForm/types";

const ModalCardBinding: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "modal-card-binding";
        const { commonStore, authStore } = store as IRoot;
        const { modalCardBindingVisible, setModalCardBindingVisible } =
            commonStore;
        const { selectedCard, setSelectedCard } = authStore;
        const isEdit = !isEmpty(selectedCard);
        const formRef = useRef<IPaymentCardFormRef>(null);

        const handleCloseModal = () => {
            setModalCardBindingVisible(false);
            setSelectedCard(null);
            if (formRef?.current) {
                formRef.current.reset(
                    paymentCardFromDefaultValues as TPaymentCardForm,
                );
            }
        };

        useEffect(() => {
            if (modalCardBindingVisible && formRef?.current && isEdit) {
                formRef.current.reset({
                    [EPaymentCardFromFieldsNames.cardNumber]:
                        selectedCard?.cardNumber,
                    [EPaymentCardFromFieldsNames.cvv]: selectedCard?.cvv,
                    [EPaymentCardFromFieldsNames.expDate]: `${addZeroBefore(
                        selectedCard?.expMonth,
                    )}/${selectedCard?.expYear}`,
                });
            }
        }, [modalCardBindingVisible]);

        return (
            <ModalLayout
                wrapperClassName={classPrefix}
                modalVisible={modalCardBindingVisible}
                handleCancel={handleCloseModal}
                modalSize={EModalSize.sm}
                title={"Card binding"}
                bodyContent={
                    <PaymentCardForm
                        reference={formRef}
                        className={`${classPrefix}__form`}
                        submitText={isEdit ? "Save changes" : "Add to card"}
                        onSuccessfulSubmit={(data) => {
                            notImplemented(`value: ${JSON.stringify(data)}`);
                            handleCloseModal();
                        }}
                    />
                }
            />
        );
    }),
);

export default ModalCardBinding;
