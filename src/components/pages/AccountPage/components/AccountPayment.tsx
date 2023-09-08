import { FC, Fragment, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { useMediaQuery } from "react-responsive";

import { H2, P } from "@components/Text";
import { IconPlusCircle, IconTrash } from "@components/Icons";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { paymentCardNumberMask } from "@helpers/textMaskHelper";
import { TAuthPaymentCard } from "@store/auth/types";
import { addZeroBefore } from "@helpers/textHelpers";
import {
    CARD_ICON,
    CARDS_LIST,
    EPaymentCardNames,
} from "@components/globalComponents/PaymentCardForm/consts";
import { findDebitCardType } from "@helpers/paymentMethodHelpers";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";
import { DEFAULT_ICON_COLOR } from "@components/Icons/consts";
import { IRoot } from "@store/store";
import AccountSectionWrapper from "@components/pages/AccountPage/components/AccountSectionWrapper";

const AccountPayment: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_payment`;
        const { authStore, commonStore } = store as IRoot;

        const { accountData } = authStore;
        const [formVisible, setFormVisible] = useState(false);

        const handleFormVisible = (val: boolean) => {
            setFormVisible(val);
        };

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Payment methods</H2>
                <AccountSectionWrapper pageClassPrefix={pageClassPrefix}>
                    list
                    {accountData?.cards.map((item) => (
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
                </AccountSectionWrapper>
                {/*<div className={`${classPrefix}__wrapper`}>*/}
                {/*    <div className={`${classPrefix}__add _wrapper`}>*/}
                {/*        {formVisible ? (*/}
                {/*            <PaymentCardForm*/}
                {/*                className={`${classPrefix}__form`}*/}
                {/*                submitText="Add card"*/}
                {/*                actionsContent={*/}
                {/*                    <ButtonPrimary*/}
                {/*                        onClick={() => handleFormVisible(false)}*/}
                {/*                        size={EButtonSize.sm}*/}
                {/*                    >*/}
                {/*                        Close*/}
                {/*                    </ButtonPrimary>*/}
                {/*                }*/}
                {/*            />*/}
                {/*        ) : (*/}
                {/*            <div*/}
                {/*                className={`${classPrefix}__add _inner-wrapper`}*/}
                {/*                onClick={() => handleFormVisible(!formVisible)}*/}
                {/*            >*/}
                {/*                {isMobile ? (*/}
                {/*                    "Add a new card"*/}
                {/*                ) : (*/}
                {/*                    <IconPlusCircle*/}
                {/*                        width={24}*/}
                {/*                        height={24}*/}
                {/*                        color="#F79225"*/}
                {/*                    />*/}
                {/*                )}*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<ModalConfirm*/}
                {/*    text="Do you want to remove the card?"*/}
                {/*    confirmColor={EButtonColor.danger}*/}
                {/*    onConfirm={(confirmModalData) => {*/}
                {/*        notImplemented(*/}
                {/*            `value: ${JSON.stringify(confirmModalData)}`,*/}
                {/*        );*/}
                {/*    }}*/}
                {/*/>*/}
            </div>
        );
    }),
);

export default AccountPayment;

const AccountPaymentItem: FC<
    TAuthPaymentCard & { classPrefix: string; onDelete: (id: string) => void }
> = observer(
    ({ id, classPrefix, name, cardNumber, expMonth, expYear, onDelete }) => {
        const [cardType, setCardType] = useState<
            EPaymentCardNames | undefined
        >();

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        useEffect(() => {
            setCardType(findDebitCardType(cardNumber));
        }, [cardNumber]);

        const cardIconContent = cardType && CARDS_LIST.includes(cardType) && (
            <ImgWrapper src={CARD_ICON[cardType]} width={50} height={24} />
        );
        const cardNumberContent = <P>{paymentCardNumberMask(cardNumber)}</P>;
        const deleteButtonContent = (
            <ButtonPrimary
                color={EButtonColor.transparent}
                className={`${classPrefix}__item _delete`}
                onClick={() => onDelete(id)}
            >
                <IconTrash color={isMobile ? "#A4A3A3" : DEFAULT_ICON_COLOR} />
            </ButtonPrimary>
        );

        const ItemLayout: FC = ({ children }) => {
            return (
                <div className={`${classPrefix}__item _wrapper`}>
                    <div className={`${classPrefix}__item _inner-wrapper`}>
                        {children}
                    </div>
                </div>
            );
        };

        return isMobile ? (
            <ItemLayout>
                {cardIconContent}
                {cardNumberContent}
                {deleteButtonContent}
            </ItemLayout>
        ) : (
            <ItemLayout>
                <>
                    {cardIconContent}
                    {deleteButtonContent}
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
                            {cardNumberContent}
                        </div>
                        <div className={`${classPrefix}__item _info`}>
                            <span>Exp date</span>
                            <P>
                                {addZeroBefore(expMonth)} /{" "}
                                {addZeroBefore(expYear)}
                            </P>
                        </div>
                    </div>
                </>
            </ItemLayout>
        );
    },
);
