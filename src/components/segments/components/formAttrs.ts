import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export enum ESearchFormNames {
    search = "search",
}

export type TSearchForm = {
    [ESearchFormNames.search]: string;
};

export const searchFormResolver = (): Resolver<TSearchForm> => {
    const requiredText = "This field is required";

    return yupResolver(
        yup.object().shape({
            [ESearchFormNames.search]: yup.string().required(requiredText),
        }),
    );
};

export const searchFormDefaultValues: TSearchForm = {
    [ESearchFormNames.search]: "",
};
