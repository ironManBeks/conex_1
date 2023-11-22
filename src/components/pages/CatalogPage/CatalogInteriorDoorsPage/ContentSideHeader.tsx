import SortBy from "@components/SortBy";
import { FC } from "react";
import { sortTypes } from "./const";
import DisplayToggle from "@components/DisplayToggle";

interface ContentSideHeaderProps {
    pageClassPrefix: string;
}

const ContentSideHeader: FC<ContentSideHeaderProps> = ({ pageClassPrefix }) => {
    const additionalClassName = "content-header";
    const classNameBase = `${pageClassPrefix}__${additionalClassName}`;

    return (
        <div className={classNameBase}>
            <div className={`${classNameBase}__sorters`}>
                <span className={`${classNameBase}__sort-text`}>Sort by</span>
                {sortTypes.map((type) => (
                    <SortBy key={type.text} {...type} />
                ))}
            </div>
            <div className={`${classNameBase}__display`}>
                <DisplayToggle
                    onIconClick={(value) => console.log({ value })}
                    display="grid"
                    className={`${classNameBase}__display-toggle`}
                />
            </div>
        </div>
    );
};

export default ContentSideHeader;
