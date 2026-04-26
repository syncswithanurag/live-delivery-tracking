import { useMemo } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { motion } from "framer-motion";
import { LatLng } from "../types/tracking";
import "mapbox-gl/dist/mapbox-gl.css";

type MapViewProps = {
  userLocation: LatLng;
  restaurantLocation: LatLng;
  agentLocation: LatLng;
};

const markerClassName =
  "flex h-7 w-7 items-center justify-center rounded-full border border-white text-xs font-bold text-white shadow";

export const MapView = ({ userLocation, restaurantLocation, agentLocation }: MapViewProps) => {
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const initialViewState = useMemo(
    () => ({
      latitude: (userLocation.lat + restaurantLocation.lat) / 2,
      longitude: (userLocation.lng + restaurantLocation.lng) / 2,
      zoom: 12.2
    }),
    [restaurantLocation.lat, restaurantLocation.lng, userLocation.lat, userLocation.lng]
  );

  if (!mapboxToken) {
    return (
      <div className="flex h-[380px] items-center justify-center rounded-2xl bg-slate-200 p-4 text-center text-sm text-slate-600">
        Add `VITE_MAPBOX_TOKEN` in `client/.env` to render the map.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "380px" }}
      >
        <Marker latitude={restaurantLocation.lat} longitude={restaurantLocation.lng}>
          <div className={`${markerClassName} bg-amber-500`}>R</div>
        </Marker>
        <Marker latitude={userLocation.lat} longitude={userLocation.lng}>
          <div className={`${markerClassName} bg-emerald-500`}>U</div>
        </Marker>
        <Marker latitude={agentLocation.lat} longitude={agentLocation.lng}>
          <motion.div
            className={`${markerClassName} bg-brand-600`}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            A
          </motion.div>
        </Marker>
      </Map>
    </div>
  );
};
