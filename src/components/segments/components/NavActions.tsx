import { FC } from "react";
import cn from "classnames";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import { H5, P } from "@components/Text";
import { IconCart } from "@components/Icons";
import FieldInputController from "@components/form/formControllers/FieldInputController";

import { PATH_BUILDER_PAGE, PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import {
    ESearchFormNames,
    searchFormDefaultValues,
    searchFormResolver,
    TSearchForm,
} from "./formAttrs";
import { TNavTypes } from "./types";

const NavActions: FC<TNavTypes> = ({ wrapperClassPrefix }) => {
    const classPrefix = `nav-actions`;
    const items = 2;

    const methods = useForm<TSearchForm>({
        resolver: searchFormResolver(),
        defaultValues: searchFormDefaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TSearchForm> = (data) => {
        console.log("SubmitHandler", data);
    };

    return (
        <div
            className={cn(
                `${wrapperClassPrefix}_${classPrefix}__wrapper`,
                `${classPrefix}_wrapper`,
            )}
        >
            <div className={`${classPrefix}_search__wrapper`}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldInputController
                            name={ESearchFormNames.search}
                            placeholder="Search"
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("Search", value);
                            }}
                        />
                    </form>
                </FormProvider>
            </div>
            <Link href={PATH_MY_ACCOUNT_PAGE}>
                <div className={`${classPrefix}_cart__wrapper`}>
                    <div className={`${classPrefix}_cart__icon`}>
                        <IconCart />
                    </div>
                    <div className={`${classPrefix}_cart__content`}>
                        <H5>My Cart</H5>
                        <P>
                            {items} {items > 1 ? "items" : "item"}
                        </P>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default NavActions;
