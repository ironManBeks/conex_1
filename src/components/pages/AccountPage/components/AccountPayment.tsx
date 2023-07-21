import { FC, Fragment } from "react";

import { IconMastercard } from "@components/Icons";
import { H2, P } from "@components/Text";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TAccountPaymentItem } from "@components/pages/AccountPage/types";
import { IconPlusCircle } from "@components/Icons";
import { paymentCardNumberMask } from "@helpers/textMaskHelper";

const paymentCardMockup: TAccountPaymentItem[] = [
    {
        name: "123",
        cardNumber: "3456879667696907",
        expMonth: "05",
        expYear: "23",
    },
    {
        name: "123456789 qwertyuiop",
        cardNumber: "3456879667696907",
        expMonth: "11",
        expYear: "22",
    },
    {
        name: "123456789qwertyuiop",
        cardNumber: "3456879667696907",
        expMonth: "00",
        expYear: "00",
    },
];

const AccountPayment: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_payment`;

    return (
        <Fragment>
            <H2>Saved Payment</H2>
            <div className={`${classPrefix}__wrapper`}>
                {paymentCardMockup.map((item, index) => (
                    <AccountPaymentItem
                        key={index}
                        classPrefix={classPrefix}
                        name={item.name}
                        cardNumber={item.cardNumber}
                        expMonth={item.expMonth}
                        expYear={item.expYear}
                    />
                ))}
                <div className={`${classPrefix}__item _wrapper _add`}>
                    <IconPlusCircle width={24} height={24} color="#F79225" />
                </div>
            </div>
        </Fragment>
    );
};

export default AccountPayment;

const AccountPaymentItem: FC<TAccountPaymentItem & { classPrefix: string }> = ({
    classPrefix,
    name,
    cardNumber,
    expMonth,
    expYear,
}) => {
    return (
        <div className={`${classPrefix}__item _wrapper`}>
            <IconMastercard />
            <div className={`${classPrefix}__item _info`}>
                <span>Name</span>
                <P>{name}</P>
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
                        {expMonth} / {expYear}
                    </P>
                </div>
            </div>
        </div>
    );
};
