import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";

import { H2, P } from "@components/Text";
import { IconTrash } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { paymentCardNumberMask } from "@helpers/textMaskHelper";
import { TAuthPaymentCard } from "@store/auth/types";
import {
    CARD_ICON,
    CARD_NAME,
    CARDS_LIST,
    EPaymentCardNames,
} from "@components/globalComponents/PaymentCardForm/consts";
import { findDebitCardType } from "@helpers/paymentMethodHelpers";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import AccountSectionWrapper from "@components/pages/AccountPage/components/AccountSectionWrapper";
import ModalCardBinding from "@components/modals/components/ModalCardBinding";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import { notImplemented } from "@helpers/notImplemented";
import { isFunction } from "lodash";

const AccountPayment: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_payment`;
        const { authStore, commonStore } = store as IRoot;

        const { userCardsData, setSelectedCard } = authStore;

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Payment methods</H2>
                <AccountSectionWrapper pageClassPrefix={pageClassPrefix}>
                    <div className={`${classPrefix}__list`}>
                        {userCardsData?.map((item) => (
                            <AccountPaymentItem
                                key={item.id}
                                id={item.id}
                                classPrefix={classPrefix}
                                cvv={item.cvv}
                                cardNumber={item.cardNumber}
                                expMonth={item.expMonth}
                                expYear={item.expYear}
                                onDelete={() => {
                                    commonStore.setModalConfirmVisible(true);
                                    commonStore.setConfirmModalData(item);
                                }}
                                onClick={() => {
                                    setSelectedCard(item);
                                    commonStore.setModalCardBindingVisible(
                                        true,
                                    );
                                }}
                            />
                        ))}
                    </div>
                </AccountSectionWrapper>
                <div className={`${classPrefix}__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={() => {
                            commonStore.setModalCardBindingVisible(true);
                        }}
                    >
                        Add new card
                    </ButtonPrimary>
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
            </div>
        );
    }),
);

export default AccountPayment;

const AccountPaymentItem: FC<
    TAuthPaymentCard & {
        classPrefix: string;
        onDelete: (id: string) => void;
        onClick?: (id: string) => void;
    }
> = observer(({ id, classPrefix, cardNumber, onDelete, onClick }) => {
    const [cardType, setCardType] = useState<EPaymentCardNames | undefined>();

    useEffect(() => {
        setCardType(findDebitCardType(cardNumber));
    }, [cardNumber]);

    const cardIconContent = cardType && CARDS_LIST.includes(cardType) && (
        <ImgWrapper src={CARD_ICON[cardType]} width={44} objectFit="contain" />
    );
    const cardNumberContent = paymentCardNumberMask(cardNumber, true);
    const deleteButtonContent = (
        <ButtonPrimary
            color={EButtonColor.transparent}
            className={`${classPrefix}__item _delete`}
            onClick={(e) => {
                e?.stopPropagation();
                onDelete(id);
            }}
        >
            <IconTrash />
        </ButtonPrimary>
    );

    return (
        <div className={`${classPrefix}__item _wrapper`}>
            <div
                className={`${classPrefix}__item _inner-wrapper`}
                onClick={() => {
                    if (isFunction(onClick)) {
                        onClick(id);
                    }
                }}
            >
                <div className={`${classPrefix}__item _content`}>
                    <div className={`${classPrefix}__item _icon`}>
                        {cardIconContent}
                    </div>
                    <div className={`${classPrefix}__item _info`}>
                        <P>
                            <span>
                                {cardType ? CARD_NAME[cardType] : "Card"}
                            </span>
                            {cardNumberContent}
                        </P>
                    </div>
                </div>
                <div className={`${classPrefix}__item _actions`}>
                    {deleteButtonContent}
                </div>
            </div>
        </div>
    );
});
