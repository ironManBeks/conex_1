import { FC } from "react";
import { inject, observer } from "mobx-react";

import { TBuilderCompProps } from "@components/pages/BuilderPage/types";
import { IRoot } from "@store/store";
import { H2, H4 } from "@components/Text";
import { renderResultDataToOptionsList } from "@helpers/builderHelper";

const BuilderEndStep: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = store as IRoot;
        const { currentStepData, resultDoorData, endDoorData } = builderStore;

        return (
            <div>
                <H2>Selected values in form:</H2>
                <br />
                <br />
                {renderResultDataToOptionsList(resultDoorData).map(
                    (item, index) => (
                        <div key={index}>
                            <H4>{item.title}</H4>
                            <ul>
                                {item.list.map((listItem, listItemIndex) => (
                                    <li key={listItemIndex}>
                                        {listItem.label} _____ {listItem.value}
                                    </li>
                                ))}
                            </ul>
                            <br />
                        </div>
                    ),
                )}
            </div>
        );
    }),
);

export default BuilderEndStep;
