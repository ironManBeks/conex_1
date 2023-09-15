import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { inject, observer } from "mobx-react";
import { useMediaQuery } from "react-responsive";

import { P } from "@components/Text";
import { IconCart, IconUser } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { PATH_CART_PAGE, PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";
import { EButtonColor } from "@components/buttons/types";
import { TNavTypes } from "./types";
import { IRoot } from "@store/store";
import ButtonLink from "@components/buttons/ButtonLink";

const NavActions: FC<TNavTypes> = inject("store")(
    observer(({ store, wrapperClassPrefix }) => {
        const { commonStore } = store as IRoot;
        const { setModalAuthVisible } = commonStore;
        const classPrefix = `nav-actions`;
        const items = 0;

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
                    <a className={`${classPrefix}_item__wrapper`}>
                        <IconCart />
                        <P>
                            {items
                                ? `${items} ${items > 1 ? "items" : "item"}`
                                : "Cart"}
                        </P>
                    </a>
                </Link>
                <ButtonLink
                    color={EButtonColor.transparent}
                    className={`${classPrefix}_item__wrapper`}
                    href={PATH_MY_ACCOUNT_PAGE}
                    // onClick={() => setModalAuthVisible(true)}
                >
                    <IconUser />
                    <P>Logout</P>
                </ButtonLink>
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
