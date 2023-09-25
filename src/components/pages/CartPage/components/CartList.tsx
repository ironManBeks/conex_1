import { FC, useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/router";

import { H2, H3, P } from "@components/Text";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import CartEmpty from "./CartEmpty";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";
import {
    getTotalPriceByResultData,
    renderResultDataToOptionsList,
} from "@helpers/builderHelper";
import { IRoot } from "@store/store";
import { TCartItem } from "@store/builder/types";
import { setStorage } from "@services/storage.service";
import { EDIT_BUILDER_CART_ITEM_DATA } from "@consts/storageNamesContsts";
import { PATH_BUILDER_PAGE } from "@consts/pathsConsts";

const CartList: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_list`;
        const { builderStore, commonStore } = store as IRoot;
        const { builderCartData, setElementsToBuilderCard, setStepHistory } =
            builderStore;
        const { setModalConfirmVisible } = commonStore;
        const router = useRouter();

        const [selectedElementId, setSelectedElementId] = useState<
            string | null
        >(null);

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        const deleteElementFromCart = useCallback(() => {
            if (selectedElementId) {
                setElementsToBuilderCard(undefined, {
                    action: "remove",
                    id: selectedElementId,
                });
            }
        }, [selectedElementId]);

        const handleDelete = (id: string) => {
            setModalConfirmVisible(true);
            setSelectedElementId(id);
        };

        const handleEdit = ({
            doorId,
            doorData,
            history,
            builderParentId,
        }: TCartItem) => {
            setStorage(EDIT_BUILDER_CART_ITEM_DATA, {
                doorId,
                doorData,
                history,
                builderParentId,
            });
            router.push(PATH_BUILDER_PAGE);
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Cart</H2>
                <div className={"cart-item-page_wrapper"}>
                    {builderCartData?.elements?.length ? (
                        builderCartData?.elements.map((item, index) => {
                            return (
                                <div
                                    key={item.doorId}
                                    className={"cart-item_wrapper"}
                                >
                                    <div className={"cart-item_inner-wrapper"}>
                                        <div>
                                            {item.doorData[0].stepTitle && (
                                                <H3>
                                                    {
                                                        item.doorData[0]
                                                            .fields[0]
                                                            .elements[0]
                                                            .mainTitle
                                                    }
                                                </H3>
                                            )}
                                            <P
                                                style={{
                                                    wordBreak: "break-all",
                                                    marginBottom: 0,
                                                }}
                                            >
                                                <b>History:</b>{" "}
                                                {JSON.stringify(item.history)}
                                            </P>
                                            <P
                                                style={{
                                                    wordBreak: "break-all",
                                                    marginBottom: 0,
                                                }}
                                            >
                                                <b>ID:</b> {item.doorId}
                                            </P>
                                        </div>
                                        {item.doorData[0]?.fields[0]
                                            ?.elements[0].image?.url && (
                                            <ImgWrapper
                                                src={
                                                    item.doorData[0]?.fields[0]
                                                        ?.elements[0].image?.url
                                                }
                                                wrapperClassName="cart-item_image"
                                                objectFit={"contain"}
                                            />
                                        )}

                                        <div className="cart-item_list__wrapper">
                                            <AddedOptionsList
                                                optionsList={renderResultDataToOptionsList(
                                                    item.doorData,
                                                )}
                                                className="cart-item_list__inner-wrapper"
                                            />
                                        </div>
                                        <P
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            Total:
                                            <b>
                                                $
                                                {getTotalPriceByResultData(
                                                    item.doorData,
                                                )}
                                            </b>
                                        </P>
                                        <div className={"cart-item_actions"}>
                                            <ButtonPrimary
                                                color={EButtonColor.secondary}
                                                size={EButtonSize.md}
                                                onClick={() => {
                                                    handleEdit(item);
                                                }}
                                            >
                                                Edit
                                            </ButtonPrimary>
                                            <ButtonPrimary
                                                color={EButtonColor.secondary}
                                                size={EButtonSize.md}
                                                onClick={() => {
                                                    handleDelete(item.doorId);
                                                }}
                                            >
                                                Delete
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <CartEmpty pageClassPrefix={pageClassPrefix} />
                    )}
                </div>
                <ModalConfirm
                    title="Do you want to remove the door from the cart?"
                    onConfirm={() => deleteElementFromCart()}
                />
            </div>
        );
    }),
);

export default CartList;
