import { FC } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";

import AccountOrderItem from "./AccountOrderItem";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";

const AccountOrders: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userOrdersData } = authStore;

        return (
            <>
                <div className={`${pageClassPrefix}_list`}>
                    {userOrdersData?.length ? (
                        userOrdersData.map((item) => (
                            <AccountOrderItem
                                key={item.id}
                                wrapperClassPrefix={pageClassPrefix}
                                id={item.id}
                                orderNumber={item.orderNumber}
                                dateOfOrder={item.dateOfOrder}
                                orderAddress={item.orderAddress}
                                orderStatus={item.orderStatus}
                                moneyStatus={item.moneyStatus}
                                statusTimelapse={item.statusTimelapse}
                            />
                        ))
                    ) : (
                        <Empty
                            style={{
                                width: "100%",
                                minHeight: "50vh",
                            }}
                        />
                    )}
                </div>
            </>
        );
    }),
);

export default AccountOrders;
