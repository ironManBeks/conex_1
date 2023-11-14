import { FC, ReactNode } from "react";
import cn from "classnames";

import { H4, P } from "@components/Text";

import { TAccountOrderItem } from "@store/auth/types";
import { IconCalendar } from "@components/Icons";
import dayjs from "dayjs";

const AccountOrderItem: FC<
    TAccountOrderItem & { wrapperClassPrefix: string }
> = ({ id, wrapperClassPrefix, attributes }) => {
    const classPrefix = `${wrapperClassPrefix}_item`;
    // const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <div className={cn(`${classPrefix}__wrapper`)}>
            <div className={cn(`${classPrefix}__inner-wrapper`)}>
                <div className={cn(`${classPrefix}__title`)}>
                    <H4>
                        Order № {id}
                        {/* <CopyText text={id} /> */}
                    </H4>
                    {/* {moneyStatus && (
                        <P>
                            <IconPoint color="#FFD700" />
                            Your money’s being {moneyStatus}
                        </P>
                    )}
                    {orderStatus && (
                        <P>
                            <IconPoint color="#108700" />
                            Your order has been {orderStatus}
                        </P>
                    )} */}
                </div>
                <div className={cn(`${classPrefix}__info`)}>
                    <OrderInfoItem
                        title={`Order ${dayjs(attributes.createdAt).format(
                            "D MMMM",
                        )}`}
                        description={"Date of order"}
                        icon={<IconCalendar />}
                    />
                </div>
                {/* <div className={cn(`${classPrefix}__info`)}>
                    <OrderInfoItem
                        title={`Order ${dateOfOrder}`}
                        description={"Date of order"}
                        icon={<IconCalendar />}
                    />
                    <OrderInfoItem
                        title={orderAddress}
                        description={"Order adress"}
                        icon={<IconMapPoint />}
                    />
                </div>
                <AccountOrderStatus
                    wrapperClassName={cn(`${classPrefix}__status`)}
                    statusTimelapse={statusTimelapse}
                    onOpenChange={(value) => {
                        setIsOpen(value);
                    }}
                />
                <div className={cn(`${classPrefix}__actions`)}>
                    <ButtonLink
                        href={toSingleOrderPageId(id.toString())}
                        color={EButtonColor.secondary}
                    >
                        Read more
                    </ButtonLink>
                </div> */}
            </div>
        </div>
    );
};

export default AccountOrderItem;

const OrderInfoItem = ({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon?: ReactNode;
}) => {
    const classPrefix = "order-info-item";
    return (
        <div className={`${classPrefix}_wrapper`}>
            {icon && <div className={`${classPrefix}_icon`}>{icon}</div>}
            <div className={`${classPrefix}_text`}>
                <H4>{title}</H4>
                <P>{description}</P>
            </div>
        </div>
    );
};
