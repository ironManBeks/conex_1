import { FC, useEffect } from "react";
import cn from "classnames";
import Link from "next/link";
import { inject, observer } from "mobx-react";
import { useMediaQuery } from "react-responsive";
import jwt from "jwt-decode";

import { P } from "@components/Text";
import { IconCart, IconUser } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { PATH_CART_PAGE, PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";
import { EButtonColor } from "@components/buttons/types";
import { TNavTypes } from "./types";
import { IRoot } from "@store/store";
import ButtonLink from "@components/buttons/ButtonLink";
import { isEmpty, isNil } from "lodash";
import { getStorage } from "@services/storage.service";
import { BUILDER_CART } from "@consts/storageNamesContsts";
import { toJS } from "mobx";
import { Spin } from "antd";

const NavActions: FC<TNavTypes> = inject("store")(
    observer(({ store, wrapperClassPrefix }) => {
        const { commonStore, authStore, builderStore } = store as IRoot;
        const { setModalAuthVisible } = commonStore;
        const { userData, userDataFetching } = authStore;
        const { builderCartData, setBuilderCartData } = builderStore;
        const classPrefix = `nav-actions`;

        const cartLength = builderCartData?.elements?.length || 0;

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        useEffect(() => {
            const cartData = getStorage(BUILDER_CART);
            if (isNil(builderCartData) && cartData) {
                setBuilderCartData(cartData);
            }
        }, []);

        return (
            <div
                className={cn(
                    `${wrapperClassPrefix}_${classPrefix}__wrapper`,
                    `${classPrefix}_wrapper`,
                )}
            >
                <Link href={PATH_CART_PAGE}>
                    <a className={`${classPrefix}_item__wrapper`}>
                        <IconCart />
                        <P>
                            {cartLength
                                ? `${cartLength} ${
                                      cartLength > 1 ? "items" : "item"
                                  }`
                                : "Cart"}
                        </P>
                    </a>
                </Link>
                <Link
                    color={EButtonColor.transparent}
                    href={PATH_MY_ACCOUNT_PAGE}
                >
                    <a className={`${classPrefix}_item__wrapper`}>
                        {userDataFetching ? (
                            <Spin />
                        ) : (
                            <>
                                <IconUser />
                                <P>
                                    {!isEmpty(userData)
                                        ? userData?.name.length > 6
                                            ? `${userData?.name.slice(0, 6)}...`
                                            : userData?.name
                                        : "Log In"}
                                </P>
                            </>
                        )}
                    </a>
                </Link>
            </div>
        );
    }),
);

export default NavActions;

// SEARCH LOGIC
// import FieldInputController from "@components/form/formControllers/FieldInputController";
// import { IconSearch } from "@components/Icons";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { useRouter } from "next/router";
// import { IRoot } from "@store/store";
// import { PATH_SEARCH_PAGE } from "@consts/pathsConsts";
// import {
//     ESearchFormNames,
//     searchFormDefaultValues,
//     TSearchForm,
// } from "./formAttrs";
//
//
// const { commonStore } = store as IRoot;
// const router = useRouter();
// const methods = useForm<TSearchForm>({
//     defaultValues: searchFormDefaultValues,
// });
// const { handleSubmit } = methods;
// const onSubmit: SubmitHandler<TSearchForm> = (data) => {
//     commonStore.setUrlParams({ search: data[ESearchFormNames.search] });
//     router.push(PATH_SEARCH_PAGE);
// };
//
//
// {/*<div className={`${classPrefix}_search__wrapper`}>*/}
// {/*    <FormProvider {...methods}>*/}
// {/*        <form onSubmit={handleSubmit(onSubmit)}>*/}
// {/*            <FieldInputController*/}
// {/*                name={ESearchFormNames.search}*/}
// {/*                placeholder="Search"*/}
// {/*                addonAfter={<IconSearch />}*/}
// {/*                onAddonClick={handleSubmit(onSubmit)}*/}
// {/*            />*/}
// {/*        </form>*/}
// {/*    </FormProvider>*/}
// {/*</div>*/}
