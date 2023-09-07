import {
    action,
    makeAutoObservable,
    observable,
    runInAction,
    toJS,
} from "mobx";
import { AxiosResponse } from "axios";

import {
    IBuilderStore,
    TBuilderStepDataDTO,
    TGetBuilderAllDataResponse,
    TGetBuilderParamsDataParams,
    TGetBuilderParamsDataResponse,
    TGetBuilderSettingsResponse,
    TResultDoorData,
    TStepHistoryActions,
    TStepPath,
    TStepQueueActions,
    TUpdateCurrentStepWay,
} from "./types";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { isArray, isEmpty, isNil, isNumber, isObject, uniq } from "lodash";
import { TNullable } from "@globalTypes/commonTypes";
import { showNotification } from "@helpers/notificarionHelper";
import { setStorage } from "@services/storage.service";
import {
    BUILDER_PARENT_ID,
    BUILDER_RESUlT_DATA,
} from "@consts/storageNamesContsts";

export class BuilderStore implements IBuilderStore {
    builderAllData: TNullable<TGetBuilderAllDataResponse> = null;
    builderAllDataFetching = true;
    builderParamsData: TNullable<TGetBuilderParamsDataResponse> = null;
    builderParamsDataFetching = false;
    builderSettings: TNullable<TGetBuilderSettingsResponse> = null;
    builderSettingsFetching = true;
    // not request
    currentStepData: TBuilderStepDataDTO | null = null;
    currentStepId: TNullable<number> = null;
    stepHistory: number[] = [];
    stepQueue: number[] = [];
    resultDoorData: TNullable<TResultDoorData[]> = null;
    endDoorData: TNullable<TResultDoorData[]> = null;

    constructor() {
        makeAutoObservable(this, {
            builderAllData: observable,
            builderAllDataFetching: observable,
            builderParamsData: observable,
            builderParamsDataFetching: observable,
            builderSettings: observable,
            builderSettingsFetching: observable,
            //
            currentStepData: observable,
            currentStepId: observable,
            stepHistory: observable,
            stepQueue: observable,
            resultDoorData: observable,
            endDoorData: observable,
            // functions
            setBuilderAllData: action,
            setBuilderAllDataFetching: action,
            setBuilderParamsData: action,
            setBuilderParamsDataFetching: action,
            setBuilderSettings: action,
            setBuilderSettingsFetching: action,
            //
            setStepHistory: action,
            setCurrentStepData: action,
            setCurrentStepId: action,
            setStepQueue: action,
            setResultDoorData: action,
            setEndDoorData: action,
        });
    }

    getBuilderSettings = (): Promise<
        AxiosResponse<TGetBuilderSettingsResponse>
    > => {
        this.setBuilderSettingsFetching(true);
        return axiosInstance
            .get("/setting")
            .then((data: AxiosResponse<TGetBuilderSettingsResponse>) => {
                this.setBuilderSettings(data.data);
                return data;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderSettingsFetching(false);
            });
    };

    setBuilderSettings = (
        data: TNullable<TGetBuilderSettingsResponse>,
    ): void => {
        this.builderSettings = data;
    };

    setBuilderSettingsFetching = (value: boolean): void => {
        this.builderSettingsFetching = value;
    };

    getBuilderAllData = (): Promise<
        AxiosResponse<TGetBuilderAllDataResponse>
    > => {
        this.setBuilderAllDataFetching(true);
        return axiosInstance
            .get("/quiz-questions")
            .then((data: AxiosResponse<TGetBuilderAllDataResponse>) => {
                this.setBuilderAllData(data.data);
                return data;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderAllDataFetching(false);
            });
    };

    setBuilderAllData = (data: TNullable<TGetBuilderAllDataResponse>): void => {
        this.builderAllData = data;
    };

    setBuilderAllDataFetching = (value: boolean): void => {
        this.builderAllDataFetching = value;
    };

    getBuilderParamsData = (
        params: TGetBuilderParamsDataParams,
    ): Promise<AxiosResponse<TGetBuilderParamsDataResponse>> => {
        this.setBuilderParamsDataFetching(true);
        return axiosInstance
            .get("/quiz-questions", { params })
            .then((data: AxiosResponse<TGetBuilderParamsDataResponse>) => {
                this.setBuilderParamsData(data.data);
                return data;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderParamsDataFetching(false);
            });
    };

    setBuilderParamsData = (
        data: TNullable<TGetBuilderParamsDataResponse>,
    ): void => {
        this.builderParamsData = data;
    };

    setBuilderParamsDataFetching = (value: boolean): void => {
        this.builderParamsDataFetching = value;
    };

    //______________________
    //______________________
    //______________________
    // functions
    //______________________
    //______________________
    //______________________

    setStepHistory = (
        stepId: TStepPath,
        action: TStepHistoryActions | undefined,
    ): void => {
        if (isNil(stepId)) {
            if (action === "clear") {
                this.stepHistory = [];
            }
            return;
        }
        if (isArray(stepId) && stepId.length) {
            if (action === "add-to-end") {
                this.stepHistory = [...this.stepHistory, ...stepId];
            }
            if (action === "add-to-start") {
                this.stepHistory = [...stepId, ...this.stepHistory];
            }
            if (action === "remove") {
                this.stepHistory = this.stepHistory.filter(
                    (item) => !stepId.includes(item),
                );
            }
            if (action === "replace") {
                this.stepHistory = [...stepId];
            }
            return;
        }

        if (isNumber(stepId)) {
            if (action === "add-to-end") {
                this.stepHistory = [...this.stepHistory, stepId];
            }
            if (action === "add-to-start") {
                this.stepHistory = [stepId, ...this.stepHistory];
            }
            if (action === "remove") {
                this.stepHistory = this.stepHistory.filter(
                    (item) => item !== stepId,
                );
            }
            if (action === "replace") {
                this.stepHistory = [stepId];
            }
            return;
        }
    };

