import { notification } from "antd";
import { IconCross } from "@components/Icons";
import { ArgsProps } from "antd/lib/notification";

export const showNotification = (props: ArgsProps): void => {
    const { maxCount, closeIcon, placement } = props;
    const type = props.type || "info";
    notification.config({
        maxCount: maxCount || 3,
    });
    notification[type]({
        ...props,
        placement: placement ?? "topRight",
        maxCount: undefined,
        closeIcon: closeIcon || <IconCross width={16} height={16} />,
    });
};
