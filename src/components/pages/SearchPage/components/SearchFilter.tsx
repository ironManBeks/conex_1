import { FC, ReactElement, useRef, useState } from "react";
import cn from "classnames";
import { observer } from "mobx-react";
import { CSSTransition } from "react-transition-group";

import { H3, H4, H5, P } from "@components/Text";
import { IconOpenFilter } from "@components/Icons";

import { ColorTheme } from "@common/theme/colorTheme";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { useRootStore } from "@store";

const SearchFilter: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_filter`;
    const { commonStore } = useRootStore();
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);

    const handleOpen = (val: boolean) => {
        setIsOpen(val);
    };

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div
                className={`${classPrefix}__inner-wrapper`}
                style={{
                    top: commonStore.headerHeight + 10,
                    maxHeight: `calc(100vh - 40px - ${commonStore.headerHeight}px)`,
                }}
            >
                <div
                    className={cn("filter-collapsible_wrapper", {
                        _open: isOpen,
                    })}
                    onClick={() => handleOpen(true)}
                >
                    <IconOpenFilter color={ColorTheme.secondary._800} />
                </div>
                <CSSTransition
                    in={isOpen}
                    nodeRef={nodeRef}
                    timeout={300}
                    classNames="filter-collapsible_inner-wrapper"
                    unmountOnExit
                >
                    <div
                        ref={nodeRef}
                        className="filter-collapsible_inner-wrapper"
                    >
                        <FilterInfo onClose={() => handleOpen(false)} />
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
});

export default SearchFilter;

// ToDo Уточнить функционал фильтра. Если что, то вынести в отдельную компонентну + стили
const FilterInfo = ({ onClose }: { onClose: () => void }): ReactElement => {
    const classPrefix = "filter-info";
    const filterData = filterDataMockup;

    return (
        <div className={`${classPrefix}_wrapper`}>
            <div className={`${classPrefix}_head`} onClick={onClose}>
                <H3>Your filters</H3>
            </div>
            <div className={`${classPrefix}_body`}>
                {filterData.list.length && (
                    <div className={`${classPrefix}_list`}>
                        {filterData.list.map((item, index) => (
                            <div
                                key={index}
                                className={`${classPrefix}_item__wrapper`}
                            >
                                <H4 className={`${classPrefix}_item__title`}>
                                    {item.title}
                                </H4>
                                <div className={`${classPrefix}_item__list`}>
                                    {item.list.map((subItem, subIndex) => (
                                        <P key={subIndex}>
                                            <span className="label">
                                                {subItem.label}
                                            </span>
                                            <span className="value">
                                                {typeof subItem.value ===
                                                "number"
                                                    ? `$${subItem.value}`
                                                    : subItem.value}
                                            </span>
                                        </P>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className={`${classPrefix}_total__wrapper`}>
                    <div className={cn(`${classPrefix}_total__charges`)}>
                        <H5>Additional charges</H5>
                        <P>$23.00</P>
                    </div>
                    <div className={cn(`${classPrefix}_total__grand`)}>
                        <H5>Grand Total</H5>
                        <P>$2,323.00</P>
                    </div>
                </div>
            </div>
        </div>
    );
};

const filterDataMockup = {
    list: [
        {
            title: "Metal door type",
            list: [
                { label: "1", value: 1 },
                { label: "q", value: "q" },
            ],
        },
        {
            title: "Fire protection",
            list: [
                { label: "qwertyuioqwertyuio", value: "qwertyuioqwertyuio" },
                { label: "qwertyuioqwertyuio", value: 123456789 },
            ],
        },
        {
            title: "Extras",
            list: [
                { label: "Lorem 12345", value: 123 },
                { label: "IPSUMOLD 1234512345", value: 1234 },
                { label: "Replacement Replacement", value: 123 },
                { label: "Replacement12345", value: "qweqweqwe" },
                { label: "Replacement", value: 1234 },
                { label: "ReplacementReplacement", value: 123 },
                { label: "Replacement", value: 1234 },
            ],
        },
    ],
    additionalCharges: 123,
    grandTotal: 123,
};
