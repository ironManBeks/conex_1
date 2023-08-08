import { IconCross } from "@components/Icons";
import { showNotification } from "@helpers/notificarionHelper";

export const notImplemented = (description?: string): void => {
    return showNotification({
        message: "Not implemented",
        description,
        closeIcon: <IconCross width={12} height={12} />,
    });
};
