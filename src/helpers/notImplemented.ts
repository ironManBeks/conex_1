import { notification } from "antd";

export const notImplemented = (description?: string): void => {
    return notification.info({
        message: "Not implemented",
        description,
    });
};
