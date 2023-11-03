import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TFooterProps } from "@components/segments/Footer/types";

export type TLayoutProps = {
    headerClassName?: string;
    layoutClassName?: string;
    footerClassName?: string;
    isFullFooter?: TFooterProps["isFullFooter"];
} & TSectionTypes;
