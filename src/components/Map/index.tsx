import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

export function ChangeView({ coords }: { coords: LatLngExpression }) {
    const map = useMap();
    map.setView(coords, 12);
    map.zoomControl.setPosition("bottomright");
    return null;
}

export default function Map() {
    const [geoData] = useState({ lat: 64.536634, lng: 16.779852 });

    const center: LatLngExpression = [geoData.lat, geoData.lng];

    return (
        <MapContainer center={center} zoom={12}>
            <TileLayer
                attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData.lat && geoData.lng && (
                <Marker position={[geoData.lat, geoData.lng]} />
            )}
            <ChangeView coords={center} />
        </MapContainer>
    );
}

// import dynamic from "next/dynamic";
// import { forwardRef, Ref } from "react";
// import { Map } from "leaflet";
//
// export const LazyMapContainer = dynamic(
//     () => import("./MapLazyComponents").then((m) => m.MapContainer),
//     {
//         ssr: false,
//         loading: () => <div style={{ height: "400px" }} />,
//     },
// );
// export const MapContainer = forwardRef((props, ref) => (
//     <LazyMapContainer {...props} forwardedRef={ref as Ref<Map>} />
// ));
//
// // direct import from 'react-leaflet'
// export const TileLayer = dynamic(
//     () => import("react-leaflet").then((m) => m.TileLayer),
//     { ssr: false },
// );
// export const ZoomControl = dynamic(
//     () => import("react-leaflet").then((m) => m.ZoomControl),
//     { ssr: false },
// );
