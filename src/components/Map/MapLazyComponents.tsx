import { FC, Ref } from "react";
import { MapContainer as LMapContainer } from "react-leaflet";
import { MapContainerProps } from "react-leaflet/lib/MapContainer";
import { Map } from "leaflet";

export const MapContainer: FC<
    MapContainerProps & { forwardedRef: Ref<Map> }
> = ({ forwardedRef, ...props }) => (
    <LMapContainer
        center={[48.2082, 16.3738]}
        maxZoom={18}
        {...props}
        ref={forwardedRef}
    />
);
