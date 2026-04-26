export type LatLng = {
  lat: number;
  lng: number;
};

export type OrderStatus =
  | "order_placed"
  | "preparing"
  | "picked_up"
  | "on_the_way"
  | "delivered";

export type TrackingState = {
  userLocation: LatLng;
  restaurantLocation: LatLng;
  agentLocation: LatLng;
  etaSeconds: number;
  orderStatus: OrderStatus;
};
