import { showNotification } from "@helpers/notificarionHelper";

export const notImplemented = (description?: string): void => {
    return showNotification({
        mainProps: {
            message: "Not implemented",
            description,
        },
    });
};
