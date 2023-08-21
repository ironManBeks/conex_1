import { action, makeAutoObservable, observable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IBuilderStore,
    TBuilderDTO,
    TBuilderStepDataDTO,
    TResultDoorData,
    TStepHistoryActions,
} from "./types";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { isArray, isEmpty, isNumber, uniq } from "lodash";
import { TNullable } from "@globalTypes/commonTypes";

export class BuilderStore implements IBuilderStore {
    builderData: TNullable<TBuilderDTO> = null;
    builderDataFetching = true;
    currentStepData: TBuilderStepDataDTO | null = null;
    currentStepId: TNullable<number> = null;
    stepHistory: number[] = [];
    stepQueue: number[] = [];
    resultDoorData: TResultDoorData = null;
    endDoorData: TResultDoorData = null;

    constructor() {
        makeAutoObservable(this, {
            builderData: observable,
            builderDataFetching: observable,
            currentStepData: observable,
            currentStepId: observable,
            stepHistory: observable,
            stepQueue: observable,
            resultDoorData: observable,
            endDoorData: observable,
            // functions
            setBuilderData: action,
            setBuilderDataFetching: action,
            setStepHistory: action,
            setCurrentStepData: action,
            setCurrentStepId: action,
            setStepQueue: action,
            setResultDoorData: action,
            setEndDoorData: action,
        });
    }

    getBuilderData = (): Promise<void> => {
        return axiosInstance
            .get("/quiz-questions")
            .then((data: AxiosResponse<TBuilderDTO>) => {
                this.setBuilderData(data.data);
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderDataFetching(false);
            });
    };

    setBuilderData = (data: TBuilderDTO): void => {
        this.builderData = data;
    };

    setBuilderDataFetching = (value: boolean): void => {
        this.builderDataFetching = value;
    };

    setStepHistory = (
        stepId: number | undefined | null,
        action: TStepHistoryActions | undefined,
    ): void => {
        if (!isNumber(stepId) && !action) {
            const nerArr = this.stepHistory.splice(-1);
            this.stepHistory = uniq([...nerArr]);
            return;
        }

        if (action === "add") {
            if (isNumber(stepId)) {
                this.stepHistory = uniq([...this.stepHistory, stepId]);
            }
            return;
        }

        if (action === "remove") {
            const newArr = this.stepHistory.filter((item) => item !== stepId);
            this.stepHistory = uniq([...newArr]);
            return;
        }
    };

    setStepQueue = (
        stepId: number | undefined | null | number[],
        action: TStepHistoryActions | undefined,
    ): void => {
        if (!stepId || !action) return;

        if (isArray(stepId)) {
            const steps = uniq(stepId);
            if (action === "add") {
                this.stepQueue = [...this.stepQueue, ...steps];
            }
            if (action === "remove") {
                const newArr = this.stepQueue.filter(
                    (item) => item !== stepId[0],
                );
                this.stepQueue = [...newArr];
            }
        }
        if (action === "add") {
            if (isNumber(stepId)) {
                this.stepQueue = [...this.stepQueue, stepId];
            }
        }
        if (action === "remove") {
            const newArr = this.stepQueue.filter((item) => item !== stepId);
            this.stepQueue = [...newArr];
            return;
        }
    };

    setCurrentStepId = (data: number | null): void => {
        this.currentStepId = data;
    };

    setCurrentStepData = (data: TBuilderStepDataDTO | null): void => {
        this.currentStepData = data;
        this.setCurrentStepId(data?.id ?? null);
    };

    updateCurrentStepData = (way: "start" | "prev" | number): void => {
        if (!this.builderData) return;

        if (way === "start") {
            this.setCurrentStepData(this.builderData.data[0]);
            return;
        }

        if (way === "prev") {
            if (!isEmpty(this.endDoorData)) {
                this.setEndDoorData(null);
            }

            // Remove step in resultDoorData (right side panel)
            if (
                this.currentStepData?.attributes.fieldName &&
                this.resultDoorData &&
                this.currentStepData?.attributes.fieldName in
                    this.resultDoorData
            ) {
                const newObj = { ...this.resultDoorData };
                delete newObj[this.currentStepData?.attributes.fieldName];
                this.setResultDoorData(newObj);
            }

            const prevStepId = this.stepHistory[this.stepHistory.length - 1];

            if (isNumber(prevStepId)) {
                const prevStep = this.builderData.data.find(
                    (item) => item.id === prevStepId,
                );
                if (!isEmpty(prevStep)) {
                    this.setCurrentStepData(prevStep);
                    this.setStepHistory(prevStepId, "remove");
                }
            }
            return;
        }

        if (isNumber(way)) {
            const nextStep = this.builderData.data.find(
                (item) => item.id === way,
            );
            if (!isEmpty(nextStep)) {
                this.setStepHistory(this.currentStepId, "add");
                this.setStepQueue(this.currentStepId, "remove");
                this.setCurrentStepData(nextStep);
            }
            return;
        }
    };

    setResultDoorData = (data: TResultDoorData): void => {
        this.resultDoorData = data;
    };

    setEndDoorData = (data: TResultDoorData): void => {
        this.endDoorData = data;
    };
}
