import { FC, useMemo } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldAutoCompleteController from "@components/form/formControllers/FieldAutoCompleteController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { P } from "@components/Text";
import Spin from "@components/globalComponents/Spin";
import { IconMapPoint } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    COMMENT_ORDER_MAX_MESSAGE_LENGTH,
    ECheckoutFormFieldsNames,
} from "@components/pages/CheckoutPage/formAttrs";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";

const CheckoutShippingMethod: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { commonStore, productsStore } = store as IRoot;
        const { setModalMapPickupVisible } = commonStore;
        const { productDelivery, productDeliveryFetching } = productsStore;
        const classPrefix = `${pageClassPrefix}_shipping-method`;

        const selectDeliveryContent = useMemo(() => {
            if (productDeliveryFetching) {
                return (
                    <div
                        className={cn(`${classPrefix}__select`, {
                            _fetching: productDeliveryFetching,
                        })}
                    >
                        <Spin />
                    </div>
                );
            }

            if (productDelivery) {
                return (
                    <div className={`${classPrefix}__select`}>
                        <FieldRadioButtonArrayController
                            name={ECheckoutFormFieldsNames.deliveryService}
                            options={productDelivery.map((item) => ({
                                value: item.id,
                                label: (
                                    <>
                                        <ImgWrapper
                                            src={item.img}
                                            alt={"Logo"}
                                        />
                                        <P>
                                            {item.showTitle && item.title && (
                                                <span>{item.title} </span>
                                            )}
                                            <span>${item.price}</span>{" "}
                                            <span>
                                                {item.deliveryFrom}-
                                                {item.deliveryTo} business days
                                            </span>
                                        </P>
                                    </>
                                ),
                            }))}
                        />
                    </div>
                );
            }
            return null;
        }, [productDelivery, productDeliveryFetching]);

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Shipping method *"
            >
                <div className={`${classPrefix}__fields`}>
                    <FieldAutoCompleteController
                        name={ECheckoutFormFieldsNames.streetAddress}
                        fieldLabel="Street address"
                        placeholder="Street address"
                    />
                    <div className={`${classPrefix}__actions`}>
                        <ButtonPrimary
                            color={EButtonColor.secondary}
                            onClick={() => setModalMapPickupVisible(true)}
                            rightIcon={<IconMapPoint />}
                        >
                            Mark a point on the map
                        </ButtonPrimary>
                    </div>
                    {selectDeliveryContent}
                    <FieldTextAreaController
                        name={ECheckoutFormFieldsNames.commentsOrder}
                        label="Comments on the order"
                        placeholder="Comments on the order"
                        minHeight={160}
                        maxSymbolLength={COMMENT_ORDER_MAX_MESSAGE_LENGTH}
                    />
                </div>
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutShippingMethod;

// <iframe
//     width="100%"
//     height="510"
//     className="gmap_iframe"
//     src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
// />
// <div className="_row">
//     <FieldInputController
//         name={ECheckoutFormFieldsNames.state}
//         label="State"
//         placeholder="State"
//     />
//     <FieldInputController
//         name={ECheckoutFormFieldsNames.city}
//         label="Town / City"
//         placeholder="Town / City"
//     />
// </div>
