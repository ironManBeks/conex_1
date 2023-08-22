import { FC } from "react";
import cn from "classnames";
import Link from "next/link";

import { inject, observer } from "mobx-react";
import { useMediaQuery } from "react-responsive";

import { H5, P } from "@components/Text";
import { IconCart } from "@components/Icons";

import { PATH_CART_PAGE } from "@consts/pathsConsts";
import { TNavTypes } from "./types";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";

const NavActions: FC<TNavTypes> = inject("store")(
    observer(({ wrapperClassPrefix }) => {
        const classPrefix = `nav-actions`;
        const items = 2;

        const isMobile = useMediaQuery({
            minWidth: mediaBreakpoints.xsMedia,
            maxWidth: mediaBreakpoints.smMediaEnd,
        });

        return (
            <div
                className={cn(
                    `${wrapperClassPrefix}_${classPrefix}__wrapper`,
                    `${classPrefix}_wrapper`,
                )}
            >
                <Link href={PATH_CART_PAGE}>
                    <div className={`${classPrefix}_cart__wrapper`}>
                        <div className={`${classPrefix}_cart__icon`}>
                            <IconCart />
                        </div>
                        <div className={`${classPrefix}_cart__content`}>
                            {!isMobile && <H5>My Cart</H5>}
                            <P>
                                {items} {items > 1 ? "items" : "item"}
                            </P>
                        </div>
                    </div>
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
