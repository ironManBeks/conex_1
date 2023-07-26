import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconEdit: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "14"}
            height={height || "12"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 14 12"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.0593 9.63881V7.37137L11.4655 5.96512V10.0961C11.4655 10.9224 10.7799 11.6081 9.97154 11.6081H1.74498C0.918664 11.6081 0.250977 10.9224 0.250977 10.0961V1.887C0.250977 1.06069 0.919227 0.375 1.74498 0.375H10.0947V0.392438L8.68848 1.78125H2.21973C1.92104 1.78125 1.65723 2.04506 1.65723 2.36119V9.63881C1.65723 9.9555 1.92104 10.2013 2.21973 10.2013H9.49735C9.79604 10.2013 10.0593 9.95494 10.0593 9.63881ZM11.3952 1.06069L12.8892 2.55469L13.5749 1.869L12.0809 0.375L11.3952 1.06069ZM6.13923 6.33413L7.61579 7.82812L12.3796 3.06431L10.903 1.57031L6.13923 6.33413ZM5.08454 8.86537L7.1236 8.32031L5.6296 6.82631L5.08454 8.86537Z" />{" "}
        </svg>
    );
};

export default IconEdit;
