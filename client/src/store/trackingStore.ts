import { create } from "zustand";
import { LatLng, OrderStatus, TrackingState } from "../types/tracking";

type TrackingStore = TrackingState & {
  isConnected: boolean;
  setInitialData: (data: TrackingState) => void;
  updateAgentLocation: (agentLocation: LatLng, etaSeconds: number) => void;
  updateOrderStatus: (status: OrderStatus) => void;
  setConnection: (isConnected: boolean) => void;
};

const defaultLocation = { lat: 28.6139, lng: 77.209 };

export const useTrackingStore = create<TrackingStore>((set) => ({
  userLocation: { lat: 28.6272, lng: 77.2262 },
  restaurantLocation: defaultLocation,
  agentLocation: defaultLocation,
  etaSeconds: 0,
  orderStatus: "order_placed",
  isConnected: false,
  setInitialData: (data) => set(() => ({ ...data })),
  updateAgentLocation: (agentLocation, etaSeconds) => set(() => ({ agentLocation, etaSeconds })),
  updateOrderStatus: (orderStatus) => set(() => ({ orderStatus })),
  setConnection: (isConnected) => set(() => ({ isConnected }))
}));
