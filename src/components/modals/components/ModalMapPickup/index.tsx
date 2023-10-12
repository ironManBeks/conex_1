import { FC } from "react";
import { inject, observer } from "mobx-react";
import dynamic from "next/dynamic";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { H3, P } from "@components/Text";
import ModalLayout from "@components/modals/ModalLayout";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import PickupPoint from "@components/globalComponents/PickupPoint";
import FormFieldInput from "@components/form/formFields/FormFieldInput";

import { EModalSize } from "@components/modals/types";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import { EButtonColor } from "@components/buttons/types";
import { CheckoutPickupPointMockup } from "../../../../mockups/CheckoutPickupPointMockup";
import {
    EMapPickupFormFieldsNames,
    mapPickupFormDefaultValues,
    mapPickupFormResolver,
    TMapPickupForm,
} from "./formAttrs";

const MapWithNoSSR = dynamic(() => import("@components/Map"), {
    ssr: false,
});

const ModalMapPickup: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "modal-map-pickup";
        const { commonStore } = store as IRoot;

        const {
            modalMapPickupVisible,
            setModalMapPickupVisible,
            headerHeight,
        } = commonStore;

        const handleCloseModal = () => {
            setModalMapPickupVisible(false);
        };

        const methods = useForm<TMapPickupForm>({
            resolver: mapPickupFormResolver(),
            defaultValues: mapPickupFormDefaultValues,
        });

        const {
            handleSubmit,
            formState: { isValid },
        } = methods;

        const onSubmit: SubmitHandler<TMapPickupForm> = (data) => {
            console.log("data", data);
        };

        return (
            <ModalLayout
                wrapperClassName={classPrefix}
                modalVisible={modalMapPickupVisible}
                handleCancel={handleCloseModal}
                modalSize={EModalSize.full}
                bodyContent={
                    <>
                        <div className={`${classPrefix}_sidebar__wrapper`}>
                            <div className={`${classPrefix}_sidebar__header`}>
                                <H3>
                                    Where do you want to pick up your order?
                                </H3>
                                <P>
                                    Select a drop-off point on the map or search
                                    by street name
                                </P>
                            </div>
                            <FormProvider {...methods}>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className={`${classPrefix}_sidebar__form`}
                                >
                                    <FormFieldInput
                                        name={EMapPickupFormFieldsNames.search}
                                        placeholder="Search"
                                        errorMessage={undefined}
                                        isFloatingLabel={false}
                                    />
                                    <FieldRadioButtonArrayController
                                        name={
                                            EMapPickupFormFieldsNames.pickupPoints
                                        }
                                        options={CheckoutPickupPointMockup.map(
                                            (item) => ({
                                                value: item.id,
                                                label: (
                                                    <PickupPoint {...item} />
                                                ),
                                            }),
                                        )}
                                    />
                                </form>
                            </FormProvider>
                            <div className={`${classPrefix}_sidebar__actions`}>
                                <ButtonPrimary
                                    color={EButtonColor.secondary}
                                    disabled={!isValid}
                                    onClick={() => handleCloseModal()}
                                >
                                    Select address
                                </ButtonPrimary>
                            </div>
                        </div>
                        <div className={`${classPrefix}_map__wrapper`}>
                            {modalMapPickupVisible && <MapWithNoSSR />}
                            {/*<MapContainer*/}
                            {/*    ref={mapRef}*/}
                            {/*    touchZoom={false}*/}
                            {/*    zoomControl={false}*/}
                            {/*    center={[48.2082, 16.3738]}*/}
                            {/*    maxZoom={18}*/}
                            {/*    style={{*/}
                            {/*        height: "400px",*/}
                            {/*        zIndex: "0!important",*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <TileLayer*/}
                            {/*        url="..."*/}
                            {/*        attribution="..."*/}
                            {/*        style={{ zIndex: "0!important" }}*/}
                            {/*    />*/}
                            {/*    <ZoomControl*/}
                            {/*        position="topright"*/}
                            {/*        style={{ zIndex: "10!important" }}*/}
                            {/*    />*/}
                            {/*</MapContainer>*/}
                        </div>
                    </>
                }
                wrapperStyles={{
                    top: headerHeight,
                    height: `calc(100% - ${headerHeight}px)`,
                }}
            />
        );
    }),
);

export default ModalMapPickup;
