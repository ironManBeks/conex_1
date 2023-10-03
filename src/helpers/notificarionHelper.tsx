import { notification } from "antd";
import { IconCross } from "@components/Icons";

import { ArgsProps, GlobalConfigProps } from "antd/es/notification/interface";

export const showNotification = ({
    mainProps,
    configProps,
}: {
    mainProps: ArgsProps;
    configProps?: GlobalConfigProps;
}): void => {
    const { closeIcon, placement } = mainProps;
    const type = mainProps.type || "info";
    notification.config({
        ...configProps,
        maxCount: configProps?.maxCount || 3,
    });

    notification[type]({
        ...mainProps,
        placement: placement ?? "topRight",
        closeIcon: closeIcon || <IconCross width={16} height={16} />,
        className: "common-notification",
    });
};
