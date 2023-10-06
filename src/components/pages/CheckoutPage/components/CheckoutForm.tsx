import { FC } from "react";
import { inject, observer } from "mobx-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import CheckoutGetMode from "./CheckoutGetMode";
import CheckoutShippingMethod from "./CheckoutShippingMethod";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutAdditionalServices from "./CheckoutAdditionalServices";
import CheckoutPickup from "./CheckoutPickupPoint";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    checkoutFormDefaultValues,
    checkoutFormResolver,
    ECheckoutFormFieldsNames,
    ECheckoutGetMode,
    TCheckoutForm,
} from "@components/pages/CheckoutPage/formAttrs";
import { IRoot } from "@store/store";

const CheckoutForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userData } = authStore;

        const methods = useForm<TCheckoutForm>({
            resolver: checkoutFormResolver(),
            defaultValues: checkoutFormDefaultValues(userData),
        });

        const { handleSubmit, watch } = methods;
        const getModeValue = watch(ECheckoutFormFieldsNames.getMode);

        const onSubmit: SubmitHandler<TCheckoutForm> = (data) => {
            console.log("data", data);
        };

        return (
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={cn(`${pageClassPrefix}_form`)}
                >
                    <CheckoutGetMode pageClassPrefix={pageClassPrefix} />
                    <CheckoutDetails pageClassPrefix={pageClassPrefix} />
                    {getModeValue === ECheckoutGetMode.delivery ? (
                        <CheckoutShippingMethod
                            pageClassPrefix={pageClassPrefix}
                        />
                    ) : (
                        <CheckoutPickup pageClassPrefix={pageClassPrefix} />
                    )}
                    <CheckoutPayment pageClassPrefix={pageClassPrefix} />
                    <CheckoutAdditionalServices
                        pageClassPrefix={pageClassPrefix}
                    />
                    <div>
                        <ButtonPrimary type="submit">submit</ButtonPrimary>
                    </div>
                </form>
            </FormProvider>
        );
    }),
);

export default CheckoutForm;
