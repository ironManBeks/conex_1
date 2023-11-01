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
import { PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import { AccountTabKey } from "@components/pages/account/AccountPage/consts";
import { showNotification } from "@helpers/notificarionHelper";
import { EAccountTabsPaths } from "@components/pages/account/AccountPage/types";
import { TCreateOrderRequest } from "@store/order/types";

const CheckoutForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore, productsStore, orderStore } = store as IRoot;
        const { userData, userCardsData, getUserCardsData } = authStore;
        const {
            getProductServiceRequest,
            getProductDeliveryRequest,
            productService,
            productDelivery,
        } = productsStore;
        const { createOrderRequest } = orderStore;
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

                createOrderRequest(params).then(() => {
                    router
                        .push({
                            pathname: PATH_MY_ACCOUNT_PAGE,
                            query: {
                                [AccountTabKey]: EAccountTabsPaths.orders,
                            },
                        })
                        .finally(() => {
                            showNotification({
                                mainProps: {
                                    message: `Your order has being shipped`,
                                    description: `You can view your orders on this page`,
                                },
                            });
                        });
                });
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
