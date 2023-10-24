import { FC } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { ECheckoutFormFieldsNames } from "@components/pages/CheckoutPage/formAttrs";
import { IRoot } from "@store/store";

const CheckoutAdditionalServices: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { productsStore } = store as IRoot;
        const { productService, productServiceFetching } = productsStore;
        const classPrefix = `${pageClassPrefix}_additional-services`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Additional services"
                fetching={productServiceFetching}
            >
                {productService?.length ? (
                    <FieldCheckboxArrayController
                        name={ECheckoutFormFieldsNames.additionalServices}
                        options={productService.map((item) => ({
                            value: item.id,
                            label: item.attributes.name,
                        }))}
                    />
                ) : (
                    <Empty />
                )}
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutAdditionalServices;
