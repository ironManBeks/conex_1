import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

import { AUTH_FORM_QUERY } from "@consts/queryNamesConsts";
import { EAuthFormType } from "@components/globalComponents/AuthForm/types";

export const useSelectAuthForm = () => {
    const router = useRouter();
    const currentForm = router.query[AUTH_FORM_QUERY] as
        | string
        | EAuthFormType
        | undefined;

    const setForm = useCallback(
        (value: EAuthFormType) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: { [AUTH_FORM_QUERY]: value },
                },
                undefined,
                {
                    scroll: true,
                    shallow: true,
                },
            );
        },
        [router],
    );

    return useMemo(() => ({ currentForm, setForm }), [currentForm, setForm]);
};
