import { useMemo } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLng } from "../types/tracking";
import "leaflet/dist/leaflet.css";

type MapViewProps = {
  userLocation: LatLng;
  restaurantLocation: LatLng;
  agentLocation: LatLng;
};

const markerClassName =
  "flex h-7 w-7 items-center justify-center rounded-full border border-white text-xs font-bold text-white shadow";

export const MapView = ({ userLocation, restaurantLocation, agentLocation }: MapViewProps) => {
  const center = useMemo(
    () => ({
      lat: (userLocation.lat + restaurantLocation.lat) / 2,
      lng: (userLocation.lng + restaurantLocation.lng) / 2
    }),
    [restaurantLocation.lat, restaurantLocation.lng, userLocation.lat, userLocation.lng]
  );

  const makeIcon = (label: string, colorClass: string) =>
    divIcon({
      html: `<div class="${markerClassName} ${colorClass}">${label}</div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "380px" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={makeIcon("R", "bg-amber-500")} position={[restaurantLocation.lat, restaurantLocation.lng]} />
        <Marker icon={makeIcon("U", "bg-emerald-500")} position={[userLocation.lat, userLocation.lng]} />
        <Marker icon={makeIcon("A", "bg-brand-600")} position={[agentLocation.lat, agentLocation.lng]} />
      </MapContainer>
    </div>
  );
};
