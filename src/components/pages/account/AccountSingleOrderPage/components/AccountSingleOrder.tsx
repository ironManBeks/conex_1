import { FC, ReactNode } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";

import AccountSectionWrapper from "../../components/AccountSectionWrapper";
import { H3, H4, P } from "@components/Text";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import AccountOrderStatus from "../../components/AccountOrderStatus";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";

const AccountSingleOrder: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userSingleOrderData } = authStore;

        return (
            <>
                <AccountSectionWrapper className={`${pageClassPrefix}_head`}>
                    <HeadInfoItem
                        label="Order number"
                        value={userSingleOrderData?.orderNumber}
                    />
                    <HeadInfoItem
                        label="Total"
                        value={`$${userSingleOrderData?.total}`}
                    />
                    <HeadInfoItem
                        label="Payment method"
                        value={userSingleOrderData?.paymentMethod}
                    />
                </AccountSectionWrapper>
                <AccountSectionWrapper
                    className={`${pageClassPrefix}_section-wrapper`}
                >
                    <H3>Order details</H3>{" "}
                    {userSingleOrderData?.details?.length && (
                        <div className={`${pageClassPrefix}_details`}>
                            <H4>Your order</H4>
                            <div className={`${pageClassPrefix}_list`}>
                                {userSingleOrderData.details.map(
                                    (item, index) => (
                                        <DetailsItem
                                            key={index}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                    {userSingleOrderData?.statusTimelapse && (
                        <AccountOrderStatus
                            wrapperClassName={`${pageClassPrefix}_status`}
                            statusTimelapse={
                                userSingleOrderData.statusTimelapse
                            }
                        />
                    )}
                    <div className={`${pageClassPrefix}_images`}>
                        <ImgWrapper
                            src="https://conexwest-doors.opserver.store/uploads/metal_door_0d3db7abc9.jpg"
                            alt={"Door image"}
                        />
                        <ImgWrapper
                            src="https://conexwest-doors.opserver.store/uploads/metal_door_0d3db7abc9.jpg"
                            alt={"Door image"}
                        />
                        <ImgWrapper
                            src="https://conexwest-doors.opserver.store/uploads/metal_building_steel_walk_door_d1546ca57e.jpg"
                            alt={"Door image"}
                        />
                    </div>
                    <AdditionalServices
                        className={`${pageClassPrefix}_services`}
                        options={[
                            {
                                label: "Subtotal:",
                                value: `$${userSingleOrderData?.subtotal}`,
                            },
                            {
                                label: "Payment method:",
                                value: `${userSingleOrderData?.paymentMethod}`,
                            },
                        ]}
                        totalOption={{
                            label: "Total:",
                            value: `$${userSingleOrderData?.total}`,
                        }}
                    />
                </AccountSectionWrapper>
            </>
        );
    }),
);

export default AccountSingleOrder;

const HeadInfoItem = ({
    label,
    value,
    className,
}: {
    label: string;
    value: ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(className, "single-order_head__item")}>
            <P>{label}:</P>
            <H4>{value}</H4>
        </div>
    );
};

const DetailsItem = ({
    label,
    value,
    className,
}: {
    label: string;
    value: ReactNode;
    className?: string;
}) => {
    return (
        <P className={cn(className, "single-order_details__item")}>
            <b>{label}:</b>
            <span>{value}</span>
        </P>
    );
};
