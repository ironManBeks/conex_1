import { FC, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { debounce, isString, uniq } from "lodash";

import ModalConfirm from "@components/modals/components/ModalConfirm";
import FormFieldCheckbox from "@components/form/formFields/FormFieldCheckbox";
import ProductCartCard from "@components/cards/ProductCartCard";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { IconPoint } from "@components/Icons";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";
import { TProductCartCard } from "@components/cards/types";
import { ProductPriceParamsMockup } from "../../../../mockups/ProductPriceMockup";
import { convertDoorDataToCreateDoorRequest } from "@helpers/orderHelper";
import { toJS } from "mobx";

const CartList: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_list`;
        const {
            builderStore,
            commonStore,
            authStore,
            productsStore,
            orderStore,
        } = store as IRoot;
        const { builderCartData, setElementsToBuilderCard } = builderStore;
        const { setModalConfirmVisible } = commonStore;
        const { isAuthorized, userCartData } = authStore;
        const { setProductPriceFetching, getProductPriceRequest } =
            productsStore;
        const { createDoorRequest } = orderStore;
        const [selected, setSelected] = useState<string[]>([]);
        const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

        const handleSelect = (
            id: string | string[] | undefined,
            action: "add" | "remove" | "clear",
        ) => {
            if (action === "add" && id) {
                setSelected((oldList) =>
                    isString(id) ? [...oldList, id] : uniq([...oldList, ...id]),
                );
            }
            if (action === "remove" && id) {
                setSelected((oldList) => oldList.filter((item) => item !== id));
            }
            if (action === "clear") {
                setSelected([]);
            }
        };

        const deleteElementFromCart = useCallback(() => {
            if (itemsToDelete) {
                setElementsToBuilderCard(undefined, {
                    action: "remove",
                    id: itemsToDelete,
                });
            }
        }, [itemsToDelete]);

        const handleDelete = useCallback(() => {
            setModalConfirmVisible(true);
        }, []);

        useEffect(() => {
            if (builderCartData?.elements.length) {
                // createDoorRequest(
                //     convertDoorDataToCreateDoorRequest(
                //         builderCartData?.elements[0],
                //     ),
                // ).then(() => {
                //     setElementsToBuilderCard(undefined, "clear");
                // });
            }
            console.log("builderCartData", toJS(builderCartData));
        }, [builderCartData]);

        const getCartList = useCallback((): TProductCartCard[] => {
            if (isAuthorized && userCartData) {
                return userCartData;
            }

            if (builderCartData?.elements) {
                return builderCartData.elements.map((item) => ({
                    id: item.doorId,
                    title: `title _id: ${item.doorId}`,
                    price: 438,
                    img:
                        item.doorData[0]?.fields[0]?.elements[0].image?.url ||
                        "",

                    options: [
                        {
                            title: "Material",
                            value: "wood",
                        },
                        {
                            title: "Size",
                            value: "20*20",
                        },
                        {
                            title: "Color",
                            value: "silver",
                        },
                    ],
                    count: 1,
                    createDate: "2023-08-30T09:34:14.281Z",
                }));
            }
            return [];
        }, [isAuthorized, builderCartData, userCartData]);

        const cartList = getCartList();

        const handleCountChange = (id: string, count: number) => {
            console.log("id", count, "__________", id);
            getProductPriceRequest(ProductPriceParamsMockup);
        };

        const debounceLoadData = useCallback(
            debounce(handleCountChange, 600),
            [],
        );

        return (
            <>
                <div className={`${classPrefix}__wrapper`}>
                    <div className={`${classPrefix}__head`}>
                        {cartList && (
                            <div className={`${classPrefix}__weight`}>
                                {cartList.length}{" "}
                                {cartList.length > 1 ? "products" : "product"}{" "}
                                <IconPoint width={12} height={12} /> Weight -{" "}
                                <span>{cartList.length * 4} kg</span>
                            </div>
                        )}
                        <div className={`${classPrefix}__select`}>
                            <FormFieldCheckbox
                                name={"selectAll"}
                                errorMessage={undefined}
                                className={`${classPrefix}_checkbox`}
                                checked={selected.length === cartList.length}
                                onChange={() => {
                                    if (selected.length !== cartList.length) {
                                        handleSelect(
                                            cartList?.map((item) => item.id),
                                            "add",
                                        );
                                    } else {
                                        handleSelect(undefined, "clear");
                                    }
                                }}
                                label="Select all"
                            />
                            {!!selected.length && (
                                <ButtonPrimary
                                    color={EButtonColor.transparent}
                                    onClick={() => {
                                        handleDelete();
                                        setItemsToDelete(selected);
                                    }}
                                >
                                    Delete selected
                                </ButtonPrimary>
                            )}
                        </div>
                    </div>
                    <div className={`${classPrefix}__content`}>
                        {cartList.map((item) => (
                            <ProductCartCard
                                {...item}
                                key={item.id}
                                select={{
                                    isSelect: !!selected?.includes(item.id),
                                    onSelectChange: (id, value) => {
                                        handleSelect(
                                            id,
                                            value ? "add" : "remove",
                                        );
                                    },
                                }}
                                onDeleteClick={() => {
                                    handleDelete();
                                    setItemsToDelete([item.id]);
                                }}
                                onCountChange={(value) => {
                                    setProductPriceFetching(true);
                                    debounceLoadData(item.id, value);
                                }}
                            />
                        ))}
                    </div>
                </div>
                <ModalConfirm
                    title={`Do you want to remove ${
                        itemsToDelete.length > 1 ? "doors" : "the door"
                    } from the cart?`}
                    onConfirm={() => deleteElementFromCart()}
                    onClose={() => setItemsToDelete([])}
                />
            </>
        );
    }),
);

export default CartList;

// const handleEdit = ({
//     doorId,
//     doorData,
//     history,
//     builderParentId,
// }: TCartItem) => {
//     setStorage(EDIT_BUILDER_CART_ITEM_DATA, {
//         doorId,
//         doorData,
//         history,
//         builderParentId,
//     });
//     router.push(PATH_BUILDER_PAGE);
// };
