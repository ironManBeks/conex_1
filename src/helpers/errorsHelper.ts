import { isEmpty, isObject, isString } from "lodash";
import axios, { AxiosError } from "axios";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import { showNotification } from "@helpers/notificarionHelper";
import { TResponseError } from "@globalTypes/requestTypes";
import { ArgsProps } from "antd/es/notification/interface";

export const pickOutFormErrorMessages = <
    S extends FieldErrors,
    T extends string[] = [],
>(
    errorList: S,
    exceptions?: T,
): string[] => {
    const result: string[] = [];
    if (isEmpty(errorList)) {
        return result;
    }

    const keys = Object.keys(errorList);

    for (let i = 0; i < keys.length; i++) {
        const currentKey: keyof FieldErrors = keys[i];
        const hasMessage =
            !isEmpty(errorList) &&
            typeof errorList !== "undefined" &&
            !isEmpty(errorList[currentKey]) &&
            !exceptions?.includes(currentKey) &&
            errorList[currentKey]?.message;

        if (hasMessage) {
            result.push(errorList[currentKey]?.message as string);
        }
    }
    return result;
};

export const showAxiosNotificationError = (
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    props: AxiosError | TResponseError | any,
): void => {
    let notificationProps: ArgsProps = {
        message: `Unknown error`,
        description: `Try to reload the page or report an error to the site administration`,
    };
    if (!props) {
        showNotification({
            mainProps: {
                ...notificationProps,
                type: "error",
            },
        });
        return;
    }

    if (axios.isAxiosError(props) || axios.isAxiosError(props?.data)) {
        notificationProps = {
            message: `Error ${props.response?.status}`,
            description: props.message || props.response?.data.message,
        };
    } else if (isObject(props.data.error) && !isEmpty(props.data.error)) {
        notificationProps = {
            message: `Error ${props.data.error.status}`,
            description: props.data.error.message,
        };
    } else if (isString(props.data)) {
        notificationProps = {
            message: `Error: ${props.data}`,
            description: "Please try to reload the page",
        };
    }

    showNotification({
        mainProps: {
            ...notificationProps,
            type: "error",
        },
    });
};
