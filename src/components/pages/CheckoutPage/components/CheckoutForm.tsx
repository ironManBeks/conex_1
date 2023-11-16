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
import {
    PATH_HOME_PAGE,
    PATH_MY_ACCOUNT_ORDERS_PAGE,
} from "@consts/pathsConsts";
import { showNotification } from "@helpers/notificarionHelper";
import { TCreateOrderRequest } from "@store/order/types";
import { getStorage, removeStorage } from "@services/storage.service";
import {
    BUILDER_UNAUTHORIZED_CART_ID,
    BUILDER_UNAUTHORIZED_DOORS_IDS,
} from "@consts/storageNamesContsts";
import { TNullable } from "@globalTypes/commonTypes";

const CheckoutForm: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore, productsStore, orderStore } = store as IRoot;
        const { userData, userCardsData, getUserCardsData, isAuthorized } =
            authStore;
        const {
            createOrderRequest,
            getOrderCart,
            getDoorsData,
            orderCart,
            deleteOrderCart,
            deleteDoorRequest,
        } = orderStore;
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

        const {
            handleSubmit,
            watch,
            formState: { errors },
        } = methods;

        useEffect(() => {
            console.log("errors", errors);
        }, [errors]);

        const getModeValue = watch(ECheckoutFormFieldsNames.getMode);

        const onSubmit: SubmitHandler<TCheckoutForm> = (data) => {
            const modifiedItems =
                orderCart?.items.map(({ id, quantity }) => ({
                    item: id,
                    quantity,
                })) || [];

            const modifiedExtras = data[
                ECheckoutFormFieldsNames.additionalServices
            ].map((extra) => ({ extra: Number(extra), quantity: 1 }));

            const params: TCreateOrderRequest = {
                userInfo: {
                    firstName: data[ECheckoutFormFieldsNames.firstName],
                    lastName: data[ECheckoutFormFieldsNames.lastName],
                    email: data[ECheckoutFormFieldsNames.email],
                    phone: data[ECheckoutFormFieldsNames.phone],
                    promo: true,
                },
                shipping: {
                    address: "",
                    delivery_company: 0,
                },
                extras: modifiedExtras,
                items: modifiedItems,
            };

            if (
                data[ECheckoutFormFieldsNames.getMode] ===
                ECheckoutGetMode.delivery
            ) {
                params.shipping = {
                    address: data[ECheckoutFormFieldsNames.streetAddress],
                    delivery_company: 1,
                };
            }

            createOrderRequest(params).then(() => {
                if (isAuthorized) {
                    router.push(PATH_MY_ACCOUNT_ORDERS_PAGE).finally(() => {
                        if (userData) {
                            deleteOrderCart(userData.cartId);
                            getOrderCart().then(() => getDoorsData());
                            const doorsId = orderCart?.items.map(
                                ({ id }) => id,
                            );
                            doorsId?.length && deleteDoorRequest(doorsId);
                        }
                        showNotification({
                            mainProps: {
                                message: "Your order has being shipped",
                                description:
                                    "You can view your orders on this page",
                            },
                        });
                    });
                } else {
                    router.push(PATH_HOME_PAGE).finally(() => {
                        const unauthorizedCartId = getStorage(
                            BUILDER_UNAUTHORIZED_CART_ID,
                        ) as string | undefined;

                        const unauthorizedDoorsIds =
                            (getStorage(
                                BUILDER_UNAUTHORIZED_DOORS_IDS,
                            ) as TNullable<number[]>) || [];

                        removeStorage(BUILDER_UNAUTHORIZED_CART_ID);
                        removeStorage(BUILDER_UNAUTHORIZED_DOORS_IDS);
                        deleteDoorRequest(unauthorizedDoorsIds);
                        deleteOrderCart(Number(unauthorizedCartId));
                        showNotification({
                            mainProps: {
                                message: "Your order has being shipped",
                                description:
                                    "Order tracking information has been sent to your email",
                            },
                        });
                    });
                }
            });
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
                    <CheckoutPayment
                        pageClassPrefix={pageClassPrefix}
                        onAdyenPayBtnClick={handleSubmit(onSubmit)}
                    />
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
