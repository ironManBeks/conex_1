import { isUndefined, omitBy } from "lodash";
import { NextRouter } from "next/router";

export const addSearchQueryParams = (
    router: NextRouter,
    queryParams: object,
    scrollValues?: object,
) => {
    const filteredQueryParams = {
        ...router.query,
        ...queryParams,
    };

    console.log({ query: router.query, queryParams });

    router.replace(
        {
            query: omitBy(filteredQueryParams, isUndefined),
        },
        undefined,
        { scroll: false, shallow: true, ...scrollValues },
    );
};
