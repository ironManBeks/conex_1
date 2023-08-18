import { FC, ReactElement, useRef, useState } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { CSSTransition } from "react-transition-group";

import { H3 } from "@components/Text";
import { IconOpenFilter } from "@components/Icons";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";

import { ColorTheme } from "@common/theme/colorTheme";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TAdditionalServicesOption } from "@components/globalComponents/types";
import { AddedOptionsListMockup } from "../../../../mockups/AddedOptionsListMockup";
import { IRoot } from "@store/store";

const SearchFilter: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_filter`;
        const { commonStore } = store as IRoot;
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
    }),
);

export default SearchFilter;

const FilterInfo = ({ onClose }: { onClose: () => void }): ReactElement => {
    const classPrefix = "filter-info";

    const additionalServicesOptions: TAdditionalServicesOption[] = [
        { label: "Additional charges", value: "$23.00" },
    ];

    const additionalServicesTotalOption: TAdditionalServicesOption = {
        label: "Grand Total",
        value: "$2,323.00",
    };

    return (
        <div className={`${classPrefix}_wrapper`}>
            <div className={`${classPrefix}_head`} onClick={onClose}>
                <H3>Your filters</H3>
            </div>
            <div className={`${classPrefix}_body`}>
                <AddedOptionsList
                    optionsList={AddedOptionsListMockup}
                    className={`${classPrefix}_added-options__wrapper`}
                />
                <AdditionalServices
                    className={`${classPrefix}_total__wrapper`}
                    options={additionalServicesOptions}
                    totalOption={additionalServicesTotalOption}
                />
            </div>
        </div>
    );
};
