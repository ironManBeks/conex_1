import { FC, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

import { P } from "@components/Text";
import { IconCart, IconUser } from "@components/Icons";
import FormFieldAutoComplete from "@components/form/formFields/FormFieldAutoComplete";
import Spin from "@components/globalComponents/Spin";

import {
    PATH_CART_PAGE,
    PATH_MY_ACCOUNT_PAGE,
    PATH_SEARCH_PAGE,
} from "@consts/pathsConsts";
import { EButtonColor } from "@components/buttons/types";
import { TNavTypes } from "./types";
import { IRoot } from "@store/store";
import { AUTH_FORM_QUERY, SEARCH_QUERY } from "@consts/queryNamesConsts";
import { EAuthFormType } from "@components/globalComponents/AuthForm/types";
import { getStorage } from "@services/storage.service";
import {
    BUILDER_UNAUTHORIZED_CART_ID,
    BUILDER_UNAUTHORIZED_DOORS_IDS,
} from "@consts/storageNamesContsts";
import { TNullable } from "@globalTypes/commonTypes";

const NavActions: FC<TNavTypes> = inject("store")(
    observer(({ store, wrapperClassPrefix }) => {
        const { authStore, productsStore, orderStore } = store as IRoot;
        const { setSearchParams, searchParams } = productsStore;
        const { isAuthorized, userData, setUserData, userDataFetching } =
            authStore;
        const {
            getOrderCart,
            setOrderCart,
            orderCart,
            doorsData,
            getDoorsData,
            setDoorsData,
        } = orderStore;
        const classPrefix = `nav-actions`;
        const router = useRouter();
        const cartLength = orderCart?.items.length || 0;

        const handleSearchChange = (value: string) => {
            setSearchParams({ ...searchParams, text: value });
        };

        useEffect(() => {
            if (userData && isAuthorized) {
                getOrderCart().then(({ data }) => {
                    setUserData({ ...userData, cartId: data.cartId });
                    getDoorsData();
                });
            } else {
                // INFO(unauthorized user): get cartId and doors ids then make request order/cart, doors?ids=1,2,3
                const unauthorizedCartId = getStorage(
                    BUILDER_UNAUTHORIZED_CART_ID,
                ) as string | undefined;

                const unauthorizedDoorsIds =
                    (getStorage(BUILDER_UNAUTHORIZED_DOORS_IDS) as TNullable<
                        number[]
                    >) || [];

                if (unauthorizedCartId) {
                    getOrderCart(Number(unauthorizedCartId));
                } else {
                    setOrderCart(null);
                    setDoorsData(null);
                }

                if (!doorsData && unauthorizedDoorsIds.flat().length)
                    getDoorsData({ ids: unauthorizedDoorsIds.join(",") });
            }
        }, [isAuthorized]);

        const handleSearch = (value: string) => {
            setSearchParams({ ...searchParams, text: value });
            router.replace(
                {
                    pathname: PATH_SEARCH_PAGE,
                    query: { [SEARCH_QUERY]: value },
                },
                undefined,
                {
                    scroll: true,
                    shallow: true,
                },
            );
        };

        return (
            <div
                className={cn(
                    `${wrapperClassPrefix}_${classPrefix}__wrapper`,
                    `${classPrefix}_wrapper`,
                )}
            >
                <FormFieldAutoComplete
                    name="search"
                    fieldPlaceholder="Search"
                    onSelect={(value) => {
                        handleSearch(value);
                    }}
                    onAddonButtonClick={(value) => {
                        handleSearch(value);
                    }}
                    onChangeValue={(value) => {
                        handleSearchChange(value);
                    }}
                    fieldValue={searchParams?.text ?? ""}
                />
                <Link
                    href={PATH_CART_PAGE}
                    className={cn(`${classPrefix}_item__wrapper`, {
                        _active: router.pathname === PATH_CART_PAGE,
                    })}
                >
                    <IconCart />
                    <P>
                        {cartLength
                            ? `${cartLength} ${
                                  cartLength > 1 ? "items" : "item"
                              }`
                            : "Cart"}
                    </P>
                </Link>
                {userDataFetching ? (
                    <span className={`${classPrefix}_item__wrapper`}>
                        <Spin />
                    </span>
                ) : (
                    <Link
                        color={EButtonColor.transparent}
                        href={{
                            pathname: PATH_MY_ACCOUNT_PAGE,
                            query: { [AUTH_FORM_QUERY]: EAuthFormType.login },
                        }}
                        className={cn(`${classPrefix}_item__wrapper`, {
                            _active: router.pathname === PATH_MY_ACCOUNT_PAGE,
                        })}
                    >
                        <IconUser />
                        <P>
                            {!isEmpty(userData)
                                ? userData?.username.length > 6
                                    ? `${userData?.username.slice(0, 6)}...`
                                    : userData?.username
                                : "Log In"}
                        </P>
                    </Link>
                )}
            </div>
        );
    }),
);

export default NavActions;
