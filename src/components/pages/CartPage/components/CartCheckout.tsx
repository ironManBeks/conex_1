import { FC, useState } from "react";
import { useRouter } from "next/router";

import AdditionalServices from "@components/globalComponents/AdditionalServices";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ChoiceMode from "@components/globalComponents/ChoiceMode";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { ECartCheckoutModes } from "../types";
import { PATH_CHECKOUT_PAGE } from "@consts/pathsConsts";
import OrderSettingsLayout from "@components/order/OrderSettingsLayout";
import AddressSelection from "@components/globalComponents/AddressSelection";
import { AdditionalServicesOptionsMockup } from "../../../../mockups/AdditionalServicesOptionsMockup";

const CartCheckout: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_checkout`;
    const router = useRouter();

    const [selectedMode, setSelectedMode] = useState<ECartCheckoutModes>(
        ECartCheckoutModes.delivery,
    );
    const choiceModeOptions = [
        {
            label: "Delivery",
            value: ECartCheckoutModes.delivery,
            isActive: selectedMode === ECartCheckoutModes.delivery,
            onClick: () => setSelectedMode(ECartCheckoutModes.delivery),
        },
        {
            label: "Store Pickup",
            value: ECartCheckoutModes.storePickup,
            isActive: selectedMode === ECartCheckoutModes.storePickup,
            onClick: () => setSelectedMode(ECartCheckoutModes.storePickup),
        },
    ];

    return (
        <OrderSettingsLayout
            className={classPrefix}
            headContent={
                <ChoiceMode
                    options={choiceModeOptions}
                    className={classPrefix}
                />
            }
            bodyContent={
                selectedMode === ECartCheckoutModes.delivery && (
                    <>
                        {/*<AddressSelection*/}
                        {/*    className={classPrefix}*/}
                        {/*    errorMessage={undefined}*/}
                        {/*/>*/}
                        address
                    </>
                )
            }
            footerContent={
                <AdditionalServices
                    options={AdditionalServicesOptionsMockup}
                    totalOption={{
                        label: "Grand Total",
                        value: "$2,323.00",
                    }}
                />
            }
            footerActions={
                <ButtonPrimary
                    color={EButtonColor.primary}
                    onClick={() => router.push(PATH_CHECKOUT_PAGE)}
                >
                    Checkout
                </ButtonPrimary>
            }
        />
    );
};

export default CartCheckout;
