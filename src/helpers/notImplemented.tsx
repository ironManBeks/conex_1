import { IconCross } from "@components/Icons";
import { showNotification } from "@helpers/notificarionHelper";

export const notImplemented = (description?: string): void => {
    return showNotification({
        message: "Not implemented",
        description,
        duration: 100000,
        closeIcon: <IconCross width={12} height={12} />,
    });
};
