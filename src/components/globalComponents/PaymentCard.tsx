import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { isFunction } from "lodash";
import cn from "classnames";

import { P } from "@components/Text";
import { IconTrash } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import {
    CARD_ICON,
    CARD_NAME,
    CARDS_LIST,
    EPaymentCardNames,
} from "@components/globalComponents/PaymentCardForm/consts";
import { findDebitCardType } from "@helpers/paymentMethodHelpers";
import { paymentCardNumberMask } from "@helpers/textMaskHelper";
import { EButtonColor } from "@components/buttons/types";
import { TPaymentCard } from "./types";

const PaymentCard: FC<
    TPaymentCard & {
        className?: string;
        isActive?: boolean;
        onDelete: (id: string) => void;
        onClick?: (id: string) => void;
    }
> = observer(({ id, className, cardNumber, onDelete, onClick, isActive }) => {
    const [cardType, setCardType] = useState<EPaymentCardNames | undefined>();

    const classPrefix = "payment-card";

    useEffect(() => {
        setCardType(findDebitCardType(cardNumber));
    }, [cardNumber]);

    const cardIconContent = cardType && CARDS_LIST.includes(cardType) && (
        <ImgWrapper src={CARD_ICON[cardType]} width={44} alt={"Card"} />
    );
    const cardNumberContent = paymentCardNumberMask(cardNumber, true);
    const deleteButtonContent = (
        <ButtonPrimary
            color={EButtonColor.transparent}
            className={`${classPrefix}_delete`}
            onClick={(e) => {
                e?.stopPropagation();
                onDelete(id);
            }}
        >
            <IconTrash width={24} height={24} />
        </ButtonPrimary>
    );

    return (
        <div
            className={cn(`${classPrefix}_wrapper`, className, {
                _active: isActive,
            })}
        >
            <div
                className={`${classPrefix}_inner-wrapper`}
                onClick={() => {
                    if (isFunction(onClick)) {
                        onClick(id);
                    }
                }}
            >
                <div className={`${classPrefix}_content`}>
                    <div className={`${classPrefix}_icon`}>
                        {cardIconContent}
                    </div>
                    <div className={`${classPrefix}_info`}>
                        <P>
                            <b>{cardType ? CARD_NAME[cardType] : "Card"}</b>
                            <span>{cardNumberContent}</span>
                        </P>
                    </div>
                </div>
                <div className={`${classPrefix}_actions`}>
                    {deleteButtonContent}
                </div>
            </div>
        </div>
    );
});

export default PaymentCard;