    setStepQueue = (
        stepId: TStepPath,
        action: TStepQueueActions | undefined,
    ): void => {
        if (isNil(stepId)) {
            if (action === "clear") {
                this.stepQueue = [];
            }
            return;
        }

        if (isArray(stepId) && stepId.length) {
            const steps = uniq(stepId);
            if (action === "add-to-end" && steps.length) {
                this.stepQueue = [...this.stepQueue, ...steps];
            }
            if (action === "add-to-start" && steps.length) {
                this.stepQueue = [...steps, ...this.stepQueue];
            }
            if (action === "remove") {
                this.stepQueue = this.stepQueue.filter(
                    (item) => !stepId.includes(item),
                );
            }
            return;
        }
        if (isNumber(stepId)) {
            if (action === "add-to-end") {
                this.stepQueue = [...this.stepQueue, stepId];
            }
            if (action === "add-to-start") {
                this.stepQueue = [stepId, ...this.stepQueue];
            }
            if (action === "remove") {
                this.stepQueue = this.stepQueue.filter(
                    (item) => item !== stepId,
                );
            }
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

    updateCurrentStepData = (
        way: TUpdateCurrentStepWay,
        changeQueue = true,
        changeHistory = true,
    ): void => {
        if (!this.builderAllData) return;

        if (!isEmpty(this.endDoorData)) {
            this.setEndDoorData(null);
        }

        if (way === "main-step") {
            const quizStartId = this.builderSettings?.data.quizStartId;
            if (quizStartId && isNumber(quizStartId)) {
                const startStep = this.builderAllData.data.find(
                    (item) => item.id === quizStartId,
                );
                if (startStep) {
                    this.setCurrentStepData(startStep);
                } else this.setCurrentStepData(this.builderAllData.data[0]);
            } else this.setCurrentStepData(this.builderAllData.data[0]);
            return;
        }

        if (
            isObject(way) &&
            way.action === "start-way" &&
            isNumber(way.parentId)
        ) {
            this.getBuilderParamsData({ parent: way.parentId }).then(() => {
                setStorage(BUILDER_PARENT_ID, way.parentId);
                if (isNumber(way.nextStep)) {
                    this.updateCurrentStepData(way.nextStep);
                }
            });
        }

        if (way === "prev") {
            if (!isEmpty(this.endDoorData)) {
                this.setEndDoorData(null);
            }

            const prevStepId = this.stepHistory[this.stepHistory.length - 1];

            if (
                isNumber(prevStepId) &&
                this.builderParamsData?.filteredData?.length
            ) {
                const prevStep = this.builderParamsData.filteredData.find(
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
            if (this.builderParamsData?.filteredData?.length) {
                const nextStepData = this.builderParamsData.filteredData.find(
                    (item) => item.id === way,
                );

                if (!isEmpty(nextStepData)) {
                    if (changeHistory) {
                        this.setStepHistory(this.currentStepId, "add-to-end");
                    }
                    if (changeQueue) {
                        this.setStepQueue(this.currentStepId, "remove");
                    }
                    this.setCurrentStepData(nextStepData);
                    return;
                }
            }
            showNotification({
                type: "error",
                message: "Step not found",
                description: "Try to reload the page or select another option",
            });
            return;
        }
    };

    setResultDoorData = (data: TNullable<TResultDoorData[]>): void => {
        runInAction(() => {
            setStorage(BUILDER_RESUlT_DATA, data);
            this.resultDoorData = data;
        });
    };

    setEndDoorData = (data: TNullable<TResultDoorData[]>): void => {
        this.endDoorData = data;
    };

    setDefaultValuesToBuilder = (
        history: number[],
        queue: number[],
        result: TResultDoorData[],
        stepId: number,
        parentId: number,
    ): void => {
        this.setStepQueue(queue, "add-to-end");
        this.setStepHistory(history, "add-to-start");
        this.setResultDoorData(result);
        this.updateCurrentStepData({
            action: "start-way",
            parentId: parentId,
            nextStep: stepId,
        });
    };

    resetAllBuilderData = (withUpdateData = false): void => {
        this.setBuilderAllData(null);
        this.setBuilderParamsData(null);
        this.setBuilderSettings(null);
        this.setEndDoorData(null);
        this.setCurrentStepData(null);
        this.setCurrentStepId(null);
        this.setResultDoorData(null);
        this.setStepQueue(undefined, "clear");
        this.setStepHistory(undefined, "clear");
        this.setBuilderAllDataFetching(true);
        this.setBuilderParamsDataFetching(false);
        this.setBuilderSettingsFetching(true);
        if (withUpdateData) {
            this.getBuilderSettings().then(() => {
                this.getBuilderAllData().then(() => {
                    this.updateCurrentStepData("main-step");
                });
            });
        }
    };
}
