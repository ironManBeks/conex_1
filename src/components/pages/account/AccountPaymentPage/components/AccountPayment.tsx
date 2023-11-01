import React, { FC } from "react";
import { inject, observer } from "mobx-react";

import ModalCardBinding from "@components/modals/components/ModalCardBinding";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import PaymentCard from "@components/globalComponents/PaymentCard";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { notImplemented } from "@helpers/notImplemented";

const AccountPayment: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore, commonStore } = store as IRoot;

        const { userCardsData, setSelectedCard } = authStore;
        const {
            setModalConfirmVisible,
            setConfirmModalData,
            setModalCardBindingVisible,
        } = commonStore;

        return (
            <>
                <div className={`${pageClassPrefix}_list`}>
                    {userCardsData?.length ? (
                        userCardsData?.map((item) => (
                            <PaymentCard
                                key={item.id}
                                id={item.id}
                                cvv={item.cvv}
                                cardNumber={item.cardNumber}
                                expMonth={item.expMonth}
                                expYear={item.expYear}
                                onDelete={() => {
                                    setModalConfirmVisible(true);
                                    setConfirmModalData(item);
                                }}
                                onClick={() => {
                                    setSelectedCard(item);
                                    setModalCardBindingVisible(true);
                                }}
                            />
                        ))
                    ) : (
                        <div className={`${pageClassPrefix}_empty`}>
                            You haven’t saved any cards yet
                        </div>
                    )}
                </div>
                <ModalCardBinding />
                <ModalConfirm
                    title="Do you want to remove the card?"
                    confirmColor={EButtonColor.primary}
                    onConfirm={(confirmModalData) => {
                        notImplemented(
                            `value: ${JSON.stringify(confirmModalData)}`,
                        );
                    }}
                />
            </>
        );
    }),
);

export default AccountPayment;
