import { FC, useState } from "react";

import FormFieldInput from "@components/form/formFields/FormFieldInput";
import { P } from "@components/Text";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ChoiceMode from "@components/globalComponents/ChoiceMode";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TAdditionalServicesOption } from "@components/globalComponents/types";
import { EButtonColor } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { ECartCheckoutModes } from "../types";
import IconPoint from "../../../Icons/common/IconPoint";

const CartCheckout: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_checkout`;

    const [selectedMode, setSelectedMode] = useState<ECartCheckoutModes>(
        ECartCheckoutModes.delivery,
    );

    const additionalServicesOptions: TAdditionalServicesOption[] = [
        { label: "Shipping cost", value: "$123.00" },
        { label: "TAX", value: "$33.46" },
        { label: "Additional charges", value: "$23.00" },
    ];

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
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__inner-wrapper`}>
                <div className={`${classPrefix}__head`}>
                    <ChoiceMode options={choiceModeOptions} />
                </div>
                {selectedMode === ECartCheckoutModes.delivery && (
                    <div className={`${classPrefix}__body`}>
                        <div className={`${classPrefix}__address`}>
                            <FormFieldInput
                                name="address"
                                placeholder="Address"
                                errorMessage={undefined}
                                icon={<IconPoint color="#8D8D8D" />}
                                iconPosition="left"
                            />
                            <div className={`${classPrefix}__map`}>
                                <P>Select location manually</P>
                                <iframe
                                    width="100%"
                                    height="150"
                                    className="gmap_iframe"
                                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className={`${classPrefix}__footer`}>
                    <AdditionalServices
                        options={additionalServicesOptions}
                        totalOption={{
                            label: "Grand Total",
                            value: "$2,323.00",
                        }}
                    />
                    <div className={`${classPrefix}__actions`}>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={() => notImplemented()}
                        >
                            Checkout
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCheckout;
