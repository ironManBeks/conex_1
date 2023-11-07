import { FC, useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import { debounce, isNumber, uniq } from "lodash";

import ModalConfirm from "@components/modals/components/ModalConfirm";
import FormFieldCheckbox from "@components/form/formFields/FormFieldCheckbox";
import ProductCartCard from "@components/cards/ProductCartCard";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { IconPoint } from "@components/Icons";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";
import { TProductCartCard } from "@components/cards/types";
import { showNotification } from "@helpers/notificarionHelper";
import { showAxiosNotificationError } from "@helpers/errorsHelper";

const CartList: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_list`;
        const { commonStore, authStore, orderStore } = store as IRoot;
        const { setModalConfirmVisible } = commonStore;
        const { isAuthorized } = authStore;
        const {
            doorsData,
            deleteDoorRequest,
            setPriceParams,
            setOrderPriceFetching,
            priceParams,
            setDoorsData,
        } = orderStore;
        const [selected, setSelected] = useState<number[]>([]);
        const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);

        const handleSelect = (
            id: number | number[] | undefined,
            action: "add" | "remove" | "clear",
        ) => {
            if (action === "add" && id) {
                setSelected((oldList) =>
                    isNumber(id) ? [...oldList, id] : uniq([...oldList, ...id]),
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
            if (itemsToDelete.length) {
                Promise.all(
                    itemsToDelete.map((item) => deleteDoorRequest(item)),
                )
                    .then((data) => {
                        if (data.length) {
                            const deletedDoors = data.map(
                                (item) => item.data.data.id,
                            );
                            if (doorsData) {
                                const newDoorsData = doorsData.filter(
                                    (item) => !deletedDoors.includes(item.id),
                                );
                                setDoorsData(newDoorsData);
                                if (priceParams) {
                                    const newPriceItems =
                                        priceParams.items.filter(
                                            (item) =>
                                                !deletedDoors.includes(item.id),
                                        );
                                    setPriceParams({
                                        ...priceParams,
                                        items: newPriceItems,
                                    });
                                }
                            }
                        }
                        showNotification({
                            mainProps: {
                                type: "success",
                                message: `${
                                    itemsToDelete.length > 1 ? "Doors" : "Door"
                                } successfully deleted`,
                            },
                        });
                    })
                    .catch((err) => {
                        showAxiosNotificationError(err);
                    })
                    .finally(() => {
                        handleSelect(undefined, "clear");
                    });
            }
        }, [itemsToDelete, doorsData, priceParams]);

        const handleDelete = useCallback(() => {
            setModalConfirmVisible(true);
        }, []);

        const getCartList = useCallback((): TProductCartCard[] => {
            if (doorsData?.length) {
                return doorsData.map((item) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    img: item.img || "",
                    options: item.options.map((option) => ({
                        title: option.title,
                        value: option.value,
                    })),
                    count: 1,
                }));
            }

            return [];
        }, [isAuthorized, doorsData]);

        const cartList = getCartList();

        const handleCountChange = (id: number, count: number) => {
            if (priceParams && count) {
                setPriceParams({
                    ...priceParams,
                    items: priceParams.items.map((item) => {
                        if (item.id === id) {
                            return {
                                id: item.id,
                                quantity: count,
                            };
                        } else return item;
                    }),
                });
            } else setOrderPriceFetching(false);
        };

        const debounceLoadData = useCallback(debounce(handleCountChange, 600), [
            priceParams,
        ]);

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
                                    setOrderPriceFetching(true);
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

// ToDo Remove
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
