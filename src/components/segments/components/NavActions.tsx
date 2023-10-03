import { FC, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import { inject, observer } from "mobx-react";
import { isEmpty, isNil } from "lodash";
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
import { getStorage } from "@services/storage.service";
import { BUILDER_CART } from "@consts/storageNamesContsts";
import { SEARCH_QUERY } from "@consts/queryNamesConsts";
import { TNullable } from "@globalTypes/commonTypes";
import { TBuilderCartData } from "@store/builder/types";

const NavActions: FC<TNavTypes> = inject("store")(
    observer(({ store, wrapperClassPrefix }) => {
        const { authStore, builderStore, productsStore } = store as IRoot;
        const { setSearchParams, searchParams } = productsStore;
        const { userData, userDataFetching } = authStore;
        const { builderCartData, setBuilderCartData } = builderStore;
        const classPrefix = `nav-actions`;
        const router = useRouter();
        const cartLength = builderCartData?.elements?.length || 0;

        const handleSearchChange = (value: string) => {
            setSearchParams({ ...searchParams, text: value });
        };

        useEffect(() => {
            const cartData = getStorage(
                BUILDER_CART,
            ) as TNullable<TBuilderCartData>;
            if (isNil(builderCartData) && cartData) {
                setBuilderCartData(cartData);
            }
        }, []);

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
                    errorMessage={undefined}
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
                    className={`${classPrefix}_item__wrapper`}
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
                        href={PATH_MY_ACCOUNT_PAGE}
                        className={`${classPrefix}_item__wrapper`}
                    >
                        <IconUser />
                        <P>
                            {!isEmpty(userData)
                                ? userData?.name.length > 6
                                    ? `${userData?.name.slice(0, 6)}...`
                                    : userData?.name
                                : "Log In"}
                        </P>
                    </Link>
                )}
            </div>
        );
    }),
);

export default NavActions;

// ToDo Remove this component
// const SearchField = ({
//     handleSearch,
//     handleSearchChange,
//     text,
// }: {
//     handleSearch: any;
//     handleSearchChange: any;
//     text: any;
// }) => {
//     console.log("text", text);
//     return (
//         <FormFieldAutoComplete
//             name="search"
//             fieldPlaceholder="Search"
//             errorMessage={undefined}
//             onSelect={(value) => {
//                 handleSearch(value);
//             }}
//             onAddonButtonClick={(value) => {
//                 handleSearch(value);
//             }}
//             onChangeValue={(value) => {
//                 handleSearchChange(value);
//             }}
//             value={text}
//         />
//     );
// };
