import { FC, ReactNode, useState } from "react";
import cn from "classnames";

import { H4, P } from "@components/Text";
import { IconCalendar, IconMapPoint, IconPoint } from "@components/Icons";
import CopyText from "@components/globalComponents/CopyText";
import ButtonLink from "@components/buttons/ButtonLink";
import AccountOrderStatus from "../../AccountOrderStatus";

import { EButtonColor } from "@components/buttons/types";
import { TAccountOrderItem } from "@store/auth/types";
import { PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import {
    AccountOrderIdKey,
    AccountTabKey,
} from "@components/pages/AccountPage/consts";
import { EAccountTabsPaths } from "@components/pages/AccountPage/types";

const AccountOrderItem: FC<
    TAccountOrderItem & { wrapperClassPrefix: string }
> = ({
    id,
    wrapperClassPrefix,
    orderNumber,
    dateOfOrder,
    orderAddress,
    orderStatus,
    moneyStatus,
    statusTimelapse,
}) => {
    const classPrefix = `${wrapperClassPrefix}__item`;
    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <div className={cn(`${classPrefix} _wrapper`)}>
            <div
                className={cn(`${classPrefix} _inner-wrapper`, {
                    _open: isOpen,
                })}
            >
                <div className={cn(`${classPrefix} _title`)}>
                    <H4>
                        Order № {orderNumber}
                        <CopyText text={orderNumber} />
                    </H4>
                    {moneyStatus && (
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
                    )}
                </div>
                <div className={cn(`${classPrefix} _info`)}>
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
                    wrapperClassName={cn(`${classPrefix} _status`)}
                    statusTimelapse={statusTimelapse}
                    onOpenChange={(value) => {
                        setIsOpen(value);
                    }}
                />
                <div className={cn(`${classPrefix} _actions`)}>
                    <ButtonLink
                        href={{
                            pathname: PATH_MY_ACCOUNT_PAGE,
                            query: {
                                [AccountTabKey]: EAccountTabsPaths.orders,
                                [AccountOrderIdKey]: id,
                            },
                        }}
                        color={EButtonColor.secondary}
                    >
                        Read more
                    </ButtonLink>
                </div>
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
