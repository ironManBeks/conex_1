import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Transition, TransitionStatus } from "react-transition-group";
import CSS from "csstype";

import { H4, H5, P } from "@components/Text";
import { IconPoint } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import CopyText from "@components/globalComponents/CopyText";

import { notImplemented } from "@helpers/notImplemented";
import { TAccountOrderItem } from "@components/pages/AccountPage/types";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { ColorTheme } from "@common/theme/colorTheme";

const AccountOrderItem: FC<TAccountOrderItem & { classPrefix: string }> = ({
    classPrefix,
    orderNumber,
    orderPlaced,
    orderProcessed,
    manufacturing,
    shipped,
    deliveryWillCompleted,
    address,
    status,
}) => {
    const listRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [listHeight, setListHeight] = useState<number>(0);

    const handleOpen = (val: boolean) => {
        setIsOpen(val);
    };

    const listTransitionStyles: Partial<
        Record<TransitionStatus, CSS.Properties>
    > = {
        entering: { height: `${listHeight}px` },
        entered: { height: `${listHeight}px` },
        exiting: { height: 0 },
        exited: { height: 0 },
    };

    useEffect(() => {
        setTimeout(() => {
            if (listRef?.current) {
                setListHeight(listRef?.current?.getBoundingClientRect().height);
            }
        }, 300);
    }, [listRef, listRef?.current?.getBoundingClientRect().height]);

    return (
        <div
            className={cn(`${classPrefix}__item _wrapper`, {
                _open: isOpen,
            })}
            onClick={() => {
                if (!isOpen) handleOpen(true);
            }}
        >
            <div
                className={cn(`${classPrefix}__item _inner-wrapper`, {
                    _open: isOpen,
                })}
                onClick={() => {
                    if (isOpen) handleOpen(false);
                }}
            >
                <H5>Order number</H5>
                <H4>
                    {orderNumber}
                    <CopyText text={orderNumber} />
                </H4>
                <Transition in={isOpen} timeout={0}>
                    {(state) => (
                        <div
                            style={{
                                transition: "all 0.3s",
                                transitionProperty: "height",
                                overflow: "hidden",
                                marginBottom: isOpen ? "20px" : 0,
                                ...listTransitionStyles[state],
                            }}
                        >
                            <ul ref={listRef}>
                                <OrderInfoListItem
                                    label="Order is placed"
                                    value={orderPlaced}
                                />
                                <OrderInfoListItem
                                    label="Order processed"
                                    value={orderProcessed}
                                />
                                <OrderInfoListItem
                                    label="Manufacturing"
                                    value={manufacturing}
                                />
                                <OrderInfoListItem
                                    label="Shipped"
                                    value={shipped}
                                />
                            </ul>
                        </div>
                    )}
                </Transition>
                <P className="item_address">
                    <IconPoint
                        color={isOpen ? ColorTheme.green._500 : "#8D8D8D"}
                    />
                    {address}
                    <span>{status}</span>
                </P>
                <P className="item_delivery">
                    <span className="label">Delivery will be completed by</span>
                    <span className="value">{deliveryWillCompleted}</span>
                </P>
            </div>
            <OrderLiveTracking classPrefix={classPrefix} isVisible={isOpen} />
        </div>
    );
};

export default AccountOrderItem;

const OrderInfoListItem = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => {
    return (
        <li>
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </li>
    );
};

const OrderLiveTracking = ({
    classPrefix,
    isVisible,
}: {
    classPrefix: string;
    isVisible: boolean;
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapHeight, setMapHeight] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            if (mapRef?.current) {
                setMapHeight(mapRef?.current?.getBoundingClientRect().height);
            }
        }, 300);
    }, [mapRef, mapRef?.current?.getBoundingClientRect().height]);

    const transitionStyles: Partial<Record<TransitionStatus, CSS.Properties>> =
        {
            entering: { height: `${mapHeight}px` },
            entered: { height: `${mapHeight}px` },
            exiting: { height: 0 },
            exited: { height: 0 },
        };

    return (
        <Transition in={isVisible} timeout={0}>
            {(state) => (
                <div
                    style={{
                        transition: "all 0.3s",
                        transitionProperty: "height",
                        overflow: "hidden",
                        ...transitionStyles[state],
                    }}
                >
                    <div className="item_map__wrapper" ref={mapRef}>
                        <H5>Live Tracking</H5>
                        <iframe
                            width="100%"
                            height="210"
                            className="gmap_iframe"
                            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        />
                        <div className="item_map__actions">
                            <ButtonPrimary
                                onClick={() => notImplemented()}
                                color={EButtonColor.primary}
                            >
                                Manage order
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    );
};
