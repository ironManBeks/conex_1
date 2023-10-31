import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IBuilderStore,
    TBuilderCartActions,
    TBuilderCartData,
    TBuilderStepDataDTO,
    TCartItem,
    TEditBuilderCartItemData,
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
import {
    isArray,
    isEmpty,
    isNil,
    isNumber,
    isObject,
    isString,
    uniq,
} from "lodash";
import { TNullable } from "@globalTypes/commonTypes";
import { showNotification } from "@helpers/notificarionHelper";
import { setStorage } from "@services/storage.service";
import {
    BUILDER_CART,
    BUILDER_PARENT_ID,
    BUILDER_RESUlT_DATA,
} from "@consts/storageNamesContsts";

export class BuilderStore implements IBuilderStore {
    builderAllData: TNullable<TGetBuilderAllDataResponse> = null;
    builderAllDataFetching = false;
    builderParamsData: TNullable<TGetBuilderParamsDataResponse> = null;
    builderParamsDataFetching = false;
    builderSettings: TNullable<TGetBuilderSettingsResponse> = null;
    builderSettingsFetching = true;
    // -------------------------------------------------------------------------------
    // not request
    currentStepData: TBuilderStepDataDTO | null = null;
    currentStepId: TNullable<number> = null;
    stepHistory: number[] = [];
    stepQueue: number[] = [];
    resultDoorData: TNullable<TResultDoorData[]> = null;
    endDoorData: TNullable<TResultDoorData[]> = null;
    builderCartData: TNullable<TBuilderCartData> = null;
    editBuilderCartItemData: TNullable<TEditBuilderCartItemData> = null;
    constructor() {
        makeAutoObservable(this);
    }

    setBuilderSettings = (
        data: TNullable<TGetBuilderSettingsResponse>,
    ): void => {
        this.builderSettings = data;
    };

    setBuilderSettingsFetching = (value: boolean): void => {
        this.builderSettingsFetching = value;
    };

    setBuilderAllData = (data: TNullable<TGetBuilderAllDataResponse>): void => {
        this.builderAllData = data;
    };

    setBuilderAllDataFetching = (value: boolean): void => {
        this.builderAllDataFetching = value;
    };

    setBuilderParamsData = (
        data: TNullable<TGetBuilderParamsDataResponse>,
    ): void => {
        this.builderParamsData = data;
    };

    setBuilderParamsDataFetching = (value: boolean): void => {
        this.builderParamsDataFetching = value;
    };

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

        if (isArray(stepId)) {
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

    setResultDoorData = (data: TNullable<TResultDoorData[]>): void => {
        setStorage(BUILDER_RESUlT_DATA, data);
        this.resultDoorData = data;
    };

    setEndDoorData = (data: TNullable<TResultDoorData[]>): void => {
        this.endDoorData = data;
    };

    setBuilderCartData = (data: TNullable<TBuilderCartData>): void => {
        setStorage(BUILDER_CART, data);
        this.builderCartData = data;
    };

    setEditBuilderCartItemData = (
        data: TNullable<TEditBuilderCartItemData>,
    ): void => {
        this.editBuilderCartItemData = data;
    };

    // -------------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------------

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

            if (isNumber(prevStepId) && this.builderParamsData?.data?.length) {
                const prevStep = this.builderParamsData.data.find(
                    (item) => item.id === prevStepId,
                );
                if (!isEmpty(prevStep)) {
                    this.setCurrentStepData(prevStep);
                    if (changeHistory) {
                        this.setStepHistory(prevStepId, "remove");
                    }
                }
            }
            return;
        }

        if (isNumber(way)) {
            if (this.builderParamsData?.data?.length) {
                const nextStepData = this.builderParamsData.data.find(
                    (item) => item.id === way,
                );

                if (!isEmpty(nextStepData)) {
                    if (changeHistory) {
                        const isInHistory = this.stepHistory.find(
                            (item) => item === this.currentStepId,
                        );
                        if (isNil(isInHistory)) {
                            this.setStepHistory(
                                this.currentStepId,
                                "add-to-end",
                            );
                        }
                    }
                    if (changeQueue) {
                        this.setStepQueue(this.currentStepId, "remove");
                    }
                    this.setCurrentStepData(nextStepData);
                    return;
                }
            }
            showNotification({
                mainProps: {
                    type: "error",
                    message: "Step not found",
                    description:
                        "Try to reload the page or select another option",
                },
            });
            return;
        }
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

    setElementsToBuilderCard = (
        data: TCartItem[] | undefined,
        action: TBuilderCartActions | undefined,
    ): void => {
        if (isNil(data) && action === "clear" && !isNil(this.builderCartData)) {
            this.builderCartData.elements = [];
        }
        const newResult: TBuilderCartData = {
            elements: [],
        };

        if (!isNil(this.builderCartData)) {
            Object.assign(newResult, this.builderCartData);
        }

        if (isNil(data)) {
            if (isObject(action) && action.action === "remove" && action.id) {
                if (isString(action.id)) {
                    this.setBuilderCartData({
                        elements: newResult.elements.filter(
                            (item) => item.doorId !== action.id,
                        ),
                    });
                }
                if (isArray(action.id)) {
                    this.setBuilderCartData({
                        elements: newResult.elements.filter(
                            (item) => !action.id.includes(item.doorId),
                        ),
                    });
                }
            }
            return;
        }

        if (action === "update" && data?.length) {
            for (let i = 0; i < data.length; i++) {
                const doorId = data[i].doorId;
                const doorIndex = newResult.elements.findIndex(
                    (item) => item.doorId === doorId,
                );

                if (doorIndex !== -1) {
                    newResult.elements[doorIndex] = data[i];
                    this.setBuilderCartData({
                        elements: [...newResult.elements],
                    });
                }
            }
        }

        if (action === "add-to-end") {
            this.setBuilderCartData({
                elements: [...newResult.elements, ...data],
            });
        }

        if (action === "add-to-start") {
            this.setBuilderCartData({
                elements: [...data, ...newResult.elements],
            });
        }
    };

    resetBuilderFormData = (withUpdateData = false): void => {
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
