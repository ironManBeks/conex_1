import { FC } from "react";

import { P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TSingleProductOrderInfoProps } from "../types";
import CollapsibleBlockWithTitle from "@components/globalComponents/CollapsibleBlockWithTitle";
import PaymentIcon from "@components/globalComponents/PaymentIcon";

const SingleProductOrderInfo: FC<TSingleProductOrderInfoProps> = ({
    pageClassPrefix,
    delivery,
    payment,
}) => {
    const classPrefix = `${pageClassPrefix}_order-info`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            {delivery?.length && (
                <CollapsibleBlockWithTitle
                    title="Available for order"
                    defaultOpen={true}
                    wrapperClassName={"_delivery"}
                >
                    {delivery.map((item, index) => (
                        <div key={index} className={"delivery-item_wrapper"}>
                            {item.icon?.url && (
                                <ImgWrapper
                                    src={item.icon.url}
                                    alt={item.icon.alt}
                                />
                            )}
                            <P>
                                {item.name && <span>{item.name} </span>}
                                <span>${item.price}</span>{" "}
                                <span>{item.period}</span>
                            </P>
                        </div>
                    ))}
                </CollapsibleBlockWithTitle>
            )}
            {payment?.length && (
                <CollapsibleBlockWithTitle
                    title="Payment"
                    defaultOpen={true}
                    wrapperClassName={"_payment"}
                >
                    {payment.map((item, index) =>
                        item.icon?.url ? (
                            <PaymentIcon
                                key={index}
                                src={item.icon.url}
                                alt={item.icon.alt}
                                title={item.name}
                            />
                        ) : null,
                    )}
                </CollapsibleBlockWithTitle>
            )}
        </div>
    );
};
export default SingleProductOrderInfo;
