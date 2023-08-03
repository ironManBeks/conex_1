import { FC, Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { H2, P } from "@components/Text";
import { IconPlusCircle, IconTrash } from "@components/Icons";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { paymentCardNumberMask } from "@helpers/textMaskHelper";
import { TAuthPaymentCard } from "@store/stores/auth/types";
import { useRootStore } from "@store";
import { addZeroBefore } from "@helpers/textHelpers";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import {
    CARD_ICON,
    CARDS_LIST,
    EPaymentCardNames,
} from "@components/globalComponents/PaymentCardForm/consts";
import { findDebitCardType } from "@helpers/paymentMethodHelpers";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import { toJS } from "mobx";

const AccountPayment: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_payment`;
    const { authStore, commonStore } = useRootStore();
    const { authData } = authStore;
    const [formVisible, setFormVisible] = useState(false);

    const handleFormVisible = (val: boolean) => {
        setFormVisible(val);
    };

    return (
        <Fragment>
            <H2 className={`${classPrefix}__title`}>Saved Payment</H2>
            <div className={`${classPrefix}__wrapper`}>
                {authData?.cards.map((item) => (
                    <AccountPaymentItem
                        key={item.id}
                        id={item.id}
                        classPrefix={classPrefix}
                        name={item.name}
                        cardNumber={item.cardNumber}
                        expMonth={item.expMonth}
                        expYear={item.expYear}
                        onDelete={() => {
                            commonStore.setModalConfirmVisible(true);
                            commonStore.setConfirmModalData(item);
                        }}
                    />
                ))}
                <div className={`${classPrefix}__add _wrapper`}>
                    {formVisible ? (
                        <PaymentCardForm
                            className={`${classPrefix}__form`}
                            submitText="Add card"
                            actionsContent={
                                <ButtonPrimary
                                    onClick={() => handleFormVisible(false)}
                                    size={EButtonSize.sm}
                                >
                                    Close
                                </ButtonPrimary>
                            }
                        />
                    ) : (
                        <div
                            className={`${classPrefix}__add _inner-wrapper`}
                            onClick={() => handleFormVisible(!formVisible)}
                        >
                            <IconPlusCircle
                                width={24}
                                height={24}
                                color="#F79225"
                            />
                        </div>
                    )}
                </div>
            </div>
            <ModalConfirm
                text="Do you want to remove the card?"
                confirmColor={EButtonColor.danger}
                onConfirm={(confirmModalData) => {
                    notImplemented(
                        `value: ${JSON.stringify(confirmModalData)}`,
                    );
                }}
            />
        </Fragment>
    );
});

export default AccountPayment;

const AccountPaymentItem: FC<
    TAuthPaymentCard & { classPrefix: string; onDelete: (id: string) => void }
> = observer(
    ({ id, classPrefix, name, cardNumber, expMonth, expYear, onDelete }) => {
        const [cardType, setCardType] = useState<
            EPaymentCardNames | undefined
        >();

        useEffect(() => {
            setCardType(findDebitCardType(cardNumber));
        }, [cardNumber]);

        return (
            <div className={`${classPrefix}__item _wrapper`}>
                <div className={`${classPrefix}__item _inner-wrapper`}>
                    {cardType && CARDS_LIST.includes(cardType) && (
                        <ImgWrapper
                            src={CARD_ICON[cardType]}
                            width={50}
                            height={24}
                        />
                    )}
                    <ButtonPrimary
                        color={EButtonColor.transparent}
                        className={`${classPrefix}__item _delete`}
                        onClick={() => onDelete(id)}
                    >
                        <IconTrash />
                    </ButtonPrimary>
                    <div className={`${classPrefix}__item _info`}>
                        <span>Name</span>
                        <P>{name.toUpperCase()}</P>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: "30px",
                        }}
                    >
                        <div
                            className={`${classPrefix}__item _info`}
                            style={{
                                marginRight: "30px",
                            }}
                        >
                            <span>Card Number</span>
                            <P>{paymentCardNumberMask(cardNumber)}</P>
                        </div>
                        <div className={`${classPrefix}__item _info`}>
                            <span>Exp date</span>
                            <P>
                                {addZeroBefore(expMonth)} /{" "}
                                {addZeroBefore(expYear)}
                            </P>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);
