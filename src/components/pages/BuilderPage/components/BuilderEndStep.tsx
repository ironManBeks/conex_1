import { FC } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";

import { H2, H4 } from "@components/Text";

import { TBuilderCompProps } from "@components/pages/BuilderPage/types";
import { IRoot } from "@store/store";
import { renderResultDataToOptionsList } from "@helpers/builderHelper";

const BuilderEndStep: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step-end`;
        const { builderStore } = store as IRoot;
        const { resultDoorData } = builderStore;

        return (
            <div className={cn(`${classPrefix}__wrapper`)}>
                <H2>Selected values in form:</H2>
                <br />
                <br />
                <div className={cn(`${classPrefix}__list`)}>
                    {renderResultDataToOptionsList(
                        resultDoorData,
                        undefined,
                        undefined,
                        undefined,
                        true,
                    ).map((item, index) => (
                        <div key={index} className={cn(`${classPrefix}__item`)}>
                            <H4>{item.title}:</H4>
                            <ul>
                                {item.list.map(
                                    (listItem, listItemIndex) =>
                                        listItem && (
                                            <li key={listItemIndex}>
                                                <b>{listItem.label}</b>
                                                <span>{listItem.value}</span>
                                            </li>
                                        ),
                                )}
                            </ul>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        );
    }),
);

export default BuilderEndStep;
