import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";
import { isNil } from "lodash";
import { useRouter } from "next/router";

import CheckoutGetMode from "./CheckoutGetMode";
import CheckoutShippingMethod from "./CheckoutShippingMethod";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutAdditionalServices from "./CheckoutAdditionalServices";
import CheckoutPickup from "./CheckoutPickupPoint";
import CheckoutFormActions from "@components/pages/CheckoutPage/components/CheckoutFormActions";
import ModalMapPickup from "@components/modals/components/ModalMapPickup";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    checkoutFormDefaultValues,
    checkoutFormResolver,
    ECheckoutFormFieldsNames,
    ECheckoutGetMode,
    TCheckoutForm,
} from "@components/pages/CheckoutPage/formAttrs";
import { IRoot } from "@store/store";
import { PATH_MY_ACCOUNT_ORDERS_PAGE } from "@consts/pathsConsts";
import { showNotification } from "@helpers/notificarionHelper";
import { TCreateOrderRequest } from "@store/order/types";

const CheckoutForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore, productsStore } = store as IRoot;
        const { userData, userCardsData, getUserCardsData } = authStore;
        const {
            getProductServiceRequest,
            getProductDeliveryRequest,
            productService,
            productDelivery,
        } = productsStore;
        const router = useRouter();

        const methods = useForm<TCheckoutForm>({
            resolver: checkoutFormResolver(),
            defaultValues: checkoutFormDefaultValues(userData),
        });

        const { handleSubmit, watch } = methods;

        const getModeValue = watch(ECheckoutFormFieldsNames.getMode);

        const onSubmit: SubmitHandler<TCheckoutForm> = () => {
            if (userData) {
                const params: TCreateOrderRequest = {
                    userInfo: {
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                        email: userData.email,
                        phone: userData.phone,
                        promo: true,
                    },
                    shipping: {
                        address: "address 1",
                        delivery_company: 1,
                    },
                    extras: [{ extra: 1 }],
                    items: [{ item: 1 }],
                };

                console.log("params", params);

                router.push(PATH_MY_ACCOUNT_ORDERS_PAGE).finally(() => {
                    showNotification({
                        mainProps: {
                            message: `Your order has being shipped`,
                            description: `You can view your orders on this page`,
                        },
                    });
                });

                // createOrderRequest(params).then(() => {
                //     router.push(PATH_MY_ACCOUNT_ORDERS_PAGE).finally(() => {
                //         showNotification({
                //             mainProps: {
                //                 message: `Your order has being shipped`,
                //                 description: `You can view your orders on this page`,
                //             },
                //         });
                //     });
                // });
            }
        };

        useEffect(() => {
            if (!userCardsData) {
                getUserCardsData();
            }
            if (isNil(productService)) {
                getProductServiceRequest();
            }
            if (isNil(productDelivery)) {
                getProductDeliveryRequest();
            }
        }, []);

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
                    <CheckoutFormActions
                        pageClassPrefix={pageClassPrefix}
                        onSubmitClick={handleSubmit(onSubmit)}
                    />
                    <ModalMapPickup />
                </form>
            </FormProvider>
        );
    }),
);

export default CheckoutForm;
