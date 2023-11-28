import { useEffect } from "react";
import { addSearchQueryParams } from "./addSearchQueryParams";
import { joinArr } from "./joinArray";
import { NextRouter } from "next/router";

export const listenToFormValue = (
    queryKey: string,
    router: NextRouter,
    arr?: string[],
    isDirty?: boolean,
) => {
    return useEffect(() => {
        if (isDirty)
            addSearchQueryParams(router, {
                [queryKey]: joinArr(arr),
            });
    }, [isDirty, arr?.length]);
};
