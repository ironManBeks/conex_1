import { FC, useCallback, useState } from "react";
import { inject, observer } from "mobx-react";
import { isString, uniq } from "lodash";

import ModalConfirm from "@components/modals/components/ModalConfirm";
import FormFieldCheckbox from "@components/form/formFields/FormFieldCheckbox";
import ProductCartCard from "@components/cards/ProductCartCard";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";

const CartList: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_list`;
        const { builderStore, commonStore } = store as IRoot;
        const { builderCartData, setElementsToBuilderCard } = builderStore;
        const { setModalConfirmVisible } = commonStore;

        const [selected, setSelected] = useState<string[]>([]);
        const [selectAll, setSelectAll] = useState<boolean>();

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
            if (selected) {
                setElementsToBuilderCard(undefined, {
                    action: "remove",
                    id: selected,
                });
            }
        }, [selected]);

        const handleDelete = () => {
            setModalConfirmVisible(true);
        };

        return (
            <>
                <div className={`${classPrefix}__wrapper`}>
                    <div className={`${classPrefix}__head`}>
                        <FormFieldCheckbox
                            name={"selectAll"}
                            errorMessage={undefined}
                            className={`${classPrefix}_checkbox`}
                            checked={selectAll}
                            onChange={() => {
                                if (
                                    selected.length !==
                                    builderCartData?.elements?.length
                                ) {
                                    setSelectAll(true);
                                    handleSelect(
                                        builderCartData?.elements.map(
                                            (item) => item.doorId,
                                        ),
                                        "add",
                                    );
                                } else {
                                    setSelectAll(false);
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
                                }}
                            >
                                Delete selected
                            </ButtonPrimary>
                        )}
                    </div>
                    <div className={`${classPrefix}__content`}>
                        {builderCartData?.elements.map((item) => {
                            const mainFieldData = item.doorData[0];
                            return (
                                <ProductCartCard
                                    key={item.doorId}
                                    id={item.doorId}
                                    title={`title _id: ${item.doorId}`}
                                    material={"material"}
                                    size={"size"}
                                    color={"color"}
                                    price={123}
                                    imageSrc={
                                        mainFieldData.fields[0]?.elements[0]
                                            .image?.url
                                    }
                                    deliveryStatus={"null"}
                                    priceCurrency={"null"}
                                    select={{
                                        isSelect: !!selected?.includes(
                                            item.doorId,
                                        ),
                                        onSelectChange: (id, val) => {
                                            handleSelect(
                                                id,
                                                val ? "add" : "remove",
                                            );
                                        },
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <ModalConfirm
                    title={`Do you want to remove ${
                        selected.length > 1 ? "doors" : "the door"
                    } from the cart?`}
                    onConfirm={() => deleteElementFromCart()}
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
